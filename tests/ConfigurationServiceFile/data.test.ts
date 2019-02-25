import { ConfigurationService } from 'api/ConfigurationService';
import { ConfigurationServiceFile } from 'provider/FileProvider';

const token = 'test.conf.json';
const repository = 'Adele';
const key = 'Hello';
const value = 'It\'s me';
const configService = new ConfigurationServiceFile(token);

describe('Test suite for the ConfigurationServiceFile', () => {
  it('entries() should return all values and keys', async () => {
    expect.assertions(1);
    expect(await configService.entries({ repository })).toEqual({
      entries: [{ key, value }, { key: 'Surprise', value: 'I have a balloon' }]
    });
  });

  it('fetch() should return value by key', async () => {
    expect.assertions(1);
    expect(await configService.fetch({ repository, key })).toEqual({ key, value });
  });

});
