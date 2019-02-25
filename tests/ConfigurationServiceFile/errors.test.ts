import { ConfigurationService } from 'api/ConfigurationService';
import { ConfigurationServiceFile } from 'provider/FileProvider';
import { messages } from '../../src/utils';

const token = 'test.conf.json';
const repository = 'Adele';
const notFoundRepository = 'Freddie Mercury';
const key = 'Hello';
const notFoundKey = 'Goodbye';
const configService = new ConfigurationServiceFile(token);

describe('Test suite for the ConfigurationServiceFile', () => {

  it('New instance of service should throw \'tokenNotProvided\' error', async () => {
    expect.assertions(1);
    expect(() => new ConfigurationServiceFile()).toThrow(new Error(messages.tokenNotProvided));
  });

  it('New instance should return \'repositoryNotProvided\' error', async () => {
    expect.assertions(2);
    ['entries', 'fetch'].forEach((method) => {
      configService[method]({}).catch(
        error => expect(error).toEqual(new Error(messages.repositoryNotProvided))
      );
    });
  });

  it('Call fetch(), entries() with unexisting repository should' +
    ' return \'Configuration repository is not found\' error', async () => {
    expect.assertions(2);
    ['entries', 'fetch'].forEach((method) => {
      configService[method]({ repository: notFoundRepository, key }).catch(
        error => expect(error).toEqual(new Error(`Configuration repository ${notFoundRepository} not found`))
      );
    });
  });

  it('Call fetch() without providing key should return \'repositoryKeyNotProvided\' error', async () => {
    expect.assertions(1);
    ['fetch'].forEach((method) => {
      configService[method]({ repository }).catch(
        error => expect(error).toEqual(new Error(messages.repositoryKeyNotProvided))
      );
    });
  });

  it('Call fetch()  with unexisting key should' +
    'return \'Configuration repository key not found\' error', async () => {
    expect.assertions(1);
    ['fetch'].forEach((method) => {
      configService[method]({ repository, key: notFoundKey }).catch(
        error => expect(error).toEqual(new Error(`Configuration repository key ${notFoundKey} not found`))
      );
    });
  });

});
