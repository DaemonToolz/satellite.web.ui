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

export class RabbitMqMsg {
    public status: Status;
    public priority: Priority;
    public Type: InfoType;


    public id: string;
    public function: string;
    public to: string;
    public payload: string;
}

export enum ProcessFunction {
    MySpaceUpdate = "myspace.space_update",
    MySpaceValidate = "myspace.space_validation",
    FilewatchNotify = "filewatch.notify",
    FilewatchSysUpd = "filewatch.system_updates",
}

