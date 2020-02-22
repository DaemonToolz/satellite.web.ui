import { Users } from './users';
import { Time } from '@angular/common';

export class Space {
    public owner: Users;
    public sharedWith: boolean;
}

export class SpaceValidation{
    public userId: string;
    public initStatus: number;
    public created: boolean;
    public created_at: Time;
}