import { Injectable } from '@angular/core';
import * as msal from 'msal';
import { BehaviorSubject } from 'rxjs';
import { IAuthSettings } from './models/auth-settings.mode';

@Injectable()
export class AuthService {

  private msalClient: msal.UserAgentApplication;

  constructor() {
    this.clientInit({ scopes: [], applicationName: '', clientId: '6d6810ca-bfe2-45ba-aee0-fcbe2777dbd5' });
  }

  private userAccount: BehaviorSubject<msal.Account> = new BehaviorSubject<msal.Account>(null);
  private loginState: BehaviorSubject<'NOT_AUTH' | 'AUTH_COMP' | 'AUTH_ERROR'> =
    new BehaviorSubject<'NOT_AUTH' | 'AUTH_COMP' | 'AUTH_ERROR'>('NOT_AUTH');

  get userAccount$() {
    return this.userAccount.asObservable();
  }

  clientInit(configData: IAuthSettings) {
    const con: msal.Configuration = {
      auth: { clientId: configData.clientId }
    };
    this.msalClient = new msal.UserAgentApplication(con);
    this.msalClient.handleRedirectCallback((err, res) => {
      console.log('handle');
      console.log(res);
      console.log(err);
    });
  }

  login() {
    const account = this.msalClient.getAccount();
    if (!account) {
      console.log(account);
      this.msalClient.loginPopup({ scopes: ['openid', 'profile', 'user.read' ] }).then(
        loginResponse => {
          console.log('hoge');
          console.log(loginResponse);
        })
        .catch(err => {
          console.log(err);
        });
    } else {
      console.log(account);
    }
  }

}
