import { ConfigurationService } from 'api/ConfigurationService';
import { ConfigurationServiceLocalStorage } from 'provider/LocalStorage';

const token = 'token';
const repository = 'Adele';
const key = 'Hello';
const value = 'It\'s me';
const configService = new ConfigurationServiceLocalStorage(token);

describe('Test suite for the ConfigurationServiceLocalStorage', () => {
  beforeEach(localStorage.clear);
  
  it('new instance of service should throw configuration repository token not provided error', async () => {
    expect.assertions(1);
    expect(() => new ConfigurationServiceLocalStorage()).toThrow(new Error(`Configuration repository token not provided`));
  });
  
  it('createRepository() should return configuration repository not provided error', async () => {
    expect.assertions(5);
  
    ['createRepository', 'delete', 'entries', 'fetch', 'save'].forEach((method) => {
      configService[method]({}).catch(
        error => expect(error).toEqual('Configuration repository not provided')
      );
    });
  });

  // it('delete() should return not found configuration repository error', async () => {
  //   expect.assertions(1);
  //   return configService.delete({ repository }).catch(
  //     error => expect(error).toEqual(new Error(`Configuration repository ${repository} not found`))
  //   );
  // });
  //
  // it('delete() without key should return empty object and delete configuration repository key', async () => {
  //   expect.assertions(5);
  //   expect(await configService.createRepository({ repository })).toEqual({ repository });
  //   expect(await configService.save({ repository, key, value })).toEqual({});
  //   expect(await configService.entries({ repository })).toEqual({ entries: [value] });
  //   expect(await configService.delete({ repository })).toEqual({});
  //   return configService.entries({ repository }).catch(
  //     error => expect(error).toEqual(new Error(`Configuration repository ${repository} not found`))
  //   );
  // });
  //
  // it('entries() should return not found configuration repository error', async () => {
  //   expect.assertions(1);
  //   return configService.entries({ repository }).catch(
  //     error => expect(error).toEqual(new Error(`Configuration repository ${repository} not found`))
  //   );
  // });
  //
  // it('fetch() should return configuration repository key not provided error', async () => {
  //   expect.assertions(2);
  //   expect(await configService.createRepository({ repository })).toEqual({ repository });
  //   return configService.fetch({ repository }).catch(
  //     error => expect(error).toEqual(new Error(`Configuration repository key not provided`))
  //   );
  // });
  //
  // it('fetch() should return not found configuration repository error', async () => {
  //   expect.assertions(1);
  //   return configService.fetch({ repository, key }).catch(
  //     error => expect(error).toEqual(new Error(`Configuration repository ${repository} not found`))
  //   );
  // });
  //
  // it('fetch() should return not found configuration repository key error', async () => {
  //   expect.assertions(2);
  //   expect(await configService.createRepository({ repository })).toEqual({ repository });
  //   return configService.fetch({ repository, key: 'Goodbye' }).catch(
  //     error => expect(error).toEqual(new Error(`Configuration repository key ${key} not found`))
  //   );
  // });
  //
  // it('save() should return not found configuration repository error', async () => {
  //   expect.assertions(1);
  //   return configService.save({ repository }).catch(
  //     error => expect(error).toEqual(new Error(`Configuration repository ${repository} not found`))
  //   );
  // });
  //
  // it('save() should return configuration repository key not provided error', async () => {
  //   expect.assertions(2);
  //   expect(await configService.createRepository({ repository })).toEqual({ repository });
  //   return configService.save({ repository }).catch(
  //     error => expect(error).toEqual(new Error(`Configuration repository key not provided`))
  //   );
  // });
  
});
