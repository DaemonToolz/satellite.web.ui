import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { AuthservicesService } from '../authservices.service';
import { Subscription, Observable, of, BehaviorSubject } from 'rxjs';

import { RabbitMqMsg, MsgWrapper, MySpaceEvents, NotificationEvents, FilewatchEvents } from 'src/app/Models/process/RabbitMqMsg';
import * as io from 'socket.io-client';
import { Channel, SocketFunction } from 'src/app/Models/process/Channels';


@Injectable({
  providedIn: 'root'
})
export class RabbitmqHubService implements OnInit, OnDestroy {

  private socket: SocketIOClient.Socket;
  private isAuth$: Subscription;
  private myProfile$: Subscription;

  public readonly mySpaceUpdate: BehaviorSubject<RabbitMqMsg> = new BehaviorSubject(null);
  public readonly myFilewatch: BehaviorSubject<RabbitMqMsg> = new BehaviorSubject(null);
  public readonly generalUpdates: BehaviorSubject<RabbitMqMsg> = new BehaviorSubject(null);

  public notifications: Array<MsgWrapper> = [];

  constructor(private auth: AuthservicesService) {
    const self = this;
    if (this.isAuth$) {
      this.isAuth$.unsubscribe();
    }

    this.isAuth$ = this.auth.isAuthenticated$.subscribe(isAuth => {
      if (isAuth) {
        if (this.socket) {
          this.socket.disconnect();
        }

        if (this.myProfile$)
          this.isAuth$.unsubscribe();

        this.myProfile$ = this.auth.userProfile$.subscribe(profile => {
          if (profile != null) {

            if (this.socket) {
              this.socket.close()
            }

            this.socket = io('ws://localhost:20000/', { transports: ['websocket'] });

            this.socket.on(SocketFunction.Disconnect, (reason) => {
              if (reason === 'io server disconnect') {
                this.socket.connect();
              }
            });

            this.socket.on(SocketFunction.Connect, () => {
              this.socket.emit(SocketFunction.Identify, profile.name);
            });


            Object.entries(Channel).forEach(channel => {
              this.socket.on(channel[1], function (payload: RabbitMqMsg) {
                self.notifications.push(new MsgWrapper(payload));
                self.generalUpdates.next(payload);
              })
            })
           

            Object.entries(MySpaceEvents).forEach(event => {
              this.socket.on(event[1], function (payload: RabbitMqMsg) {
                self.mySpaceUpdate.next(payload);
              })
            })
           
            Object.entries(FilewatchEvents).forEach(event => {
              this.socket.on(event[1], function (payload: RabbitMqMsg) {
                self.mySpaceUpdate.next(payload);
              })
            })
           

            Object.entries(NotificationEvents).forEach(func => {
              this.socket.on(func[1], function (payload: RabbitMqMsg) {
                self.notifications.push(new MsgWrapper(payload));
                self.generalUpdates.next(payload);
              })
            })

          }
        })
      }
    })
  }

  ngOnDestroy(): void {
    this.clearSub();
  }

  private clearSub(): void {
    if (this.isAuth$)
      this.isAuth$.unsubscribe();

    if (this.myProfile$)
      this.isAuth$.unsubscribe();

  }

  ngOnInit(): void {

  }


}
