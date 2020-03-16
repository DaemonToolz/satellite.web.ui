import { Component } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { AuthservicesService } from './services/authservices.service';
import { Subscription } from 'rxjs';
import { RabbitmqHubService } from './services/notifications/rabbitmq-hub.service';
import { MyspaceService } from './services/spaces/myspace.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public title = 'Web Manager';
  
  private authSubscription: Subscription;
  private profileSub: Subscription;

  public  isAuthenticated: boolean;
  public  myProfile: any;
  constructor(private matIconRegistry: MatIconRegistry, private domSanitizer: DomSanitizer, public auth : AuthservicesService, public hub: RabbitmqHubService, private mySpaceService: MyspaceService){
    this.matIconRegistry.addSvgIcon(`web_manager`,this.domSanitizer.bypassSecurityTrustResourceUrl(`../assets/images/web-manager.svg`));
    this.matIconRegistry.addSvgIcon(`my_space`,this.domSanitizer.bypassSecurityTrustResourceUrl(`../assets/images/my-space.svg`));
    this.matIconRegistry.addSvgIcon(`choices`,this.domSanitizer.bypassSecurityTrustResourceUrl(`../assets/images/choices.svg`));
    this.matIconRegistry.addSvgIcon(`file`,this.domSanitizer.bypassSecurityTrustResourceUrl(`../assets/images/file.svg`));
    this.matIconRegistry.addSvgIcon(`folder`,this.domSanitizer.bypassSecurityTrustResourceUrl(`../assets/images/folder.svg`));
    
    this.initAuth();
  }

  private initAuth(): void{
    
    this.profileSub = this.auth.userProfile$.subscribe(data => {
      if(data){
        this.isAuthenticated = data;
        this.initProfileSub();
      }
    });
  }  

  private initProfileSub(): void{
    
    this.authSubscription = this.auth.userProfile$.subscribe(result => {
      if(result != null)
        this.myProfile = result
    });
    
  }

  public get isMySpaceBusy(){
    return this.mySpaceService.loading;
  }

  public login(){
    this.auth.login();
  }

  public logout(){
    this.auth.logout();
  }

}
