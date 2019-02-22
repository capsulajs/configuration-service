import { Dispatcher, AxiosDispatcher } from '@capsulajs/capsulajs-transport-providers';
import { ConfigurationService } from 'api/ConfigurationService';
import { ConfigurationServiceHttp } from 'provider/HttpProvider';

const endpoint = 'http://localhost:1234';
const repository = 'Adele';
const key = 'Hello';
const value = 'It\'s me';
const data = {
  [repository]: {
    [key]: value,
    Surprise: 'I have a balloon'
  }
};

const dispatcher: Dispatcher = new AxiosDispatcher(endpoint);
const mock = jest.fn();
dispatcher.dispatch = mock;
const configService = new ConfigurationServiceHttp(endpoint, dispatcher);

describe('Test suite for the ConfigurationServiceHttp', () => {
  it('entries() should return all values and keys', async () => {
    expect.assertions(1);
    mock.mockResolvedValueOnce(data);
    expect(await configService.entries({ repository })).toEqual({
      entries: [{ key, value }, { key: 'Surprise', value: 'I have a balloon' }]
    });
  });

  it('fetch() should return value by key', async () => {
    expect.assertions(1);
    mock.mockResolvedValueOnce(data);
    expect(await configService.fetch({ repository, key })).toEqual({ key, value });
  });

});
