import { ConfigurationServiceLocalStorage } from 'src/provider/LocalStorage';

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

export const buildConfigurationServiceLocalStorage = (configKey: string, configValue?: any) => {
  mockGlobalLocalStorage();

  const configService = new ConfigurationServiceLocalStorage('testConfig');

  if (configValue) {
    configService.set(configKey, configValue);
  }

  return configService;
};
