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

const configService = new ConfigurationServiceHttpFile(token);

describe('Test suite for the ConfigurationServiceHttpFile', () => {
  it('entries() should return all values and keys', async () => {
    expect.assertions(1);
    mockFetchFile({ type: 'resolve', content: configurationData });
    return expect(configService.entries({ repository })).resolves.toEqual({
      entries: [{ key, value }, { key: 'Surprise', value: surprise }]
    });
  });

  it('fetch() should return value by key', async () => {
    expect.assertions(1);
    mockFetchFile({ type: 'resolve', content: configurationData });
    return expect(configService.fetch({ repository, key })).resolves.toEqual({ key, value });
  });

});
