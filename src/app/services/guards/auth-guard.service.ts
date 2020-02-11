import { Injectable } from '@angular/core';
import { CanActivate, Router, CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthservicesService } from '../authservices.service';
import { Observable } from 'rxjs';
import { ICanComponentDeactivate } from '@WebManager/app/shared/ICanDeactivateComponent';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class AuthGuardService implements CanActivate {  
  constructor(public auth: AuthservicesService, public router: Router) {}  

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean|UrlTree> | boolean {
    return this.auth.isAuthenticated$.pipe(
      tap(loggedIn => {
        if (!loggedIn) {
          this.auth.login(state.url);
        }
      })
    );
  }
}


@Injectable()

export class DeactivateGuardService implements CanDeactivate<ICanComponentDeactivate> {  
  constructor() {}  
  
  canDeactivate(component: ICanComponentDeactivate) {
    return component.canDeactivate ? component.canDeactivate() : true;
  }
  
}
