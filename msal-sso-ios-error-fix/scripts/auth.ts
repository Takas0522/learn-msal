import { PublicClientApplication, AuthenticationResult, AccountInfo, AuthError } from '@azure/msal-browser';
import { authSetting, loginhint } from '../environments/environments';

export class MsalAuth {
  scopes: string[] = ['user.read'];
  account: AccountInfo | null = null;

  private client = new PublicClientApplication(authSetting);

  async login(): Promise<AuthenticationResult | null> {
    const errFlow = sessionStorage.getItem('errflowaction');
    if (errFlow) {
      // エラーが発生した場合のリダイレクトログインフロー
      const res = await this.client.handleRedirectPromise();
      if (res) {
        this.account = res.account;
      }
      sessionStorage.removeItem('errflowaction');
      return res;
    }

    const res = await this.client.ssoSilent({ loginHint: loginhint }).catch((err: AuthError) => {
      if(err.errorMessage.includes('AADSTS50058')) {
        // AADSTS50058エラーが発生した場合の処理(loginRedirect)
        sessionStorage.setItem('errflowaction', 'dummy');
        this.client.loginRedirect();
        return null;
      }
      throw err;
    });
    if (res) {
      this.account = res.account;
      return res;
    }
    return null;
  }

  // logiPopupの場合
  // async login(): Promise<AuthenticationResult> {
  //   const res = await this.client.ssoSilent({ loginHint: loginhint }).catch((err: AuthError) => {
  //     if(err.errorMessage.includes('AADSTS50058')) {
  //       return this.client.loginPopup();
  //     }
  //     throw err;
  //   });
  //   this.account = res.account;
  //   return res;
  // }

  async acquireToken(): Promise<string | null> {
    if (this.account) {
      const res = await this.client.acquireTokenSilent({ scopes: this.scopes, account: this.account });
      console.log(res)
      return res.accessToken;
    }
    return null;
  }
}