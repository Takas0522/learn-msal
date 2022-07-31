import { AuthenticationResult, PublicClientApplication } from '@azure/msal-browser';
import { authSetting } from '../environments/environments';

export class Auth {

  private client = new PublicClientApplication(authSetting);

  constructor() {
    this.init().then(() => {});
  }

  private async init() {
    // required to native broker
    await this.client.initialize();
    const res = await this.client.handleRedirectPromise();
    console.log(res);
  }

  acquireToken(): Promise<AuthenticationResult> {
    return this.client.acquireTokenSilent({ scopes: [ 'user.read' ] });
  }

}