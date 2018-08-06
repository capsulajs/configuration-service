import { ConfigurationService } from 'src/api';

export class ConfigurationServiceLocalStorage implements ConfigurationService {
  constructor(private storageItem: string) {
    this.clearAllInt();
  }

  private clearAllInt() {
    if (global.localStorage) {
      global.localStorage.setItem(this.storageItem, JSON.stringify({}));
    } else {
      throw Error('localStorage does not exist');
    }
  }

  private getConfig(): Promise<any> {
    if (!global.localStorage) {
      return Promise.reject(new Error('localStorage does not exist'));
    }

    const stringValue = (global.localStorage.getItem(this.storageItem) || '').trim();
    if (!stringValue) {
      return Promise.reject(new Error('Configuration not found'));
    }

    try {
      return Promise.resolve(JSON.parse(stringValue));
    } catch (err) {
      return Promise.reject(err);
    }
  }

  clearAll() {
    return Promise.resolve(this.clearAllInt());
  }

  clearKey(key: string) {
    const { storageItem } = this;

    return this.getConfig().then(config => {
      global.localStorage.setItem(storageItem, JSON.stringify(delete config[key]));
    });
  }

  get<T>(key: string): Promise<T> {
    return this.getConfig().then(config =>
      Object.keys(config).indexOf(key) >= 0 ?
        Promise.resolve(config[key]) :
        Promise.reject(new Error(`Configuration key ${key} not found`))
    );
  };

  keys() {
    return this.getConfig().then(config => Object.keys(config));
  }

  set<T>(key: string, value: T) {
    const { storageItem } = this;

    return this.getConfig().then(config =>
      global.localStorage.setItem(storageItem, JSON.stringify({
        ...config,
        [key]: value
      }))
    );
  }

  values<T>(): Promise<Array<T>> {
    return this.getConfig().then(config => Object.keys(config).map(key => config[key]));
  }
}
