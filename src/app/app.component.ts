import { Component } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { AuthservicesService } from './services/authservices.service';
import { RabbitmqHubService } from './services/notifications/rabbitmq-hub.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Web Manager';

  constructor(private matIconRegistry: MatIconRegistry, private domSanitizer: DomSanitizer, public auth : AuthservicesService, public notifications : RabbitmqHubService){
    this.matIconRegistry.addSvgIcon(`web_manager`,this.domSanitizer.bypassSecurityTrustResourceUrl(`../assets/images/web-manager.svg`));
    this.matIconRegistry.addSvgIcon(`my_space`,this.domSanitizer.bypassSecurityTrustResourceUrl(`../assets/images/my-space.svg`));
    this.matIconRegistry.addSvgIcon(`choices`,this.domSanitizer.bypassSecurityTrustResourceUrl(`../assets/images/choices.svg`));
    this.matIconRegistry.addSvgIcon(`file`,this.domSanitizer.bypassSecurityTrustResourceUrl(`../assets/images/file.svg`));
    this.matIconRegistry.addSvgIcon(`folder`,this.domSanitizer.bypassSecurityTrustResourceUrl(`../assets/images/folder.svg`));
    
  }

  public login(){
    this.auth.login();
  }

  public logout(){
    this.auth.logout();
  }
  public get myProfile(){
    return this.auth.userProfile$;
  }
}
