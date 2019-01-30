import { ConfigurationService } from 'api/ConfigurationService';
import { ConfigurationServiceLocalStorage } from 'provider/LocalStorage';

const token = 'token';
const repository = 'Adele';
const key = 'Hello';
const value = 'It\'s me';

describe('Test suite for the ConfigurationServiceLocalStorage', () => {
  beforeEach(localStorage.clear);
  
  it('createRepository() should create configuration repository', async () => {
    expect.assertions(2);
    const configService = new ConfigurationServiceLocalStorage(token);
    expect(await configService.createRepository({ token, repository })).toEqual({ repository });
    expect(await configService.entries({ token, repository })).toEqual({ entries: [] });
  });
  
  it('delete() should return empty object and delete configuration repository', async () => {
    expect.assertions(4);
    const configService = new ConfigurationServiceLocalStorage(token);
    expect(await configService.createRepository({ token, repository })).toEqual({ repository });
    expect(await configService.entries({ token, repository })).toEqual({ entries: [] });
    expect(await configService.delete({ token, repository })).toEqual({});
    return configService.fetch({ token, repository }).catch(
      error => expect(error).toEqual(new Error(`Configuration repository ${repository} not found`))
    )
  });
  
  it('delete() should return empty object and delete configuration repository key', async () => {
    expect.assertions(5);
    const configService = new ConfigurationServiceLocalStorage(token);
    expect(await configService.createRepository({ token, repository })).toEqual({ repository });
    expect(await configService.save({ token, repository, key, value })).toEqual({});
    expect(await configService.entries({ token, repository })).toEqual({ entries: [value] });
    expect(await configService.delete({ token, repository, key })).toEqual({});
    expect(await configService.entries({ token, repository })).toEqual({ entries: [] });
  });
  
  it('delete() should return not found configuration repository error', async () => {
    expect.assertions(3);
    const configService = new ConfigurationServiceLocalStorage(token);
    expect(await configService.createRepository({ token, repository })).toEqual({ repository });
    expect(await configService.entries({ token, repository })).toEqual({ entries: [] });
    return configService.delete({ token, repository: 'Freddie Mercury' }).catch(
      error => expect(error).toEqual(new Error('Configuration repository Freddie Mercury not found'))
    )
  });
  
  it('delete() should return not found configuration repository error', async () => {
    expect.assertions(3);
    const configService = new ConfigurationServiceLocalStorage(token);
    expect(await configService.createRepository({ token, repository })).toEqual({ repository });
    expect(await configService.entries({ token, repository })).toEqual({ entries: [] });
    return configService.delete({ token, repository: 'Freddie Mercury' }).catch(
      error => expect(error).toEqual(new Error('Configuration repository Freddie Mercury not found'))
    )
  });
  
  it('entries() should return all values', async () => {
    expect.assertions(3);
    const configService = new ConfigurationServiceLocalStorage(token);
    expect(await configService.createRepository({ token, repository })).toEqual({ repository });
    expect(await configService.save({ token, repository, key, value })).toEqual({});
    expect(await configService.entries({ token, repository })).toEqual({ entries: [value] });
  });
  
  it('fetch() should return value by key', async () => {
    expect.assertions(3);
    const configService = new ConfigurationServiceLocalStorage(token);
    expect(await configService.createRepository({ token, repository })).toEqual({ repository });
    expect(await configService.save({ token, repository, key, value })).toEqual({});
    expect(await configService.fetch({ token, repository, key })).toEqual({ key, value });
  });
  
  it('fetch() should return not found repository error', async () => {
    expect.assertions(1);
    const configService = new ConfigurationServiceLocalStorage(token);
    return configService.fetch({ token, repository, key }).catch(
      error => expect(error).toEqual(new Error(`Configuration repository ${repository} not found`))
    )
  });
  
  it('fetch() should return not found repository key error', async () => {
    expect.assertions(2);
    const configService = new ConfigurationServiceLocalStorage(token);
    expect(await configService.createRepository({ token, repository })).toEqual({ repository });
    return configService.fetch({ token, repository, key }).catch(
      error => expect(error).toEqual(new Error(`Configuration repository key ${key} not found`))
    )
  });
  
});
