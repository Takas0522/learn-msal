import { Injectable } from '@angular/core';
import * as msal from 'msal';
import { BehaviorSubject } from 'rxjs';
import { IAuthSettings } from './models/auth-settings.mode';

@Injectable()
export class AuthService {

  private msalClient: msal.UserAgentApplication;
  private scopes: string[];

  constructor() {
    this.clientInit({
      scopes: [],
      applicationName: '',
      clientId: '',
      authority: '',
      isAuthB2C: false,
      policyName: '',
      tenantId: ''
    });
  }

  private userAccount: BehaviorSubject<msal.Account> = new BehaviorSubject<msal.Account>(null);
  private loginState: BehaviorSubject<'NOT_AUTH' | 'AUTH_COMP' | 'AUTH_ERROR'> =
    new BehaviorSubject<'NOT_AUTH' | 'AUTH_COMP' | 'AUTH_ERROR'>('NOT_AUTH');

  get userAccount$() {
    return this.userAccount.asObservable();
  }

  clientInit(configData: IAuthSettings) {
    const con: msal.Configuration = {
      auth: {
        clientId: '',
        authority: ''
      }
    };
    this.msalClient = new msal.UserAgentApplication(con);
  }

  login() {
    const account = this.msalClient.getAccount();
    if (!account) {
      this.msalClient.loginPopup({ scopes: this.scopes }).then(
        loginResponse => {
          this.getToken();
        })
        .catch(err => {
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
