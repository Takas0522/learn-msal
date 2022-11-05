import { Injectable } from '@angular/core';
import { AccountInfo, PublicClientApplication } from '@azure/msal-browser';
import { from, Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment.auth';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  private client!: PublicClientApplication;
  private account: null | AccountInfo = null;
  private _myRole: string[] = [];
  get myRole() {
    return this._myRole;
  }

  constructor() {
    this.applicationInit();
  }

  private async applicationInit() {
    this.client = new PublicClientApplication(environment.msalConfig);
    const res = await this.client.handleRedirectPromise();
    console.log(res);
    if (!res) {
      this.client.loginRedirect();
      return;
    }
    this._myRole = (res.idTokenClaims as { roles: string[] }).roles;
    this.account = res.account;
  }

  acquireToken(): Observable<string> {
    if (this.account == null) {
      return of('');
    }
    return from(this.client.acquireTokenSilent({ scopes: environment.scopes, account: this.account }).then(t => t.accessToken))
  }
}
