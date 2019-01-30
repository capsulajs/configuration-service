import { ConfigurationService } from 'api/ConfigurationService';
import { ConfigurationServiceLocalStorage } from 'provider/LocalStorage';
import { messages } from '../../src/utils';

const token = 'token';
const repository = 'Adele';
const key = 'Hello';
const value = 'It\'s me';
const configService = new ConfigurationServiceLocalStorage(token);

describe('Test suite for the ConfigurationServiceLocalStorage', () => {
  beforeEach(localStorage.clear);
  
  it('new instance of service should throw configuration repository token not provided error', async () => {
    expect.assertions(1);
    expect(() => new ConfigurationServiceLocalStorage()).toThrow(new Error(messages.tokenNotProvided));
  });

  it('new instance should return configuration repository not provided error', async () => {
    expect.assertions(5);
    ['createRepository', 'delete', 'entries', 'fetch', 'save'].forEach((method) => {
      configService[method]({}).catch(error => expect(error).toEqual(messages.repositoryNotProvided));
    });
  });
  
  it('delete() without key should return empty object and delete configuration repository key', async () => {
    expect.assertions(5);
    expect(await configService.createRepository({ repository })).toEqual({ repository });
    expect(await configService.save({ repository, key, value })).toEqual({});
    expect(await configService.entries({ repository })).toEqual({ entries: [{ key, value }] });
    expect(await configService.delete({ repository })).toEqual({});
    configService.entries({ repository }).catch(
      error => expect(error).toEqual(new Error(`Configuration repository ${repository} not found`))
    );
  });

  it('fetch() should return configuration repository key not provided error', async () => {
    expect.assertions(2);
    expect(await configService.createRepository({ repository })).toEqual({ repository });
    configService.fetch({ repository }).catch(
      error => expect(error).toEqual(new Error(messages.repositoryKeyNotProvided))
    );
  });

  it('fetch() should return not found configuration repository error', async () => {
    expect.assertions(1);
    return configService.fetch({ repository, key }).catch(
      error => expect(error).toEqual(new Error(`Configuration repository ${repository} not found`))
    );
  });

  it('fetch() should return not found configuration repository key error', async () => {
    expect.assertions(2);
    expect(await configService.createRepository({ repository })).toEqual({ repository });
    return configService.fetch({ repository, key }).catch(
      error => expect(error).toEqual(new Error(`Configuration repository key ${key} not found`))
    );
  });
  
  it('save() should return configuration repository key not provided error', async () => {
    expect.assertions(2);
    expect(await configService.createRepository({ repository })).toEqual({ repository });
    return configService.save({ repository }).catch(
      error => expect(error).toEqual(new Error(messages.repositoryKeyNotProvided))
    );
  });
  
});
