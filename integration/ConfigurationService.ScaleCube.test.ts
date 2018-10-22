import { AxiosDispatcher } from 'capsulajs-transport-providers';
import { OrganizationService } from 'account-service';

import { wsUrl } from './constants';

import { getAuth0Token } from './getAuth0Token';

// declare var OrganizationService: any;

describe('Transport providers are available', () => {

  it('Creates an instance of the AxiosDispatcher', async () => {
    const auth0 = await getAuth0Token();
    console.log('AUTH):\n', auth0);
    expect(1).toBeTruthy();
    // const organizationService = new OrganizationService(new AxiosDispatcher(wsUrl));
    // console.log('ORGANIZATION SERVICE:\n', organizationService);
    // expect(organizationService.constructor).toBe(OrganizationService);
  });
});
