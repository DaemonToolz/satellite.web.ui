
import { Users } from './users';
import { Space } from './space';

export enum FileType{
    FILE,
    FOLDER
}

export enum Visbility{
    PUBLIC,
    LINK,
    FRIENDS,
    GROUPS,
    PRIVATE
}


export class Files {
    public name: string;
    public size: number;
    public owner: Users;
    public space: Space;
    public type : FileType;
    public visibility: Visbility;

    public parent: Files;
    public children: Files[];


}
