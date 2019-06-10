import { configurationTypes, getProvider } from '../../src/utils';

describe('Expose function to select configuration provider in Configuration service', () => {
  test.each`
    configProvider                            | configurationServiceClassName
    ${`${configurationTypes.localStorage}`}   | ${'ConfigurationServiceLocalStorage'}
    ${`${configurationTypes.localFile}`}      | ${'ConfigurationServiceFile'}
    ${`${configurationTypes.httpFile}`}       | ${'ConfigurationServiceHttpFile'}
    ${`${configurationTypes.hardcoreServer}`} | ${'ConfigurationServiceHardcoreRemote'}
    ${`${configurationTypes.httpServer}`}     | ${'ConfigurationServiceHttp'}
  `(
    'getProvider returns the configuration provider according to configProvider',
    async ({ configProvider, configurationProviderClassName }) => {
      expect.assertions(1);

      const Provider = getProvider({ configProvider });
      expect(Provider.name).toBe(configurationProviderClassName);
    }
  );

  it('getProvider with an non-existent configProvider is rejected with error', async () => {
    expect.assertions(1);
    try {
      getProvider({ configProvider: 'wrongConfigProvider' });
    } catch(error) {
      expect(error).toEqual(new Error('Some error'));
    }
  });
});
