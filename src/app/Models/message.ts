import { Users } from './users';

export class Message {
    public content: string;
    public owner: Users;
    public recipients: Users[];
    public date: Date;
}

