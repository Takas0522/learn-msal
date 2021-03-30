export const environment = {
  production: true,
  adalConfig: {
    tenant: '<TenantId>',
    clientId: '<ClientId>'
  },
  msalConfig: {
    auth: {
      clientId: '<ClientId>',
      authority: 'https://login.microsoftonline.com/<TenantId>'
    }
  }
};
