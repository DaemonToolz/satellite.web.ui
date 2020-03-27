import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { AuthservicesService } from '../authservices.service';
import { Subscription, Observable, of, BehaviorSubject } from 'rxjs';

import { RabbitMqMsg, MsgWrapper, MySpaceEvents, NotificationEvents, FilewatchEvents, Priority, Status, InfoType, AccountEvents } from 'src/app/Models/process/RabbitMqMsg';
import * as io from 'socket.io-client';
import { Channel, SocketFunction } from 'src/app/Models/process/Channels';


@Injectable({
  providedIn: 'root'
})
export class RabbitmqHubService implements OnInit {

  private static Socket: SocketIOClient.Socket;
  private static isAuth$: Subscription;
  private static myProfile$: Subscription;

  public get IsAuth(): Subscription{
    return RabbitmqHubService.isAuth$
  }

  public get MyProfile(): Subscription{
    return RabbitmqHubService.myProfile$
  }

  public readonly mySpaceUpdate: BehaviorSubject<RabbitMqMsg> = new BehaviorSubject(null);

  public readonly myAccountUpdate: BehaviorSubject<RabbitMqMsg> = new BehaviorSubject(null);
  public readonly myFilewatch: BehaviorSubject<RabbitMqMsg> = new BehaviorSubject(null);
  public readonly generalUpdates: BehaviorSubject<RabbitMqMsg> = new BehaviorSubject(null);

  public notifications: Array<MsgWrapper> = [];

  constructor(private auth: AuthservicesService) {
    const self = this;
    if (!this.IsAuth) {

      RabbitmqHubService.isAuth$ = self.auth.isAuthenticated$.subscribe(isAuth => {
        if (isAuth) {

          if (!self.MyProfile) {

            RabbitmqHubService.myProfile$ = self.auth.userProfile$.subscribe(profile => {
              if (profile != null) {

                if (!RabbitmqHubService.Socket) {


                  RabbitmqHubService.Socket = io('ws://localhost:20000/', { transports: ['websocket'] });

                  RabbitmqHubService.Socket.on(SocketFunction.Disconnect, (reason) => {
                    if (reason === 'io server disconnect') {
                      RabbitmqHubService.Socket.connect();
                    }
                  });

                  RabbitmqHubService.Socket.on(SocketFunction.Connect, () => {
                    RabbitmqHubService.Socket.emit(SocketFunction.Identify, profile.name);
                  });

                  RabbitmqHubService.Socket.on(SocketFunction.OnError, () => {
                    this.notify({ id: "-1", payload: "Unable to connect to the notification hub, retrying.... If the problem persist, contact the website administrator", to: Channel.Broadcast, func: "", priority: Priority.critical, status: Status.new, type: InfoType.error })
                  })

                  RabbitmqHubService.Socket.on(SocketFunction.OnReconnectError, () => {
                    this.notify({ id: "-2", payload: "Unable to reconnect to the notification hub. If the problem persist, contact the website administrator", to: Channel.Broadcast, func: "", priority: Priority.critical, status: Status.new, type: InfoType.error })
                  })


                  Object.entries(Channel).forEach(channel => {
                    RabbitmqHubService.Socket.on(channel[1], function (payload: RabbitMqMsg) {
                      self.notifications.push(new MsgWrapper(payload));
                      self.generalUpdates.next(payload);
                    })
                  })

                  Object.entries(AccountEvents).forEach(event => {
                    RabbitmqHubService.Socket.on(event[1], function (payload: RabbitMqMsg) {
                      self.myAccountUpdate.next(payload);
                    })
                  })

                  Object.entries(MySpaceEvents).forEach(event => {
                    RabbitmqHubService.Socket.on(event[1], function (payload: RabbitMqMsg) {
                      self.mySpaceUpdate.next(payload);
                    })
                  })

                  Object.entries(FilewatchEvents).forEach(event => {
                    RabbitmqHubService.Socket.on(event[1], function (payload: RabbitMqMsg) {
                      self.mySpaceUpdate.next(payload);
                    })
                  })


                  Object.entries(NotificationEvents).forEach(func => {
                    RabbitmqHubService.Socket.on(func[1], function (payload: RabbitMqMsg) {
                      self.notifications.push(new MsgWrapper(payload));
                      self.generalUpdates.next(payload);
                    })
                  })
                }
              }
            })
          }
        }
      })
    }
  }


  ngOnInit(): void {

  }


  public notify({ id, payload, to, func, priority, status, type }: { id: string; payload: string; to: string; func: string; priority: Priority; status: Status; type: InfoType; }) {
    let message = this.constructClientSideNotification({ id, payload, to, func, priority, status, type })
    this.notifications.push(new MsgWrapper(message));
    this.generalUpdates.next(message);
  }

  private constructClientSideNotification({ id, payload, to, func, priority, status, type }: { id: string; payload: string; to: string; func: string; priority: Priority; status: Status; type: InfoType; }): RabbitMqMsg {
    let message: RabbitMqMsg = new RabbitMqMsg();

    message.id = id;
    message.date = new Date(Date.now());
    message.function = func;
    message.payload = payload;
    message.priority = priority;
    message.status = status;
    message.to = to;
    message.Type = type;

    return message;
  }

}
