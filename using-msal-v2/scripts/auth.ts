import { PublicClientApplication, AuthenticationResult, AccountInfo } from '@azure/msal-browser';
import { adSettings } from './ad-settings';

export class Auth {

    scopes: string [] = ['user.read'];
    account: AccountInfo | null = null;
    private _client = new PublicClientApplication(adSettings);

    private async handleRedirectAsync(): Promise<void> {
        const res = await this._client.handleRedirectPromise().catch(err => {
            console.log({err});
        });
        console.log(res);
        if (res != null) {
            this.account = (res as AuthenticationResult).account;
        }
    }

    async loginRedirect() {
        await this.handleRedirectAsync();
        if (!this.account) {
            this._client.loginRedirect({ scopes: this.scopes  });
        }
    }

    async acquireToken(): Promise<string | void> {
        if (this.account == null) { return; }
        const res = await this._client.acquireTokenSilent({ scopes: this.scopes, account: this.account }).catch(
            err => {
                return this._client.acquireTokenPopup({ scopes: this.scopes });
            }
        )
        return res.accessToken;
    }
}
