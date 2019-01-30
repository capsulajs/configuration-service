import { ConfigurationService } from 'api/ConfigurationService';
import { ConfigurationServiceLocalStorage } from 'provider/LocalStorage';

const token = 'token';

describe('Test suite for the LocalStorageProvider', () => {
  beforeEach(localStorage.clear);
  
  it('When fetch not existing repository should rejects with an error', async () => {
    expect.assertions(1);
    const configService = new ConfigurationServiceLocalStorage(token);
    return configService.fetch({ token, repository: 'Adele' }).catch(
      error => expect(error).toEqual(new Error('Configuration repository Adele not found'))
    );
  });
  
  it('When fetch not existing repository key should rejects with an error', async () => {
    expect.assertions(1);
    const configService = new ConfigurationServiceLocalStorage(token);
    await configService.createRepository({ token, repository: 'Adele' });
    await configService.save({ token, repository: 'Adele', key: 'Hello', value: 'It\'s me' });
    return configService.fetch({ token, repository: 'Adele', key: 'Goodbye' }).catch(
      error => expect(error).toEqual(new Error('Configuration repository key Goodbye not found'))
    );
  });
  
  it('When delete with key should delete repository key', async () => {
    expect.assertions(2);
    const configService = new ConfigurationServiceLocalStorage(token);
    await configService.createRepository({ token, repository: 'Adele' });
    await configService.save({ token, repository: 'Adele', key: 'Hello', value: 'It\'s me' });
    expect(await configService.entries({ token, repository: 'Adele' })).toBe(['It\'s me']);
    await configService.delete({ token, repository: 'Adele', key: 'Hello' });
    expect(await configService.entries({ token, repository: 'Adele' })).toBe([]);
  });
  
  it('When delete without key should delete repository', async () => {
    expect.assertions(2);
    const configService = new ConfigurationServiceLocalStorage(token);
    await configService.createRepository({ token, repository: 'Adele' });
    await configService.save({ token, repository: 'Adele', key: 'Hello', value: 'It\'s me' });
    expect(await configService.entries({ token, repository: 'Adele' })).toBe(['It\'s me']);
    await configService.delete({ token, repository: 'Adele' });
    return configService.fetch({ token, repository: 'Adele' }).catch(
      error => expect(error).toEqual(new Error('Configuration repository Adele not found'))
    );
  });
  
  // it('When getting a value', async () => {
  //   const configService = await createConfigurationService({ numValue: 1, stringValue: 'test' });
  //   expect.assertions(1);
  //   return expect(configService.get({ key: configKey })).resolves.toEqual({ numValue: 1, stringValue: 'test' });
  // });
  //
  // it('When keys returns list of configuration keys', async () => {
  //   const configService = await createConfigurationService({ numValue: 1, stringValue: 'test' });
  //   expect.assertions(1);
  //   await configService.set({ key: configKey + '1', value: { numValue: 3, stringValue: 'testX' } });
  //   return expect(configService.keys()).resolves.toEqual([configKey, configKey + '1']);
  // });
  //
  // it('When re-setting a value', async () => {
  //   const configService = await createConfigurationService({ numValue: 1, stringValue: 'test' });
  //   expect.assertions(1);
  //   await configService.set({ key: configKey, value: { numValue: 3, stringValue: 'testX' } });
  //   return expect(configService.get({ key: configKey })).resolves.toEqual({ numValue: 3, stringValue: 'testX' });
  // });
  //
  // it('When values returns an array of configuration values', async () => {
  //   const configService = await createConfigurationService({ numValue: 1, stringValue: 'test' });
  //   expect.assertions(1);
  //   await configService.set({ key: configKey + 'A', value: { numValue: 3, stringValue: 'testX' } });
  //   return expect(configService.values()).resolves.toEqual([
  //     { numValue: 1, stringValue: 'test' },
  //     { numValue: 3, stringValue: 'testX' }
  //   ]);
  // });
});
