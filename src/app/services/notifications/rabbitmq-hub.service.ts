import { Injectable, OnDestroy } from '@angular/core';
import { AuthservicesService } from '../authservices.service';
import { Subscription, Observable } from 'rxjs';

declare var require: any;

var Stomp = require('stompjs');

@Injectable({
  providedIn: 'root'
})
export class RabbitmqHubService implements OnDestroy {

  private rabbitMqAccess: any;
  private messages$: Subscription
  private myUser: string;
  private profile$: Subscription;
  constructor() {

  }

  ngOnDestroy(): void {
    this.clearSub();

  }

  private clearSub() {
    if (this.messages$)
      this.messages$.unsubscribe();

    if (this.profile$)
      this.profile$.unsubscribe();
  }

  public OnLogin(userProfile$: Observable<any>) {
    this.clearSub();
    this.profile$ = this.profile$ = userProfile$.subscribe(data => {
      if (data) {
        this.rabbitMqAccess = Stomp.overWS('ws://localhost:15674');
        this.myUser = data;
        var on_connect = function () {
          console.log(`${data} is now connected`);
        };

        var on_error = function () {
          console.log(`${data} received on error`);
        };

        this.rabbitMqAccess.connect('system-notifier', 'password', on_connect, on_error, '/');
        this.messages$ = this.rabbitMqAccess.subscribe(`/topic/user-notification`, this.onMessage, { id: this.myUser });
      }
    })
  }

  public onLogout() {
    this.clearSub();
    this.rabbitMqAccess.disconnect();
  }

  public onMessage(message: any) {
    if (message.body) {
      console.log("got message with body " + message.body)
    } else {
      console.log("got empty message");
    }
  }


}
