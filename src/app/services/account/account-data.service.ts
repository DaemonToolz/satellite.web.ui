import { Injectable, OnDestroy } from '@angular/core';
import { GenericHttpService } from '../shared/generic-http-client';
import { Subscription, Observable, BehaviorSubject } from 'rxjs';
import { UserInfo } from 'src/app/Models/users';
import { HttpClient } from '@angular/common/http';
import { AuthservicesService } from '../authservices.service';
import { RabbitmqHubService } from '../notifications/rabbitmq-hub.service';
import { environment } from 'src/environments/environment';
import { take } from 'rxjs/operators';
import { RabbitMqMsg, AccountEvents } from 'src/app/Models/process/RabbitMqMsg';

@Injectable({
  providedIn: 'root'
})
export class AccountDataService extends GenericHttpService<UserInfo> implements OnDestroy {
  private myProfile$: Subscription;
  private myAccountUpdates$: Subscription;

  public MyInfo: UserInfo;
  public isChecked: boolean = false;

  public _profilePicture: any;
  public profilePictureLoaded: boolean = false;

  public readonly checkedUpdate: BehaviorSubject<boolean> = new BehaviorSubject(null);
  public readonly messageUpdate: BehaviorSubject<RabbitMqMsg> = new BehaviorSubject(null);
  private clearSubscriptions() {
    this.myProfile$?.unsubscribe()
  }

  constructor(_http: HttpClient, private _auth: AuthservicesService, private updaters: RabbitmqHubService) {
    super(_http)
    this.init(environment.services.users);
    this.MyInfo = new UserInfo();
    this.initListener();
    this.myProfile$ = this._auth.userProfile$.subscribe(profile => {
      if (profile != null && profile?.name.trim() != "") {

        this.MyInfo._key = profile.name;
        this.MyInfo.real_name = profile.nickname;
        this.MyInfo.email = profile.email;
      }
    })
   
  }

  ngOnDestroy(): void {
    this.clearSubscriptions()
  }


  public checkMyself() {
    this.postAny<any>("users/check", JSON.stringify(this.MyInfo)).pipe(take(1)).subscribe(data => {
      this.isChecked = true;
      this.getProfilePicture();
      this.checkedUpdate.next(true);
    })
  }

  public getMyNetwork(): Observable<any[]> {
    return this.getAny<any[]>(`users/${this.MyInfo._key}/network`).pipe(take(1))
  }

  // Duplicate 
  private getProfilePicture() {
    this.getPicture(`users/picture/${this.MyInfo._key}`).subscribe(data => {
      this.createImageFromBlob(data);
    }, error => {
      console.log(error);
    });
  }
  // Duplicate 
  private createImageFromBlob(image: Blob) {
    let reader = new FileReader();
    reader.addEventListener("load", () => {
      this._profilePicture = reader.result;
      this.profilePictureLoaded = true;
    }, false);

    if (image) {
      reader.readAsDataURL(image);
    }
  }

  public get ProfilePicture() {
    return this._profilePicture
  }

  private initListener() {
    this.myAccountUpdates$ = this.updaters.myAccountUpdate.subscribe(data => {
      if (data != null) {
        this.notify(data);
      }
    })

  }

  
  private notify(data: RabbitMqMsg){
    switch(data.function){
      case AccountEvents.UsersValidate:
        this.messageUpdate.next(data);
        break;
      
    }
  }

}
