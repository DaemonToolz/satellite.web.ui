import { Injectable } from '@angular/core';
import { CanActivate, Router, CanDeactivate } from '@angular/router';
import { AuthservicesService } from '../authservices.service';
import { Observable } from 'rxjs';
import { ICanComponentDeactivate } from '@WebManager/app/shared/ICanDeactivateComponent';

@Injectable({
  providedIn: 'root'
})

export class AuthGuardService implements CanActivate {  
  constructor(public auth: AuthservicesService, public router: Router) {}  
  
  canActivate(): boolean {
    if (!this.auth.isLogged) {
      this.router.navigate(['/login']);
      return false;
    }
    return true;
  }

  canDeactivate(): boolean {
    if (!this.auth.isLogged) {
      return true;
    }
    return false;
  }
  
}


@Injectable()

export class DeactivateGuardService implements CanDeactivate<ICanComponentDeactivate> {  
  constructor() {}  
  
  canDeactivate(component: ICanComponentDeactivate) {
    return component.canDeactivate ? component.canDeactivate() : true;
  }
  
}
