import {AxiosDispatcher} from '@capsulajs/capsulajs-transport-providers';
import {ConfigurationServiceScalecube} from '../../src';
import {messages} from '../../src';
import {getRepositoryKeyNotFoundErrorMessage, getRepositoryNotFoundErrorMessage} from '../../src/utils';
import { invalidValues, invalidValuesForString, runTestsRejectedError } from '../utils';

const token = 'token';
const emptyToken = '';
const repository = 'Adele';
const key = 'Hello';
const dispatcher = new AxiosDispatcher(`${token}`);
const mockedCallback = jest.fn();
dispatcher.dispatch = mockedCallback;
const configService = new ConfigurationServiceScalecube(token, dispatcher);
const value = {
  envName: 'New Env'
};

interface RemoteConfigurationServerError {
  errorCode: number;
  errorMessage: string;
}

afterEach(() => {
  jest.restoreAllMocks();
  mockedCallback.mockClear();
});

describe('Errors tests for the ConfigurationServiceScalecube', () => {
  it('Create new instance of service without providing a token should throw an error', async () => {
    expect.assertions(1);
    return expect(() => new ConfigurationServiceScalecube(emptyToken, dispatcher)).toThrow(new Error(messages.tokenNotProvided));
  });

  it('Call any method from configurationServiceScalecube without repository in the request - error is thrown', async () => {
    expect.assertions(5);
    ['delete', 'createRepository', 'entries', 'fetch', 'save'].forEach((method) => {
      // @ts-ignore
      expect(configService[method]({})).rejects.toEqual(new Error(messages.repositoryNotProvided));
    });
  });

  it('Call delete(), entries(), fetch() and save() methods from configurationServiceScalecube with not-existent repository should throw error', async () => {
    expect.assertions(4);
    const exception: RemoteConfigurationServerError = {
      errorCode: 500,
      errorMessage: getRepositoryNotFoundErrorMessage(repository)
    };
    ['delete', 'entries', 'fetch', 'save'].forEach((method) => {
      mockedCallback.mockRejectedValueOnce(exception);
      // @ts-ignore
      expect(configService[method]({repository, key})).rejects.toEqual(exception);
    });
  });

  it('Call fetch(), save(), delete() without providing key should throw an error', (done) => {
    runTestsRejectedError(expect, done)(
      configService,
      ['fetch', 'save', 'delete'],
      {repository, undefined},
      new Error(messages.repositoryKeyNotProvided)
    );
  });

  it('Call fetch(), save(), delete() with not-existent key should throw an error', (done) => {
    const exception: RemoteConfigurationServerError = {
      errorCode: 500,
      errorMessage: getRepositoryKeyNotFoundErrorMessage(key)
    };
    runTestsRejectedError(expect, done)(
      configService,
      ['fetch', 'save', 'delete'],
      {repository, key},
      exception,
      () => mockedCallback.mockRejectedValueOnce(exception)
    );
  });

  it('createRepository() providing an existing repository name should return error', async () => {
    expect.assertions(1);
    const exception: RemoteConfigurationServerError = {errorCode: 500, errorMessage: messages.repositoryAlreadyExists};
    mockedCallback.mockRejectedValueOnce(exception);
    return expect(configService.createRepository({repository})).rejects.toEqual(exception);
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

    it(`Call ${methodName} with a valid request and there is a server error - promise is rejected with an error`, () => {
      expect.assertions(1);
      const exception = { errorCode: 500, errorMessage: 'Server error' };
      mockedCallback.mockRejectedValueOnce(exception);
      return expect(configService[methodName]({ repository, key, value })).rejects.toEqual(exception);
    });
  });
});
