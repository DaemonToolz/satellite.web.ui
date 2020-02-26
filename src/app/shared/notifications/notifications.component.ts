import { Component, OnInit, OnDestroy } from '@angular/core';
import { RabbitmqHubService } from 'src/app/services/notifications/rabbitmq-hub.service';
import { Subscription } from 'rxjs';
import { RabbitMqMsg, Status, Priority, InfoType, ProcessFunction } from 'src/app/Models/process/RabbitMqMsg';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent implements OnInit, OnDestroy {


  private myWatcher : Subscription;
  private publicNotification : Subscription;
  public Status = Status;
  public Priority = Priority;
  public InfoType = InfoType;
  public ProcessFunction = ProcessFunction;

  
  constructor(private hub : RabbitmqHubService) {
    this.initListener();  
  }

  ngOnInit(): void {
  }
  
  ngOnDestroy(): void {
    this.myWatcher.unsubscribe()
    this.publicNotification.unsubscribe();
   }
  
  private initListener() {
    this.myWatcher = this.hub.myFilewatch.subscribe()
    this.publicNotification = this.hub.generalUpdates.subscribe();
  }

  public delete(index : number){
    this.hub.notifications.splice(index,1);
  } 

  public get notifications(): Array<RabbitMqMsg>{
    return this.hub.notifications;
  }

}
