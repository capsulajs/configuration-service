import { Dispatcher } from '../..';

import { LocalStorageRequest, LocalStorageResponse } from '.';

export class LocalStorageProvider<T extends Object, R extends Object> implements Dispatcher<LocalStorageRequest<T>, LocalStorageResponse<R>> {

  dispatch(request: LocalStorageRequest<T>): Promise<LocalStorageResponse<R>> {
    const { method, payload } = request;

    switch (method ) {
      case 'get':
        localStorage.setItem('appConfig', JSON.stringify(payload));
        break;

      case 'set':
        const stringVal = localStorage.getItem('appConfig') || '';

        try {
          const val = JSON.parse(stringVal);
          return Promise.resolve(val as LocalStorageResponse<R>);
        } catch (e) {
          return Promise.reject(e);
        }
    }

    return Promise.resolve({});
  }
};
