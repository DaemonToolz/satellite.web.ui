import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subscription, BehaviorSubject } from 'rxjs';
import { GenericHttpService } from '../shared/generic-http-client';
import { Files } from 'src/app/Models/files';
import { environment } from 'src/environments/environment';
import { AuthservicesService } from '../authservices.service';
import { SpaceValidation } from 'src/app/Models/space';
import { take } from 'rxjs/operators';
import { Status } from 'src/app/Models/process/RabbitMqMsg';

@Injectable({
  providedIn: 'root'
})

export class MyspaceService extends GenericHttpService<Files> {
  private myUsername: string;
  private authSubscription : Subscription;

  public mySpaceConfig : SpaceValidation;
  public folders : string[] = ["/myspace"];

  public folderChanged: BehaviorSubject<boolean> = new BehaviorSubject(null);;

  constructor(_http: HttpClient, private _auth : AuthservicesService) { 
    super(_http)
    this.init(environment.services.myspace);

    this.authSubscription = this._auth.userProfile$.subscribe(result => {
      if(result != null)
        this.myUsername = result.name
    });
    
  }

  public set CurrentFolder(newValue: string){
    this.folders.push(newValue);
    this.folderChanged.next(true);
  }

  public set TravelBack(index: number){
    this.folders.splice(index+1);
    this.folderChanged.next(true);
  }

  public get isSpaceValid(): Boolean{
    return this.mySpaceConfig?.created === true;
  }

  public get isSpaceAccessible() : Boolean{
    return this.mySpaceConfig?.initStatus === Status.done;
  }

  public getCurrentFolder(){
    return this.postArray(`files/${this.myUsername}`, JSON.stringify({path:this.absolutePath})).pipe(take(1));
  }

  public getFiles(name: string){
    return this.postArray(`files/${name}`, JSON.stringify({path:this.absolutePath})).pipe(take(1));
  }
  
  
  public initSpace(){
    this.postAny("spaces/init", JSON.stringify({id: this.myUsername})).pipe(take(1)).subscribe()
  }

  public updateExists(){
    this.getAny<SpaceValidation>(`spaces/${this.myUsername}/exists`).pipe(take(1)).subscribe(data => this.mySpaceConfig = data )
  }

  public get lastFolder(): string{
    return this.folders[this.folders.length-1];
  }

  public get absolutePath(): string{
    return this.folders.join("/");
  }

  public get myConfig(): SpaceValidation{
    return this.mySpaceConfig;
  }
}
