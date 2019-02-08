import { ConfigurationService } from 'api/ConfigurationService';
import { ConfigurationServiceFile } from 'provider/FileProvider';
import { messages } from '../../src/utils';

const filename = 'test.conf.json';
const repository = 'Adele';
const key = 'Hello';
const value = 'It\'s me';
const configService = new ConfigurationServiceFile(filename);

describe('Test suite for the ConfigurationServiceFile', () => {
  
  it('New instance of service should throw \'filenameNotProvided\' error', async () => {
    expect.assertions(1);
    expect(() => new ConfigurationServiceFile()).toThrow(new Error(messages.filenameNotProvided));
  });
  
  it('New instance of service should throw \'fileOrDirectoryNotExist\' error', async () => {
    expect.assertions(1);
    expect(() => new ConfigurationServiceFile('test.conf.not.exist.json'))
      .toThrow(new Error(messages.fileOrDirectoryNotExist));
  });

  it('New instance of service should throw \'fileNotValid\' error', async () => {
    expect.assertions(1);
    expect(() => new ConfigurationServiceFile('test.conf.not.valid.json'))
      .toThrow(new Error(messages.fileNotValid));
  });

  it('New instance should return \'repositoryNotProvided\' error', async () => {
    expect.assertions(2);
    ['entries', 'fetch'].forEach((method) => {
      configService[method]({}).catch(
        error => expect(error).toEqual(new Error(messages.repositoryNotProvided))
      );
    });
  });

  // it('Call fetch(), entries() with unexisting repository should' +
  //   'return \'Configuration repository is not found\' error', async () => {
  //   expect.assertions(2);
  //   ['entries', 'fetch'].forEach((method) => {
  //     configService[method]({ repository, key }).catch(
  //       error => expect(error).toEqual(new Error(`Configuration repository ${repository} not found`))
  //     );
  //   });
  // });
  
  
  
  
  
  
  // it('Call fetch() and save() without providing key should return \'repositoryKeyNotProvided\' error', async () => {
  //   expect.assertions(2);
  //   await configService.createRepository({ repository });
  //   ['fetch', 'save'].forEach((method) => {
  //     configService[method]({ repository }).catch(
  //       error => expect(error).toEqual(new Error(messages.repositoryKeyNotProvided))
  //     );
  //   });
  // });
  //
  // it('Call delete(), fetch()  with unexisting key should' +
  //   'return \'Configuration repository key not found\' error', async () => {
  //   expect.assertions(2);
  //   await configService.createRepository({ repository });
  //   ['delete', 'fetch'].forEach((method) => {
  //     configService[method]({ repository, key }).catch(
  //       error => expect(error).toEqual(new Error(`Configuration repository key ${key} not found`))
  //     );
  //   });
  // });
  //
  // it('delete() without key should delete configuration repository', async () => {
  //   expect.assertions(5);
  //   expect(await configService.createRepository({ repository })).toEqual({ repository });
  //   expect(await configService.save({ repository, key, value })).toEqual({});
  //   expect(await configService.entries({ repository })).toEqual({ entries: [{ key, value }] });
  //   expect(await configService.delete({ repository })).toEqual({});
  //   configService.entries({ repository }).catch(
  //     error => expect(error).toEqual(new Error(`Configuration repository ${repository} not found`))
  //   );
  // });
  
});
