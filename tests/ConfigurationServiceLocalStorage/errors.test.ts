import { ConfigurationService } from 'api/ConfigurationService';
import { ConfigurationServiceLocalStorage } from 'provider/LocalStorage';

const token = 'token';
const repository = 'Adele';
const key = 'Hello';
const value = 'It\'s me';
const configService = new ConfigurationServiceLocalStorage(token);

describe('Test suite for the ConfigurationServiceLocalStorage', () => {
  beforeEach(localStorage.clear);
  
  it('createRepository() should return configuration repository token not provided error', async () => {
    expect.assertions(1);
    const configService = new ConfigurationServiceLocalStorage();
    return configService.createRepository({}).catch(
      error => expect(error).toEqual(new Error(`Configuration repository token not provided`))
    );
  });
  
  it('createRepository() should return configuration repository not provided error', async () => {
    expect.assertions(1);
    return configService.createRepository({ token }).catch(
      error => expect(error).toEqual(new Error(`Configuration repository not provided`))
    );
  });
  
  it('delete() should return not found configuration repository error', async () => {
    expect.assertions(1);
    return configService.delete({ token, repository }).catch(
      error => expect(error).toEqual(new Error(`Configuration repository ${repository} not found`))
    );
  });
  
  it('fetch() should return not found configuration repository error', async () => {
    expect.assertions(1);
    return configService.fetch({ token, repository, key }).catch(
      error => expect(error).toEqual(new Error(`Configuration repository ${repository} not found`))
    );
  });
  
  it('fetch() should return not found configuration repository key error', async () => {
    expect.assertions(2);
    expect(await configService.createRepository({ token, repository })).toEqual({ repository });
    return configService.fetch({ token, repository, key }).catch(
      error => expect(error).toEqual(new Error(`Configuration repository key ${key} not found`))
    );
  });
  
  it('save() should return not found configuration repository error', async () => {
    expect.assertions(1);
    return configService.save({ token, repository, key, value }).catch(
      error => expect(error).toEqual(new Error(`Configuration repository ${repository} not found`))
    );
  });
  
});
