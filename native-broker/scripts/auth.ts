import { AuthenticationResult, PublicClientApplication, AuthError, AccountInfo } from '@azure/msal-browser';
import { authSetting } from '../environments/environments';

export class Auth {

  private client = new PublicClientApplication(authSetting);

  constructor() {
    this.init().then(_ => {});
  }

  private async init() {
    await this.client.initialize();

    const res = await this.client.handleRedirectPromise();
    console.log({res});
    if (res == null) {
      return;
    }
    this.client.setActiveAccount(res.account);
  }

  async signin() {
    this.client.loginRedirect({ scopes: [ 'user.read' ] });
    return;
  }

  async handleresponse(res: AuthenticationResult | null) {
    if (res != null) {
      this.client.setActiveAccount(res.account);
    }
  }

  async acquireToken(): Promise<AuthenticationResult | null> {
    return await this.client.acquireTokenSilent({ scopes: [ 'user.read' ] });
  }
}