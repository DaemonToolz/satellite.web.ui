import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GenericHttpService } from '../shared/generic-http-client';
import { Files } from 'src/app/Models/files';
import { environment } from 'src/environments/environment';
import { AuthservicesService } from '../authservices.service';

@Injectable({
  providedIn: 'root'
})

export class MyspaceService extends GenericHttpService<Files> {
  constructor(_http: HttpClient, private _auth : AuthservicesService) { 
    super(_http)
    this.init(environment.services.myspace);
  }

  public getFiles(name: string){
    return this.getArray(`files/${name}`);
  }
  
  public initSpace(){
    this._auth.userProfile$.toPromise().then(data => {
      this.postAny("spaces/init", {id: data})
    })
  }
}
