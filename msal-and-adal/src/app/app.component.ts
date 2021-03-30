import { Component, OnInit } from '@angular/core';
import { AdalService } from 'adal-angular4';
import { environment } from 'src/environments/environment';
import { AccountInfo, AuthError, PublicClientApplication } from '@azure/msal-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  adalAuthenticated = false;
  adalLoginUser = '';
  adalAccessToken = '';
  msalClient = new PublicClientApplication(environment.msalConfig);
  msalAuthenticated = false;
  msalLoginUser: string | undefined = '';
  private account: AccountInfo | null = null;
  msalAccessToken = '';

  constructor(
    private adalService: AdalService
  ) {}
  ngOnInit(): void {
    this.applicationSettings();
  }

  private async applicationSettings(): Promise<void> {
    if (window !== window.parent) {
      console.log('ADAL IFRANE');
      return;
    }
    console.log('ADAL SETTING INIT START');
    this.adalSettingsInit();
    console.log('ADAL SETTING INIT END');
    if (!this.adalService.userInfo.authenticated) {
      return;
    }
    await this.msalSettingInit();
  }

  private adalSettingsInit(): void {
    this.adalService.init(environment.adalConfig);
    this.adalService.handleWindowCallback(false);
    console.log(this.adalService.userInfo);
    if (!this.adalService.userInfo.authenticated) {
      console.log('ADAL LOGIN');
      this.adalService.login();
      return;
    }
    this.adalAuthenticated = true;
    this.adalLoginUser = this.adalService.userInfo.userName;
  }

  private async msalSettingInit(): Promise<void> {
    if (window !== window.parent) {
      console.log('MSAL IFRANE');
      return;
    }
    console.log('MSAL SETTING INIT START');
    const item = sessionStorage.getItem('redirectlogin');
    if (item) {
      console.log('MSAL REDIRECT LOGIN');
      const hres = await this.msalClient.handleRedirectPromise();
      console.log(hres)
      if (hres) {
        this.msalAuthenticated = true;
        this.msalLoginUser = hres.account?.name;
        this.account = hres.account;
        console.log(this.account)
        sessionStorage.removeItem('redirectlogin');
      }
      return;
    }
    const res = await this.msalClient.ssoSilent({ loginHint: this.adalLoginUser }).catch((err: AuthError) => {
      console.log('ERROR');
      if (err.errorMessage.includes('AADSTS50058')) {
        sessionStorage.setItem('redirectlogin', 'true');
        this.msalClient.loginRedirect({ scopes: ['user.read'] });
      }
    });
    console.log('MSAL SETTING SSO SILENT CALL BACK');
    if (res) {
      this.msalAuthenticated = true;
      this.msalLoginUser = res.account?.name;
      this.account = res.account;
    }
    console.log('MSAL SETTING END');
  }

  adalAquireToken(): void {
    this.adalService.acquireToken('439ac490-062a-4e72-aadc-edba537a4381').subscribe(res => {
      if (res) {
        this.adalAccessToken = res;
      }
    });
  }

  async msalAquireToken(): Promise<void> {
    console.log(this.account)
    if (!this.account) {
      return;
    }
    const res = await this.msalClient.acquireTokenSilent({ account: this.account, scopes: ['user.read'] });
    this.msalAccessToken = res.accessToken;
  }
}
