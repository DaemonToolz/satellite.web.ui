import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subscription, BehaviorSubject } from 'rxjs';
import { GenericHttpService } from '../shared/generic-http-client';
import { Files } from 'src/app/Models/files';
import { environment } from 'src/environments/environment';
import { AuthservicesService } from '../authservices.service';
import { SpaceValidation } from 'src/app/Models/space';
import { take } from 'rxjs/operators';
import { Status, RabbitMqMsg, MySpaceEvents, FilewatchEvents } from 'src/app/Models/process/RabbitMqMsg';
import { RabbitmqHubService } from '../notifications/rabbitmq-hub.service';

@Injectable({
  providedIn: 'root'
})

export class MyspaceService extends GenericHttpService<Files> {
  private _myUsername: string;
  private _authSubscription : Subscription;
  private _profilePicture: any;

  public coverPictureLoaded : boolean = false;
  public mySpaceConfig : SpaceValidation;
  public folders : string[] = ["/myspace"];

  public folderChanged: BehaviorSubject<boolean> = new BehaviorSubject(null);;
  public triggeredUpdate : BehaviorSubject<boolean> = new BehaviorSubject(null);;
  constructor(_http: HttpClient, private _auth : AuthservicesService,  private updaters: RabbitmqHubService) { 
    super(_http)
    this.init(environment.services.myspace);

    this._authSubscription = this._auth.userProfile$.subscribe(result => {
      if(result != null)
        this._myUsername = result.name
    });
    this.initListener();
    
  }

  private getProfilePicture() {
      this.getPicture(`spaces/cover/${this._myUsername}`).subscribe(data => {
        this.createImageFromBlob(data);
      }, error => {
        console.log(error);
      });
  }

  private createImageFromBlob(image: Blob) {
     let reader = new FileReader();
     reader.addEventListener("load", () => {
        this._profilePicture = reader.result;
        this.coverPictureLoaded = true;
     }, false);
  
     if (image) {
        reader.readAsDataURL(image);
     }
  }

  public get ProfilePicture(){
    return this._profilePicture
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
    this.getProfilePicture();
  
    return this.postArray(`files/${this._myUsername}`, JSON.stringify({path:this.absolutePath})).pipe(take(1));
  }

  public getFiles(name: string){
    return this.postArray(`files/${name}`, JSON.stringify({path:this.absolutePath})).pipe(take(1));
  }
  
  
  public initSpace(){
    this.postAny("spaces/init", JSON.stringify({id: this._myUsername})).pipe(take(1)).subscribe()
  }

  public updateExists(){
    this.getAny<SpaceValidation>(`spaces/${this._myUsername}/exists`).pipe(take(1)).subscribe(data => this.mySpaceConfig = data )
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

  //#region Notification
  private spaceUpdates$: Subscription;

  public currentStatus: RabbitMqMsg;
  public statuses: Map<string, RabbitMqMsg> = new Map();
  public loading: boolean = false;

  private notify(data: RabbitMqMsg){
    switch(data.function){
      case MySpaceEvents.MySpaceValidate:
        this.statuses.clear();
        this.folderChanged.next(true)
        this.loading = false;
        break;
      case MySpaceEvents.MySpaceUpdate:
        this.currentStatus = data;
        this.loading = true;
        this.statuses.set(data.id, data);
        break;
      case FilewatchEvents.FilewatchNotify:
        this.loading = false;
        this.folderChanged.next(true)
        break;
    }
  }
  
  private initListener() {
    this.spaceUpdates$ = this.updaters.mySpaceUpdate.subscribe(data => {
      if (data != null) {
        this.notify(data);
      }
    })

  }

  
  //#endregion Notification
}
