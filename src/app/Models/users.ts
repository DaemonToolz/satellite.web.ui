export class Users {
    public id: number;
    public name: string;
    public username: string;
    public description: string;
    public avatar: any;
}

export class OAuthUser{
    public sub: string;
    public nickname: string;
    public name: string;
    public picture: string;
    public updated_at: Date;
    public created_at : Date;
}

export class UserInfo {
    public  _key : string ;
	public  real_name  : string;
	public  email    : string;
}