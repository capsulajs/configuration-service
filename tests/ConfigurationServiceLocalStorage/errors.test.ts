import { ConfigurationServiceLocalStorage } from 'provider/LocalStorage';
import { messages } from '../../src';
import { invalidValues, invalidValuesForString, runTestsRejectedError } from '../utils';

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

  describe.each(['createEntry', 'updateEntry'])('Errors while the creation or updating of the entry', (methodName: 'createEntry' | 'updateEntry') => {
    test.each(invalidValues)(
      `Call ${methodName} with request, that is not an object, is rejected with an error (%s)`,
      (invalidRequest) => {
        expect.assertions(1);
        return expect(configService[methodName](invalidRequest))
          .rejects.toEqual(new Error(messages.invalidRequest));
      });

    test.each(invalidValuesForString)(
      `Call ${methodName} with invalid repository is rejected with an error (%s)`,
      (invalidRepository) => {
        expect.assertions(1);
        return expect(configService[methodName]({ repository: invalidRepository, key, value }))
          .rejects.toEqual(new Error(messages.invalidRepository));
      });

    test.each(invalidValuesForString)(
      `Call ${methodName} with invalid key is rejected with an error (%s)`,
      (invalidKey) => {
        expect.assertions(1);
        return expect(configService[methodName]({ repository, key: invalidKey, value }))
          .rejects.toEqual(new Error(messages.invalidKey));
      });

    it(`Call ${methodName} with a non-existent repository is rejected with an error`, () => {
      expect.assertions(1);
      const wrongRepository = 'wrong';
      return expect(configService[methodName]({ repository: wrongRepository, key, value }))
        .rejects.toEqual(new Error(messages.repositoryDoesNotExist(wrongRepository)));
    });

    it('Call createEntry() for an existing entry should be rejected with an error', async () => {
      expect.assertions(4);
      await expect(configService.createRepository({ repository })).resolves.toEqual({ repository });
      await expect(configService.createEntry({ repository, key, value })).resolves.toEqual({});
      await expect(configService.createEntry({ repository, key, value: { value: 'new' } }))
        .rejects.toEqual(new Error(messages.entryAlreadyExist(key)));
      return expect(configService.entries({ repository }))
        .resolves.toEqual({ entries: [{ key, value }] });
    });

    it('Call updateEntry() for a non-existing entry should be rejected with an error', async () => {
      expect.assertions(3);
      await expect(configService.createRepository({ repository })).resolves.toEqual({ repository });
      await expect(configService.updateEntry({ repository, key, value }))
        .rejects.toEqual(new Error(messages.entryDoesNotExist(key)));
      return expect(configService.entries({ repository }))
        .resolves.toEqual({ entries: [] });
    });
  });

});
