import { ConfigurationService } from 'src/api/ConfigurationService';

import {
    removeLocalStorage,
    buildConfigurationServiceLocalStorage
} from './localStorageUtils';


describe('Test suite fro the LocalStorageProvider', () => {


    const createConfigurationService = async (): ConfigurationService => {
        return await buildConfigurationServiceLocalStorage('localStorageKey') as ConfigurationService;
    };

    beforeEach(removeLocalStorage);

    it('When getting not existing key should rejects with Error "Configuration key aKey not found"', async () => {
        const configService = createConfigurationService();
        expect.assertions(1);
        return expect(configService.get('aKey')).rejects.toEqual(new Error('Configuration key aKey not found'));
    });
});
