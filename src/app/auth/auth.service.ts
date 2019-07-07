import { Injectable } from '@angular/core';
import * as msal from 'msal';
import { BehaviorSubject, Subject } from 'rxjs';
import { IAuthSettings } from './models/auth-settings.mode';

@Injectable()
export class AuthService {

  private msalClient: msal.UserAgentApplication;
  private scopes: string[];

  constructor() {
    this.loginState.next('NOT_AUTH');
  }

  private userAccount: BehaviorSubject<msal.Account> = new BehaviorSubject<msal.Account>(null);
  private loginState: Subject<'NOT_AUTH' | 'AUTH_COMP' | 'AUTH_ERROR'> =
    new Subject<'NOT_AUTH' | 'AUTH_COMP' | 'AUTH_ERROR'>();

  get userAccount$() {
    return this.userAccount.asObservable();
  }
  get loginState$() {
    return this.loginState.asObservable();
  }

  clientInit(configData: IAuthSettings) {
    const con: msal.Configuration = {
      auth: {
        clientId: configData.clientId,
        authority: configData.authority
      }
    };
    this.msalClient = new msal.UserAgentApplication(con);
  }

  login() {
    const account = this.msalClient.getAccount();
    if (!account) {
      this.msalClient.loginPopup({ scopes: this.scopes }).then(
        loginResponse => {
          this.loginState.next('AUTH_COMP');
        })
        .catch(err => {
          this.loginState.next('AUTH_ERROR');
          console.log(err);
        });
    } else {
      this.getToken();
    }
  }

  getToken() {
    this.msalClient.acquireTokenSilent({ scopes: ['user.read'] }).then(token => {
      console.log('get token');
      console.log(token);
    });
  }

}
