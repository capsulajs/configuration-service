import { ConfigurationServiceLocalStorage } from 'src/provider/LocalStorage';

import {
  removeLocalStorage,
  buildConfigurationServiceLocalStorage
} from './localStorageUtils';

const configKey = 'testKey';

describe('Test suite fro the LocalStorageProvider', () => {

  beforeEach(removeLocalStorage);

  it('Checks the error when localStorage does not exist', () => {
    return expect(
      () => new ConfigurationServiceLocalStorage('testConfig')
    ).toThrow(new Error('localStorage does not exist'));
  });

  it('Checks the error Configuration key not found', async () => {

    const configService = await buildConfigurationServiceLocalStorage(configKey);

    return expect(configService.get('aKey')).rejects.toEqual(new Error('Configuration key aKey not found'));
  });

  it('Checks clearAll without any configuration values', async () => {
    
    const configService = await buildConfigurationServiceLocalStorage(configKey);

    return expect(configService.clearAll()).resolves.toBeUndefined();
  });

  it('Checks clearAll without a configuration values', async () => {
    
    const configService = await buildConfigurationServiceLocalStorage(
      configKey,
      {
        numValue: 1,
        stringValue: 'test'
      }
    );

    return expect(configService.clearAll()).resolves.toBeUndefined();
  });

  it('Checks clearKey removes a configuration key', async () => {

    const configService = await buildConfigurationServiceLocalStorage(
      configKey,
      {
        numValue: 1,
        stringValue: 'test'
      }
    );

    await configService.clearKey(configKey);

    return expect(configService.get(configKey)).rejects.toEqual(new Error(`Configuration key ${configKey} not found`));
  });

  it('Checks getting a value', async () => {

    const configService = await buildConfigurationServiceLocalStorage(
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

  it('Checks keys returns list of configuration keys', async () => {

    const configService = await buildConfigurationServiceLocalStorage(
      configKey,
      {
        numValue: 1,
        stringValue: 'test'
      }
    );

    await configService.set(configKey + '1', {
      numValue: 3,
      stringValue: 'testX'
    });

    return expect(configService.keys()).resolves.toEqual([configKey, configKey + '1']);
  });

  it('Checks re-setting a value', async () => {

    const configService = await buildConfigurationServiceLocalStorage(
      configKey,
      {
        numValue: 1,
        stringValue: 'test'
      }
    );

    await configService.set(configKey, {
      numValue: 3,
      stringValue: 'testX'
    });

    return expect(configService.get(configKey)).resolves.toEqual({
      numValue: 3,
      stringValue: 'testX'
    });
  });

  it('Checks values returns an array of configuration values', async () => {

    const configService = await buildConfigurationServiceLocalStorage(
      configKey,
      {
        numValue: 1,
        stringValue: 'test'
      }
    );

    await configService.set(configKey + 'A', {
      numValue: 3,
      stringValue: 'testX'
    });

    return expect(configService.values()).resolves.toEqual([
      {
        numValue: 1,
        stringValue: 'test'
      },
      {
        numValue: 3,
        stringValue: 'testX'
        }
    ]);
  });
});
