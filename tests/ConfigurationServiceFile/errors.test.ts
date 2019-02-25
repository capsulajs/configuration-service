import { ConfigurationService } from 'api/ConfigurationService';
import { ConfigurationServiceFile } from 'provider/FileProvider';
import { messages } from '../../src/utils';
import { runTestsRejectedError } from '../utils';

const token = 'test';
const repository = 'repository.json';
const notFoundRepository = 'Freddie Mercury';
const key = 'Hello';
const notFoundKey = 'Goodbye';
const configService = new ConfigurationServiceFile(token);

describe('Test suite for the ConfigurationServiceFile', () => {

  it('New instance of service should throw \'tokenNotProvided\' error', async () => {
    expect.assertions(1);
    return expect(() => new ConfigurationServiceFile()).toThrow(new Error(messages.tokenNotProvided));
  });

  it('New instance should return \'repositoryNotProvided\' error', (done) => {
    runTestsRejectedError(expect, done)(
      configService,
      ['entries', 'fetch'],
      {},
      new Error(messages.repositoryNotProvided)
    );
  });

  it('Call fetch(), entries() with unexisting repository should return \'repository is not found\' error', (done) => {
    runTestsRejectedError(expect, done)(
      configService,
      ['entries', 'fetch'],
      { repository: notFoundRepository, key },
      new Error(`Configuration repository ${notFoundRepository} not found`)
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
      new Error(`Configuration repository key ${notFoundKey} not found`)
    );
  });

});
