import { Injectable, OnDestroy } from '@angular/core';
import createAuth0Client from '@auth0/auth0-spa-js';
import Auth0Client from '@auth0/auth0-spa-js/dist/typings/Auth0Client';
import * as config from '../../../auth_config.json';
import { from, of, Observable, BehaviorSubject, combineLatest, throwError } from 'rxjs';
import { tap, catchError, concatMap, shareReplay } from 'rxjs/operators';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.js';
import { tokenNotExpired } from 'angular2-jwt';
import Auth0Lock from 'auth0-lock';
import { OAuthUser } from '../Models/users.js';

@Injectable({
  providedIn: 'root'
})
export class AuthservicesService implements OnDestroy{
  ngOnDestroy(): void {
    this.logout();
  }

  private myUser : OAuthUser;

  public get isLogged(): boolean{
    return tokenNotExpired();
  }

  public get myProfile(): any{
    return this.myUser;
  }

  constructor(private router: Router) {
    this.myUser = <OAuthUser>JSON.parse(localStorage.getItem("profile")); 


    this.lock.on('authenticated', (authResult: any) => {
      this.lock.getUserInfo(authResult.accessToken, (error, profile) => {
        if (error) {
          throw new Error(error);
        }
        this.myUser = <OAuthUser>profile;
        localStorage.setItem('token', authResult.idToken);
        localStorage.setItem('profile', JSON.stringify(profile));
        this.router.navigate(['/']);
      });
    });
  }

  auth0Options = {
    theme: {
      logo: '../../assets/images/web-manager.svg',
      primaryColor: '#DFA612'
    },
    auth: {
      redirectUrl: environment.auth0.callbackURL,
      responseType: 'token id_token',
      audience: `https://${environment.auth0.domain}/userinfo`,
      params: {
        scope: 'openid profile'
      }
    },
    autoclose: true,
    oidcConformant: true,
  };

  lock : Auth0Lock = new Auth0Lock(
    environment.auth0.clientId,
    environment.auth0.domain,
    this.auth0Options
  );

  login() {
    this.lock.show();
  }

  logout() {
    this.myUser =  null;;
    localStorage.removeItem('profile');
    localStorage.removeItem('token');
  }
}
