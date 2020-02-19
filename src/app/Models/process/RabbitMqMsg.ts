export enum Status {
    error,
    new,
    ongoing,
    done
}

export enum Priority{
    low,
    standard,
    medium,
    high,
    critical
}

export enum InfoType{
    info,
    success,
    warning,
    error
}

export class RabbitMqMsg{
    public status : Status;
    public priority: Priority;
    public Type: InfoType;

    public function: string;
    public to: string;
    public payload: string; 
}