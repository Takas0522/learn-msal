import { UserAgentApplication } from 'msal';
import { adSettings } from './ad-settings';

export class Auth {

    scopes: string [] = ['user.read'];
    private _client = new UserAgentApplication(adSettings);

    private async handleRedirectAsync(): Promise<void> {
        this._client.handleRedirectCallback((err, res) => {
            console.log({ err });
            console.log({ res });
        });
    }

    loginRedirect() {
        this.handleRedirectAsync();
        const account = this._client.getAccount();
        if (!account) {
            this._client.loginRedirect({ scopes: this.scopes  });
        }
    }

    async acquireToken(): Promise<string> {
        const res = await this._client.acquireTokenSilent({ scopes: this.scopes }).catch(
            err => {
                return this._client.acquireTokenPopup({ scopes: this.scopes });
            }
        )
        return res.accessToken;
    }
}
