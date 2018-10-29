(global as any).WebSocket = require('ws');

// import { AxiosDispatcher } from 'capsulajs-transport-providers';
import { Dispatcher, WebSocketDispatcher } from 'capsulajs-transport-providers';
import { OrganizationService } from 'account-service';
import { ConfigurationServiceScaleCube } from 'provider/ScaleCube';

// Creating buckets in Couchbase takes some time
jest.setTimeout(60 * 1000);

import {
  wsUrl,
  testOrgName,
  testOrgEmail,
  apiKeyName,
  configRepo,
} from './constants';

import { getAuth0Token } from './getAuth0Token';

describe('Integranital sanity test of the ScaleCube configuration provider', () => {

  it('Creates an Organization, a Configuration for it and add/remove values in it', async () => {
    expect.assertions(5);

    // let dispatcher: Dispatcher;
    try {

      // Get Auth0 token
      const { data: { access_token: auth0Token } } = await getAuth0Token();
      expect(auth0Token).toBeTruthy();
      console.log('Auth0 Token:\n', auth0Token);
  
      const dispatcher = new WebSocketDispatcher(wsUrl);
      const orgService = new OrganizationService(dispatcher);
  
      // Create Organization
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

      // Add Organization API Key
      response = await orgService.addOrganizationApiKey({
        token: {
          issuer: 'Auth0',
          token: auth0Token,
        },
        organizationId: orgId,
        apiKeyName,
        claims: { role: 'Owner' },
      });
      const apiKey: string = response.apiKeys[0].key;
      expect(apiKey).toBeTruthy();
      console.log('Api Key created:\n', apiKey);

      // Create ScaleCube Configuration Provider
      const configService = new ConfigurationServiceScaleCube(
        'CONFIG',
        apiKey,
        dispatcher
      );

      // Create Configuration Repository
      response = await configService.createRepository({});
      expect(response).toEqual({});
      console.log('Configuration created:\n', response);

      // Set a string Key Value
      response = await configService.set({
        key: 'stringKey',
        value: 'Hello, World!',
      });
      console.log('String Value was set:\n', response);
      // Get a string Key Value
      response = await configService.get({
        key: 'stringKey',
      });
      console.log('String Value was gotten:\n', response);

      // Set a number Key Value
      response = await configService.set({
        key: 'numberKey',
        value: Math.PI,
      });
      console.log('Number Value was set:\n', response);
      // Get a number Key Value
      response = await configService.get({
        key: 'numberKey',
      });
      console.log('Number Value was gotten:\n', response);

      // finally, Remove Organization
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
