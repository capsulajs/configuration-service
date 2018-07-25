import { ConfigurationService } from 'src/api';

export class ConfigurationServiceLocalStorage implements ConfigurationService {
  constructor(private storageItem: string) {
  }

  get(key: string) {
    const stringValue = localStorage.getItem(this.storageItem);

    if (stringValue) {
      try {
        return Promise.resolve(JSON.parse(stringValue)[key]);
      } catch (err) {
        return Promise.reject(err);
      }
    } else {
      return Promise.resolve();
    }
  };

  set(key: string, value: any) {
    const { storageItem } = this;

    let prevValue: any = localStorage.getItem(storageItem) || '';

    if (prevValue) {
      try {
        prevValue = JSON.parse(prevValue);
      } catch (err) {
        return Promise.reject(err);
      }
    } else {
      prevValue = {};
    }

    localStorage.setItem(storageItem, JSON.stringify({
      ...prevValue,
      [key]: value
    }));

    return Promise.resolve();
  }
}
