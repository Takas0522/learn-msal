import { Injectable } from '@angular/core';
import * as msal from 'msal';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class AuthService {

  private msalClient: msal.UserAgentApplication;

  constructor() {}

  private userAccount: BehaviorSubject<msal.Account> = new BehaviorSubject<msal.Account>(null);
  private loginState: BehaviorSubject<'NOT_AUTH' | 'AUTH_COMP' | 'AUTH_ERROR'> =
    new BehaviorSubject<'NOT_AUTH' | 'AUTH_COMP' | 'AUTH_ERROR'>('NOT_AUTH');

  get userAccount$() {
    return this.userAccount.asObservable();
  }

  clientInit(configData: { clientId: string }) {
    const con: msal.Configuration = {
      auth: { clientId: configData.clientId }
    };
    this.msalClient = new msal.UserAgentApplication(con);
  }

  login() {
    this.msalClient.loginRedirect({scopes: ['user.read']});
  }

}
