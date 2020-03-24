import { Injectable, OnDestroy } from '@angular/core';
import { GenericHttpService } from '../shared/generic-http-client';
import { Subscription, Observable, BehaviorSubject } from 'rxjs';
import { UserInfo } from 'src/app/Models/users';
import { HttpClient } from '@angular/common/http';
import { AuthservicesService } from '../authservices.service';
import { RabbitmqHubService } from '../notifications/rabbitmq-hub.service';
import { environment } from 'src/environments/environment';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AccountDataService extends GenericHttpService<UserInfo> implements OnDestroy {
  private myProfile$: Subscription;

  public MyInfo : UserInfo;
  public isChecked : boolean = false;

  public readonly checkedUpdate: BehaviorSubject<boolean> = new BehaviorSubject(null);
  private clearSubscriptions(){
    this.myProfile$?.unsubscribe()
  }

  constructor(_http: HttpClient, private _auth : AuthservicesService,  private updaters: RabbitmqHubService) { 
    super(_http)
    this.init(environment.services.users);
    this.MyInfo = new UserInfo(); 
    this.myProfile$ = this._auth.userProfile$.subscribe(profile => {
      if (profile != null && profile?.name.trim() != "") {
       
        this.MyInfo._key = profile.name;
        this.MyInfo.real_name = profile.nickname;
        this.MyInfo.email = profile.email;
   
        this.checkMyself()
      }
    })
    this.initListener();
  }

  ngOnDestroy(): void {
    this.clearSubscriptions()
  }

  private initListener() {
  

  }

  private checkMyself(){
    this.postAny("users/check", JSON.stringify(this.MyInfo)).pipe(take(1)).subscribe(data => {
      this.isChecked = true;
      this.checkedUpdate.next(true);
    })
  }

  public getMyNetwork() : Observable<any[]>{
    return this.getAny<any[]>(`users/${this.MyInfo._key}/network`).pipe(take(1))
  }
}
