import { ConfigurationServiceHttp } from 'provider/HttpProvider';
import { messages } from '../../src/utils';
import { runTestsRejectedError } from '../utils';

const token = 'localhost:1234';
const repository = 'Adele';
const notFoundRepository = 'Freddie Mercury';
const key = 'Hello';
const notFoundkey = 'Goodbye';
const value = 'It\'s me';

const mock = jest.fn();
const configService = new ConfigurationServiceHttp(token);
// @ts-ignore
configService.dispatcher.dispatch = mock;

describe('Test suite for the ConfigurationServiceHttp', () => {

  it('New instance of service should throw \'dispatcherNotProvided\' error', () => {
    expect.assertions(1);
    return expect(() => new ConfigurationServiceHttp("")).toThrow(new Error(messages.tokenNotProvided));
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
      { repository: notFoundRepository, key },
      new Error(`Configuration repository ${notFoundRepository} not found`),
      () => mock.mockRejectedValueOnce(null)
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
      { repository, key: notFoundkey },
      new Error(`Configuration repository key ${notFoundkey} not found`),
      () => mock.mockResolvedValueOnce({ [key]: value })
    );
  });

});
