import {ConfigurationServiceScalecube} from '../../src/provider/Scalecube/ConfigurationServiceScalecube';
import {AxiosDispatcher} from '@capsulajs/capsulajs-transport-providers';
import {messages} from '../../src';
import {getRepositoryKeyNotFoundErrorMessage, getRepositoryNotFoundErrorMessage} from '../../src/utils';
import {runTestsRejectedError} from '../utils';

const token = 'token';
const emptyToken = '';
const repository = 'Adele';
const repositoryB = '';
const key = 'Hello';
const keys = ' ';
const dispatcher = new AxiosDispatcher(`${token}`);
const mockedCallback = jest.fn();
dispatcher.dispatch = mockedCallback;
const configService = new ConfigurationServiceScalecube(token, dispatcher);

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

  it('Call any method from configurationServiceScalecube with not-existent repository should throw error', async () => {
    expect.assertions(5);
    const exception: RemoteConfigurationServerError = {
      errorCode: 500,
      errorMessage: getRepositoryNotFoundErrorMessage(repository)
    };
    ['delete', 'createRepository', 'entries', 'fetch', 'save'].forEach((method) => {
      mockedCallback.mockRejectedValueOnce(exception);
      // @ts-ignore
      expect(configService[method]({repository, key})).rejects.toEqual(exception);
    });
  });

  it('Call fetch(), save() without providing key should throw an error', (done) => {
    runTestsRejectedError(expect, done)(
      configService,
      ['fetch', 'save'],
      {repository, undefined},
      new Error(messages.repositoryKeyNotProvided)
    );
  });

  it('Call fetch(),  save(), delete() with not-existent key should throw an error', (done) => {
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
});
