import { Component, OnInit } from '@angular/core';
import { RabbitmqHubService } from 'src/app/services/notifications/rabbitmq-hub.service';
import { Subscription } from 'rxjs';
import { RabbitMqMsg } from 'src/app/Models/process/RabbitMqMsg';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent implements OnInit {

  private myWatcher : Subscription;
  public statuses: Array<RabbitMqMsg> = [];

  constructor(private hub : RabbitmqHubService) {
    this.initListener();  
  }

  ngOnInit(): void {
  }

  
  private initListener() {

    this.myWatcher = this.hub.myFilewatch.subscribe(data => {
      this.statuses.push(data);
    })

  }


}
