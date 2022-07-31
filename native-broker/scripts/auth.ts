import { AuthenticationResult, PublicClientApplication, AuthError } from '@azure/msal-browser';
import { authSetting } from '../environments/environments';

export class Auth {

  private client = new PublicClientApplication(authSetting);

  constructor() {
    this.init().then(() => {});
  }

  private async init() {
    // required to native broker
    this.client.initialize().then(() => {
      this.client.handleRedirectPromise().then(this.handleresponse);
    });
  }

  async handleresponse(res: AuthenticationResult | null) {
    console.log(res)
  }

  async acquireToken(): Promise<AuthenticationResult | null> {
    const res = await this.client.acquireTokenSilent({ scopes: [ 'user.read' ] }).catch((err: AuthError) => {
      if (err.errorMessage.includes('Please call setActiveAccount')) {
        this.setActiveAccount();
        return null;
      }
      throw err;
    });
    return res;
  }

  setActiveAccount() {
    console.log('run')
    console.log(this.client.getAllAccounts())
    this.client.setActiveAccount(null);
  }

}