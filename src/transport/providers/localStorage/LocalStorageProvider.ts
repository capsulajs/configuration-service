import { Dispatcher } from '../..';

import { LocalStorageRequest, LocalStorageResponse } from '.';

export class LocalStorageProvider<T> implements Dispatcher<LocalStorageRequest<T>, LocalStorageResponse<T>> {

  private key: string = '';

  constructor(key: string) {
    if (!key) {
      throw new Error(`Wrong key value ${key}`);
    }
    this.key = key;
  }

  dispatch(request: LocalStorageRequest<T>): Promise<LocalStorageResponse<T>> {
    const { key } = this;
    const { method, payload } = request;

    switch (method ) {
      case 'clear':
        localStorage.removeItem(key);
        return Promise.resolve({});

      case 'get':
        try {
          const val = localStorage.getItem(key);
          if (val) {
            return Promise.resolve(JSON.parse(localStorage.getItem(key) || ''));
          } else {
            return Promise.resolve({});
          }
        } catch (e) {
          return Promise.reject(e);
        }

      case 'set':
        localStorage.setItem(key, JSON.stringify(payload));
        return Promise.resolve({});
    }
  }
};
