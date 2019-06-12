import { configurationTypes, getProvider, messages } from '../../src/utils';

describe('Expose function to select configuration provider in Configuration service', () => {
  test.each`
    configProvider                            | configurationProviderClassName
    ${`${configurationTypes.localStorage}`}   | ${'ConfigurationServiceLocalStorage'}
    ${`${configurationTypes.localFile}`}      | ${'ConfigurationServiceFile'}
    ${`${configurationTypes.httpFile}`}       | ${'ConfigurationServiceHttpFile'}
    ${`${configurationTypes.scalecube}`}      | ${'ConfigurationServiceScalecube'}
    ${`${configurationTypes.httpServer}`}     | ${'ConfigurationServiceHttp'}
  `(
    'getProvider returns the configuration provider according to configProvider',
    async ({ configProvider, configurationProviderClassName }) => {
      expect.assertions(1);

      const Provider = getProvider({ configProvider });
      return expect(Provider.name).toBe(configurationProviderClassName);
    }
  );

  test.each`
    invalidRequest
    ${''}
    ${{}}
    ${{ test: 'test' }}
    ${[]}
    ${['test']}
    ${null}
    ${undefined}
    ${true}
    ${false}
    ${0}
    ${-1}
  `(
    'getProvider with an invalid configProvider throws an error',
    async ({ invalidRequest }) => {
      expect.assertions(1);
      try {
        // @ts-ignore
        getProvider(invalidRequest);
      } catch(error) {
        return expect(error).toEqual(new Error(messages.getProviderInvalidRequest));
      }
    }
  );

  it('getProvider with an non-existent configProvider throws an error', async () => {
    expect.assertions(1);
    try {
      // @ts-ignore
      getProvider({ configProvider: 'wrongConfigProvider' });
    } catch(error) {
      return expect(error).toEqual(new Error(messages.configProviderDoesNotExist));
    }
  });
});
