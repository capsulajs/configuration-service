import { ConfigurationService } from 'api/ConfigurationService';
import { ConfigurationServiceLocalStorage } from 'provider/LocalStorage';

const token = 'token';
const repository = 'Adele';
const key = 'Hello';
const value = 'It\'s me';
const configService = new ConfigurationServiceLocalStorage(token);

describe('Test suite for the ConfigurationServiceLocalStorage', () => {
  beforeEach(localStorage.clear);
  
  it('createRepository() should create configuration repository', async () => {
    expect.assertions(2);
    expect(await configService.createRepository({ token, repository })).toEqual({ repository });
    expect(await configService.entries({ token, repository })).toEqual({ entries: [] });
  });
  
  it('delete() should return empty object and delete configuration repository key', async () => {
    expect.assertions(5);
    expect(await configService.createRepository({ token, repository })).toEqual({ repository });
    expect(await configService.save({ token, repository, key, value })).toEqual({});
    expect(await configService.entries({ token, repository })).toEqual({ entries: [value] });
    expect(await configService.delete({ token, repository, key })).toEqual({});
    expect(await configService.entries({ token, repository })).toEqual({ entries: [] });
  });
  
  
  it('entries() should return all values', async () => {
    expect.assertions(3);
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
  
  it('save() should persist value by key', async () => {
    expect.assertions(3);
    expect(await configService.createRepository({ token, repository })).toEqual({ repository });
    expect(await configService.save({ token, repository, key, value })).toEqual({});
    expect(await configService.entries({ token, repository })).toEqual({ entries: [value] });
  });
  
});
