import { ConfigurationServiceScalecube } from '../../src/provider/Scalecube';
import { AxiosDispatcher } from '@capsulajs/capsulajs-transport-providers';

const token = 'token';
const repository = 'Adele';
const key = 'Hello';
const value = 'It\'s me';
const dispatcher = new AxiosDispatcher(`${token}`);
const mockedCallback = jest.fn();
dispatcher.dispatch = mockedCallback;
const configService = new ConfigurationServiceScalecube(token, dispatcher);

afterEach( () => mockedCallback.mockClear());

describe('Test suite for the ConfigurationServiceLocalScalecube', () => {
    it('createRepository() should create configuration repository', async () => {
        expect.assertions(1);
        mockedCallback.mockResolvedValueOnce({ repository });
        expect(await configService.createRepository({ repository })).toEqual({ repository });
    });

    it('deleteEntry() should return empty object and delete the entry from repository', async () => {
        expect.assertions(1);
        mockedCallback.mockResolvedValueOnce({ });
        expect(await configService.delete({ repository, key })).toEqual({ });
    });

    it('entries() should return a list of entries from repository', async () => {
        expect.assertions(1);
        mockedCallback.mockResolvedValueOnce([{"key": "Hello", "value": "It's me"}]);
        expect(await configService.entries({ repository })).toEqual({ entries: [{ key, value }] });
    });

    it('fetch() should return an entry from repository', async () => {
        expect.assertions(1);
        mockedCallback.mockResolvedValueOnce({"key": "Hello", "value": "It's me"});
        expect(await configService.fetch({ repository, key })).toEqual({ key, value });
    });

    it('Call save() with new key should create a new entry', async () => {
        expect.assertions(1);
        mockedCallback.mockResolvedValueOnce({ repository });
        expect(await configService.save({ repository, key, value })).toEqual({ repository });
    });
});
