import { ConfigurationServiceHttp } from 'provider/HttpProvider';

const token = 'localhost:1234';
const repository = 'Adele';
const key = 'Hello';
const value = 'It\'s me';
const data = {
  [key]: value,
  Surprise: 'I have a balloon'
};

const mock = jest.fn();
const configService = new ConfigurationServiceHttp(token);
// @ts-ignore
configService.dispatcher.dispatch = mock;

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
