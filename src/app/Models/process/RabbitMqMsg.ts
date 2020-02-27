import { Time } from '@angular/common';

export enum Status {
    error,
    new,
    ongoing,
    done
}

export enum Priority {
    low,
    standard,
    medium,
    high,
    critical
}

export enum InfoType {
    info,
    success,
    warning,
    error
}

export class Notification{}

export class MsgWrapper {
    public constructor(_payload: Notification){
        this.payload = _payload;
        this.isSelected = false;
    }

    public isSelected : boolean;
    public payload: Notification;
}

export class RabbitMqMsg extends Notification{
    public status: Status;
    public priority: Priority;
    public Type: InfoType;


    public id: string;
    public function: string;
    public to: string;
    public date: Time;
    public payload: string;
}

export enum ProcessFunction {
    Connect = "connect",
    Disconnect = "disconnect",
    Identify= "identify",
    MySpaceUpdate = "myspace.space_update",
    MySpaceValidate = "myspace.space_validation",
    MySpaceNotify = "myspace.notify_all",
    FilewatchNotify = "filewatch.notify",
    FilewatchSysUpd = "filewatch.system_updates",
    NotifiationHubUpd = "notification.system-update"
}

