import { ConfigurationServiceLocalStorage } from 'provider/LocalStorage';

const token = 'token';
const repository = 'Adele';
const key = 'Hello';
const value = 'It\'s me';
const configService = new ConfigurationServiceLocalStorage(token);
const arrayFixture = [{ key: '1', value: 1 }, { key: '2', value: 2 }, { key: '3', value: 3 }];

describe('Test suite for the ConfigurationServiceLocalStorage', () => {
  beforeEach(localStorage.clear);

  it('createRepository() should create configuration repository', async () => {
    expect.assertions(2);
    expect(await configService.createRepository({ repository })).toEqual({ repository });
    expect(await configService.entries({ repository })).toEqual({ entries: [] });
  });

  it('delete() should return empty object and delete configuration repository key', async () => {
    expect.assertions(5);
    expect(await configService.createRepository({ repository })).toEqual({ repository });
    expect(await configService.save({ repository, key, value })).toEqual({});
    expect(await configService.entries({ repository })).toEqual({ entries: [{ key, value }] });
    expect(await configService.delete({ repository, key })).toEqual({});
    expect(await configService.entries({ repository })).toEqual({ entries: [] });
  });

  it('entries() should return all values and keys', async () => {
    expect.assertions(4);
    expect(await configService.createRepository({ repository })).toEqual({ repository });
    expect(await configService.save({ repository, key, value })).toEqual({});
    expect(await configService.save({
      repository, key: 'Surprise', value: 'I have a balloon'
    })).toEqual({});
    expect(await configService.entries({ repository })).toEqual({
      entries: [{ key, value }, { key: 'Surprise', value: 'I have a balloon' }]
    });
  });

  it('fetch() should return value by key', async () => {
    expect.assertions(3);
    expect(await configService.createRepository({ repository })).toEqual({ repository });
    expect(await configService.save({ repository, key, value })).toEqual({});
    expect(await configService.fetch({ repository, key })).toEqual({ key, value });
  });

  it('save() should persist value by key', async () => {
    expect.assertions(3);
    expect(await configService.createRepository({ repository })).toEqual({ repository });
    expect(await configService.save({ repository, key, value })).toEqual({});
    expect(await configService.entries({ repository })).toEqual({ entries: [{ key, value }] });
  });

  it('save() should persist new value by the same key', async () => {
    expect.assertions(5);
    expect(await configService.createRepository({ repository })).toEqual({ repository });
    expect(await configService.save({ repository, key, value })).toEqual({});
    expect(await configService.entries({ repository })).toEqual({ entries: [{ key, value }] });
    expect(await configService.save({ repository, key, value: 'Goodbye' })).toEqual({});
    expect(await configService.entries({ repository })).toEqual({ entries: [{ key, value: 'Goodbye' }] });
  });

  it('save() concurency check', async () => {
    expect.assertions(3);
    expect(await configService.createRepository({ repository })).toEqual({ repository });
    expect(await Promise.all(arrayFixture.map(({ key, value }, id) => configService.save({
      repository,
      key,
      value,
    })))).toEqual([{}, {}, {}]);

    expect(await configService.entries({ repository })).toEqual({ entries: arrayFixture });
  });

  it('Call createEntry() with a new key should create a new entry', async () => {
    expect.assertions(3);
    await expect(configService.createRepository({ repository })).resolves.toEqual({ repository });
    await expect(configService.createEntry({ repository, key, value })).resolves.toEqual({});
    return expect(configService.entries({ repository })).resolves.toEqual({ entries: [{ key, value }] });
  });

  it('Call updateEntry() with an existing key should update the relevant entry', async () => {
    expect.assertions(4);
    const newValue = { value: 'new' };
    await expect(configService.createRepository({ repository })).resolves.toEqual({ repository });
    await expect(configService.createEntry({ repository, key, value })).resolves.toEqual({});
    await expect(configService.updateEntry({ repository, key, value: newValue })).resolves.toEqual({});
    return expect(configService.entries({ repository })).resolves.toEqual({ entries: [{ key, value: newValue }] });
  });

});
