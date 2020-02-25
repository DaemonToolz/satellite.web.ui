import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { AuthservicesService } from '../authservices.service';
import { Subscription, Observable, of, BehaviorSubject } from 'rxjs';

import { RabbitMqMsg } from 'src/app/Models/process/RabbitMqMsg';
import * as io from 'socket.io-client';


@Injectable({
  providedIn: 'root'
})
export class RabbitmqHubService implements OnInit, OnDestroy {

  private socket: SocketIOClient.Socket;
  private isAuth$: Subscription;
  private myProfile$: Subscription;

  public readonly mySpaceUpdate: BehaviorSubject<RabbitMqMsg> = new BehaviorSubject(null);
  public readonly myFilewatch: BehaviorSubject<RabbitMqMsg> = new BehaviorSubject(null);

  public notifications: Array<RabbitMqMsg> = [];

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
            this.socket.on("myspace.space_update", function (payload: RabbitMqMsg) {
              self.mySpaceUpdate.next(payload);
            })

            this.socket.on("myspace.space_validation", function (payload: RabbitMqMsg) {
              self.mySpaceUpdate.next(payload);
            })

            this.socket.on("filewatch.notify", function (payload: RabbitMqMsg) {

              self.mySpaceUpdate.next(payload);
            })

            this.socket.on('disconnect', (reason) => {
              if (reason === 'io server disconnect') {
                this.socket.connect();
              }
            });

            this.socket.on('connect', () => {
              this.socket.emit("identify", profile.name);
            });

            this.socket.on("filewatch.system_updates", function (payload: RabbitMqMsg) {
              self.notifications.push(payload);
              self.myFilewatch.next(payload);
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
