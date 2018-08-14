import { ConfigurationService } from 'src/api';

export class ConfigurationServiceLocalStorage implements ConfigurationService {
  constructor(private storageItem: string) {
    this.deleteAllInt();
  }

  private deleteAllInt() {
    localStorage.setItem(this.storageItem, JSON.stringify({}));
  }

  private getConfig(): Promise<any> {
    const stringValue = (localStorage.getItem(this.storageItem) || '').trim();
    if (!stringValue) {
      return Promise.reject(new Error('Configuration not found'));
    }

    try {
      return Promise.resolve(JSON.parse(stringValue));
    } catch (err) {
      return Promise.reject(err);
    }
  }

  deleteAll() {
    return Promise.resolve(this.deleteAllInt());
  }

  deleteKey(key: string) {
    const { storageItem } = this;

    return this.getConfig().then(config => {
      localStorage.setItem(storageItem, JSON.stringify(delete config[key]));
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
      localStorage.setItem(storageItem, JSON.stringify({
        ...config,
        [key]: value
      }))
    );
  }

  values<T>(): Promise<Array<T>> {
    return this.getConfig().then(config => Object.keys(config).map(key => config[key]));
  }
}
