import { Users } from './users';

export class Space {
    public owner: Users;
    public sharedWith: boolean;
}

export class SpaceValidation{
    public userId: string;
    public initStatus: number;
    public created: boolean;
}