import { Component, OnInit } from '@angular/core';
import { RabbitmqHubService } from 'src/app/services/notifications/rabbitmq-hub.service';
import { Subscription } from 'rxjs';
import { RabbitMqMsg, Status, Priority, InfoType, ProcessFunction } from 'src/app/Models/process/RabbitMqMsg';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent implements OnInit {

  private myWatcher : Subscription;

  public Status = Status;
  public Priority = Priority;
  public InfoType = InfoType;
  public ProcessFunction = ProcessFunction;

  
  constructor(private hub : RabbitmqHubService) {
    this.initListener();  
  }

  ngOnInit(): void {
  }

  
  private initListener() {

    this.myWatcher = this.hub.myFilewatch.subscribe(data => {

    })

  }

  public delete(index : number){
    this.hub.notifications.splice(index,1);
  } 

  public get notifications(): Array<RabbitMqMsg>{
    return this.hub.notifications;
  }

}
