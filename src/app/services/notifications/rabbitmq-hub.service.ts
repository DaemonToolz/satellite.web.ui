import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { AuthservicesService } from '../authservices.service';
import { Subscription, Observable, of, BehaviorSubject } from 'rxjs';

import { RabbitMqMsg, ProcessFunction, MsgWrapper } from 'src/app/Models/process/RabbitMqMsg';
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
            this.socket.on(ProcessFunction.MySpaceUpdate, function (payload: RabbitMqMsg) {
              self.mySpaceUpdate.next(payload);
            })

            this.socket.on(ProcessFunction.MySpaceValidate, function (payload: RabbitMqMsg) {
              self.mySpaceUpdate.next(payload);
            })

            this.socket.on(ProcessFunction.FilewatchNotify, function (payload: RabbitMqMsg) {
              self.mySpaceUpdate.next(payload);
            })

            this.socket.on(SocketFunction.Disconnect, (reason) => {
              if (reason === 'io server disconnect') {
                this.socket.connect();
              }
            });

            this.socket.on(SocketFunction.Connect, () => {
              this.socket.emit(SocketFunction.Identify, profile.name);
            });

            /*
            export enum Channel {
              MySpaceGeneral = "myspace-notification",
              Broadcast      = "general-notification"
              */
            this.socket.on(ProcessFunction.NotifiationHubUpd, function (payload: RabbitMqMsg) {
              self.notifications.push(new MsgWrapper(payload));
              self.generalUpdates.next(payload);
            })


            this.socket.on(ProcessFunction.FilewatchSysUpd, function (payload: RabbitMqMsg) {
              self.notifications.push(new MsgWrapper(payload));
              self.myFilewatch.next(payload);
            })
            
            
            this.socket.on(ProcessFunction.MySpaceNotify, function (payload: RabbitMqMsg) {
              self.notifications.push(new MsgWrapper(payload));
              self.generalUpdates.next(payload);
            })

            Object.entries(Channel).forEach(channel => {
              this.socket.on(channel[0], function (payload: RabbitMqMsg) {
                self.notifications.push(new MsgWrapper(payload));
                self.generalUpdates.next(payload);
              })
            })
           
            Object.entries(ProcessFunction).forEach(channel => {
              this.socket.on(channel[0], function (payload: RabbitMqMsg) {
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
