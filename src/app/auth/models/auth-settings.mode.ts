export interface IAuthSettings {
    applicationName: string;
    clientId: string;
    authority: string;
    scopes: string[];
    tenantId: string;
    policyName: string;
    isAuthB2C: boolean;
}
