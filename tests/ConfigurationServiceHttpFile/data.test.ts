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

describe('Test suite for the ConfigurationServiceHttpFile(token)', () => {
    it('entries() should return all values and keys', async () => {
        expect.assertions(1);
        mockFetchFile({ type: 'resolve', content: configurationData });
        const configService = new ConfigurationServiceHttpFile(token);
        return expect(configService.entries({ repository })).resolves.toEqual({
            entries: [{ key, value }, { key: 'Surprise', value: surprise }]
        });
    });

    it('fetch() should return value by key', async () => {
        expect.assertions(1);
        const configService = new ConfigurationServiceHttpFile(token);
        mockFetchFile({ type: 'resolve', content: configurationData });
        return expect(configService.fetch({ repository, key })).resolves.toEqual({ key, value });
    });
});

describe('Test suite for the ConfigurationServiceHttpFile( {token: token, disableCache: true/false} )', () => {
    it('entries() should return all values and keys', async () => {
        expect.assertions(1);
        mockFetchFile({ type: 'resolve', content: configurationData });
        const configService = new ConfigurationServiceHttpFile({ token, disableCache: true });
        return expect(configService.entries({ repository })).resolves.toEqual({
            entries: [{ key, value }, { key: 'Surprise', value: surprise }]
        });
    });

    it('fetch() should return value by key, disableCache = false', async () => {
        expect.assertions(1);
        const configService = new ConfigurationServiceHttpFile({ token, disableCache: false });
        mockFetchFile({ type: 'resolve', content: configurationData });
        return expect(configService.fetch({ repository, key })).resolves.toEqual({ key, value });
    });
});

