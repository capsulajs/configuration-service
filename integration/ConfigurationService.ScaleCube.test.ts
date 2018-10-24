(global as any).WebSocket = require('ws');

// import { AxiosDispatcher } from 'capsulajs-transport-providers';
import { Dispatcher, WebSocketDispatcher } from 'capsulajs-transport-providers';
import { OrganizationService } from 'account-service';

jest.setTimeout(30000);

import {
  wsUrl,
  testOrgName,
  testOrgEmail,
  apiKeyName,
  configRepo,
} from './constants';

import { getAuth0Token } from './getAuth0Token';

describe('Transport providers are available', () => {

  it('Creates an instance of the AxiosDispatcher', async () => {
    expect.assertions(4);

    let dispatcher: Dispatcher;
    try {

      const { data: { access_token: auth0Token } } = await getAuth0Token();
      expect(auth0Token).toBeTruthy();
      console.log('Auth0 Token:\n', auth0Token);
  
      const dispatcher = new WebSocketDispatcher(wsUrl);
      const orgService = new OrganizationService(dispatcher);
  
      let response  = await orgService.createOrganization({
        token: {
          issuer: 'Auth0',
          token: auth0Token,
        },
        name: testOrgName,
        email: testOrgEmail,
      });
      const orgId = response.id;
      expect(orgId).toBeTruthy();
      console.log('Organization created:\n', orgId);

      response = await orgService.addOrganizationApiKey({
        token: {
          issuer: 'Auth0',
          token: auth0Token,
        },
        organizationId: orgId,
        apiKeyName,
        claims: { role: 'Owner' },
      });
      const apiKey = response.apiKeys[0].key;
      expect(apiKey).toBeTruthy();
      console.log('Api Key created:\n', apiKey);

      response = await orgService.deleteOrganization({
        token: {
          issuer: 'Auth0',
          token: auth0Token,
        },
        organizationId: orgId,
      });
      expect(response.deleted).toBe(true);
      console.log('Organization deleted: ', response.deleted);

      dispatcher.finalize && dispatcher.finalize();
    }
    catch (err) {
      console.log('ERROR DURING EXECUTION:\n', err);
      throw err;
    }
  });
});
