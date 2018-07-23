import { buildLocalStorageProvider } from './localStorageUtils';

describe('Test suite fro the LocalStorageProvider', () => {

  it('Check get operation ', () => {

    const localStorageProvider = buildLocalStorageProvider({
      numValue: 1,
      stringValue: 'test'
    });

    return expect(localStorageProvider.dispatch({
      method: 'get'
    })).resolves.toEqual({
      numValue: 1,
      stringValue: 'test'
    });
  });

  it('Check clear operation ', () => {
    const localStorageProvider = buildLocalStorageProvider({
      numValue: 1,
      stringValue: 'test'
    });

    localStorageProvider.dispatch({ method: 'clear' });

    return expect(localStorageProvider.dispatch({
      method: 'get'
    })).resolves.toEqual({});

  });
});
