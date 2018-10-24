import { ConfigurationServiceBase } from '../../api';

export class ConfigurationServiceLocalStorage<T=any> extends ConfigurationServiceBase<T> {
  constructor(configName: string) {
    super(configName);
    this.deleteAllInt();
  }

  private deleteAllInt() {
    localStorage.setItem(this.configName, JSON.stringify({}));
  }

  private getConfig(): Promise<any> {
    const stringValue = (localStorage.getItem(this.configName) || '').trim();
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
    const { configName } = this;

    return this.getConfig().then(config => {
      localStorage.setItem(configName, JSON.stringify(delete config[key]));
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
    const { configName } = this;

    return this.getConfig().then(config =>
      localStorage.setItem(configName, JSON.stringify({
        ...config,
        [key]: value
      }))
    );
  }

  values<T>(): Promise<Array<T>> {
    return this.getConfig().then(config => Object.keys(config).map(key => config[key]));
  }
}
