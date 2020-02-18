import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subscription } from 'rxjs';
import { GenericHttpService } from '../shared/generic-http-client';
import { Files } from 'src/app/Models/files';
import { environment } from 'src/environments/environment';
import { AuthservicesService } from '../authservices.service';

@Injectable({
  providedIn: 'root'
})

export class MyspaceService extends GenericHttpService<Files> {
  private myUsername: string;
  private authSubscription : Subscription;

  constructor(_http: HttpClient, private _auth : AuthservicesService) { 
    super(_http)
    this.init(environment.services.myspace);

    this.authSubscription = this._auth.userProfile$.subscribe(result => {
      if(result != null)
        this.myUsername = result.name
    });
    
  }

  public getFiles(name: string){
    return this.getArray(`files/${name}`);
  }
  
  public initSpace(){
    this.postAny("spaces/init", JSON.stringify({id: this.myUsername})).subscribe()
  }
}
