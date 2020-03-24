import { Injectable, OnDestroy } from '@angular/core';
import { Users, UserInfo } from 'src/app/Models/users';
import { GenericHttpService } from '../shared/generic-http-client';

@Injectable({
  providedIn: 'root'
})
export class UsersService  {

  public users : Users[] = [];

  private readonly user_service:string = "http://localhost:10840/"
  private readonly create: string = "create"
  private readonly validate: string = "validate"
  
  constructor() { 
    let u : Users;
    for(let i = 0; i < 500; ++i){
      u = new Users();
      u.id = i+1; 
      u.description = "A description";
      u.name = "My_Name";
      u.username ="USER#"+i;
      this.users.push(u);
    }
  }





}
