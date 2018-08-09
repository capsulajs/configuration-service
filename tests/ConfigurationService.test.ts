import { ConfigurationService } from 'src/api/ConfigurationService';
import {
  removeLocalStorage,
  buildConfigurationServiceLocalStorage
} from './provider/LocalStorage/localStorageUtils';

describe('Test suite fro the LocalStorageProvider', () => {
  
  const configKey = 'localStorageKey';
  const createConfigurationService = async (defaultValues = undefined): ConfigurationService => {
    return await buildConfigurationServiceLocalStorage(configKey, defaultValues) as ConfigurationService;
  };

  beforeEach(removeLocalStorage);

  it('When getting not existing key should rejects with Error "Configuration key aKey not found"', async () => {
    const configService = await createConfigurationService();
    expect.assertions(1);
    return expect(configService.get('aKey')).rejects.toEqual(new Error('Configuration key aKey not found'));
  });
  
  it('When clearAll without any configuration values', async () => {
    const configService = await createConfigurationService();
    expect.assertions(1);
    return expect(configService.clearAll()).resolves.toBeUndefined();
  });
  
  it('When clearAll without a configuration values', async () => {
    const configService = await createConfigurationService({numValue: 1, stringValue: 'test'});
    expect.assertions(1);
    return expect(configService.clearAll()).resolves.toBeUndefined();
  });
  
  it('When clearKey removes a configuration key', async () => {
    const configService = await createConfigurationService({numValue: 1, stringValue: 'test'});
    expect.assertions(1);
    await configService.clearKey(configKey);
    return expect(configService.get(configKey)).rejects.toEqual(
      new Error(`Configuration key ${configKey} not found`)
    );
  });
  
  it('When getting a value', async () => {
    const configService = await createConfigurationService({numValue: 1, stringValue: 'test'});
    expect.assertions(1);
    return expect(configService.get(configKey)).resolves.toEqual({numValue: 1, stringValue: 'test'});
  });
  
  it('When keys returns list of configuration keys', async () => {
    const configService = await createConfigurationService({numValue: 1, stringValue: 'test'});
    expect.assertions(1);
    await configService.set(configKey + '1', {numValue: 3, stringValue: 'testX'});
    return expect(configService.keys()).resolves.toEqual([configKey, configKey + '1']);
  });
  
  it('When re-setting a value', async () => {
    const configService = await createConfigurationService({numValue: 1, stringValue: 'test'});
    expect.assertions(1);
    await configService.set(configKey, {numValue: 3, stringValue: 'testX'});
    return expect(configService.get(configKey)).resolves.toEqual({numValue: 3, stringValue: 'testX'});
  });
  
  it('When values returns an array of configuration values', async () => {
    const configService = await createConfigurationService({numValue: 1, stringValue: 'test'});
    expect.assertions(1);
    await configService.set(configKey + 'A', {numValue: 3, stringValue: 'testX'});
    return expect(configService.values()).resolves.toEqual([
      { numValue: 1, stringValue: 'test' },
      { numValue: 3, stringValue: 'testX' }
    ]);
  });
});
