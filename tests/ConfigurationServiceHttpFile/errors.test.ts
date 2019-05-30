import { ConfigurationServiceHttp } from 'provider/HttpProvider';
import { messages } from '../../src';
import { runTestsRejectedError } from '../utils';
import { ConfigurationServiceHttpFile } from 'provider/HttpFile';
import { mockFetchFile } from '../utils';

const token = 'localhost:1234';
const repository = 'Versus';
const key = 'artist';
const value = 'Oxxy';
const surprise = 'This is all Matrix';
const configurationData = {
  [key]: value,
  Surprise: surprise
};

const notFoundRepo = 'notFoundRepo';
const notFoundKey = 'notFoundKey';

const configService = new ConfigurationServiceHttpFile(token);

describe('Test suite for the ConfigurationServiceHttpFile', () => {

  it('New instance of service should throw \'dispatcherNotProvided\' error', () => {
    expect.assertions(1);
    // @ts-ignore
    return expect(() => new ConfigurationServiceHttpFile()).toThrow(new Error(messages.tokenNotProvided));
  });

  it('New instance should return \'repositoryNotProvided\' error', (done) => {
    runTestsRejectedError(expect, done)(
      configService,
      ['entries', 'fetch'],
      {},
      new Error(messages.repositoryNotProvided)
    );
  });

  it('Call fetch(), entries() with unexisting repository should return \'repository not found\' error', (done) => {
    runTestsRejectedError(expect, done)(
      configService,
      ['entries', 'fetch'],
      { repository: notFoundRepo, key },
      new Error(`Configuration repository ${notFoundRepo} not found`),
      () => {
        mockFetchFile({ type: 'reject', content: 'file not found' })
      }
    );
  });

  it('Call fetch() without providing key should return \'repositoryKeyNotProvided\' error', (done) => {
    runTestsRejectedError(expect, done)(
      configService,
      ['fetch'],
      { repository },
      new Error(messages.repositoryKeyNotProvided)
    );
  });

  it('Call fetch()  with unexisting key should return \'repository key not found\' error', (done) => {
    runTestsRejectedError(expect, done)(
      configService,
      ['fetch'],
      { repository, key: notFoundKey },
      new Error(`Configuration repository key ${notFoundKey} not found`),
      () => {
        mockFetchFile({ type: 'resolve', content: configurationData })
      }
    );
  });

});
