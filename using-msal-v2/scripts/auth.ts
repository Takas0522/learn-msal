import { UserAgentApplication } from 'msal';
import { adSettings } from './ad-settings';

export class Auth {
    private _client = new UserAgentApplication(adSettings);

    constructor() {
        this._client.handleRedirectCallback((err, res) => {
            console.log({ err });
            console.log({ res });
        });
    }

    scopes: string [] = ['user.read'];

    loginRedirect() {
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
