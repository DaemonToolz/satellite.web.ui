import { Component, OnInit, OnDestroy } from '@angular/core';
import { RabbitmqHubService } from 'src/app/services/notifications/rabbitmq-hub.service';
import { Subscription } from 'rxjs';
import { RabbitMqMsg, Status, Priority, InfoType, MsgWrapper } from 'src/app/Models/process/RabbitMqMsg';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent implements OnInit, OnDestroy {

  private publicNotification : Subscription;
  public Status = Status;
  public Priority = Priority;
  public InfoType = InfoType;
  
  constructor(private hub : RabbitmqHubService) {
    this.initListener();  
  }

  ngOnInit(): void {
  }
  
  ngOnDestroy(): void {
    this.publicNotification.unsubscribe();
   }
  
  private initListener() {
    this.publicNotification = this.hub.generalUpdates.subscribe();
  }

  public delete(index : number){
    this.hub.notifications.splice(index,1);
  } 

  public select(index: number){
    this.notifications[index].isSelected = !this.notifications[index].isSelected
  }

  public clearSelected(){
    let indexes : number[] = [];

    this.notifications.forEach((value, index) => {
      if(value.isSelected) indexes.push(index)
    })

    indexes.reverse().forEach(data => {
      this.notifications.splice(data,1);
    })
  }

  public clearAll(){
    this.notifications.splice(0);
  }

  public get notifications(): Array<MsgWrapper>{
    return this.hub.notifications;
  }

  public get anySelected(): boolean {
    return this.hub.notifications.some(notif => notif.isSelected);
  }

}
