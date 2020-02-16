export enum Status {
    ERROR,
    NEW,
    ONGOING,
    DONE
}

export enum Priority{
    LOW,
    STD,
    MEDIUM,
    HIGH,
    CRITICAL
}

export enum InfoType{
    INFO,
    WARN,
    ERROR
}

export class RabbitMqMsg{
    public status : Status;
    public priority: Priority;
    public Type: InfoType;

    public function: string;
    public to: string;
    public payload: string; 
}