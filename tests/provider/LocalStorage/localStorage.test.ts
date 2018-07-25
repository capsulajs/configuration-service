import { buildConfigurationServiceLocalStorage } from './localStorageUtils';

const configKey = 'testKey';

describe('Test suite fro the LocalStorageProvider', () => {

  it('Check getting a value', () => {

    const configService = buildConfigurationServiceLocalStorage(
      configKey,
      {
        numValue: 1,
        stringValue: 'test'
      }
    );

    return expect(configService.get(configKey)).resolves.toEqual({
      numValue: 1,
      stringValue: 'test'
    });
  });

  it('Check re-setting a value', () => {

    const configService = buildConfigurationServiceLocalStorage(
      configKey,
      {
        numValue: 1,
        stringValue: 'test'
      }
    );

    configService.set(configKey, {
      numValue: 3,
      stringValue: 'testX'
    });

    return expect(configService.get(configKey)).resolves.toEqual({
      numValue: 3,
      stringValue: 'testX'
    });
  });

  /*it('Check clear operation ', () => {
    const localStorageProvider = buildLocalStorageProvider(configKey, {
      numValue: 1,
      stringValue: 'test'
    });

    localStorageProvider.dispatch({ command: 'clear' });

    return expect(localStorageProvider.dispatch({
      command: 'get'
    })).resolves.toEqual({});

  });*/
});
