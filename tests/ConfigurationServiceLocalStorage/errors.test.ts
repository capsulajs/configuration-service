import { ConfigurationService } from 'api/ConfigurationService';
import { ConfigurationServiceLocalStorage } from 'provider/LocalStorage';
import { messages } from '../../src/utils';
import { runTestsRejectedError } from '../utils';

const token = 'token';
const repository = 'Adele';
const key = 'Hello';
const value = 'It\'s me';
const configService = new ConfigurationServiceLocalStorage(token);

describe('Test suite for the ConfigurationServiceLocalStorage', () => {
  beforeEach(localStorage.clear);

  it('New instance of service should throw \'tokenNotProvided\' error', async () => {
    expect.assertions(1);
    return expect(() => new ConfigurationServiceLocalStorage()).toThrow(new Error(messages.tokenNotProvided));
  });

  it('New instance should return \'repositoryNotProvided\' error', (done) => {
    runTestsRejectedError(expect, done)(
      configService,
      ['createRepository', 'delete', 'entries', 'fetch', 'save'],
      {},
      new Error(messages.repositoryNotProvided)
    );
  });

  it('should return configuration repository already exists error', async () => {
    expect.assertions(1);
    await configService.createRepository({ repository });
    configService.createRepository({ repository }).catch(
      error => expect(error).toEqual(new Error(messages.repositoryAlreadyExists))
    );
  });

  it('Call delete(), fetch(), entries() and save() should return not found error', (done) => {
    runTestsRejectedError(expect, done)(
      configService,
      ['delete', 'entries', 'fetch', 'save'],
      { repository, key },
      new Error(`Configuration repository ${repository} not found`)
    );
  });

  it('Call fetch() and save() return \'repositoryKeyNotProvided\' error', async (done) => {
    await configService.createRepository({ repository });
    runTestsRejectedError(expect, done)(
      configService,
      ['fetch', 'save'],
      { repository },
      new Error(messages.repositoryKeyNotProvided)
    );
  });

  it('Call delete(), fetch() return \'repository key not found\' error', async (done) => {
    await configService.createRepository({ repository });
    runTestsRejectedError(expect, done)(
      configService,
      ['delete', 'fetch'],
      { repository, key },
      new Error(`Configuration repository key ${key} not found`)
    );
  });

  it('delete() without key should delete configuration repository', async () => {
    expect.assertions(5);
    expect(await configService.createRepository({ repository })).toEqual({ repository });
    expect(await configService.save({ repository, key, value })).toEqual({});
    expect(await configService.entries({ repository })).toEqual({ entries: [{ key, value }] });
    expect(await configService.delete({ repository })).toEqual({});
    configService.entries({ repository }).catch(
      error => expect(error).toEqual(new Error(`Configuration repository ${repository} not found`))
    );
  });

});
