import { LocalStorageProvider } from 'src/transport';

type ValueType = string | null;

export class LocalStorage {
  private store: {[key: string]: ValueType };
  constructor () {
    this.store = {};
  };
  clear() {
    this.store = {};
  }
  getItem(key: string): ValueType {
    return this.store[key];
  }
  removeItem(key: string) {
    delete this.store[key];
  }
  setItem(key: string, value: ValueType) {
    this.store[key] = value;
  }
}

export const mockGlobalLocalStorage = () => global.localStorage = new LocalStorage();

interface TestConfig {
  numValue: number;
  stringValue: string;
};

export const buildLocalStorageProvider = (mockData: TestConfig) => {
  mockGlobalLocalStorage();

  const localStorageProvider = new LocalStorageProvider<TestConfig>('testStore');

  localStorageProvider.dispatch({
    method: 'set',
    payload: mockData
  });

  return localStorageProvider;
};
