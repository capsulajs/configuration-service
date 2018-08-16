import axios from 'axios';

import { ConfigurationService } from 'src/api';

export class ConfigurationServiceScaleCube implements ConfigurationService {
  constructor(
    private baseUrl: string,
    private organizationId: string,
    private apiKey: string,
    private collectionName: string,
  ) {
  };

  private doHttpRequest(url: string, data?: any) {
    // TO BE DONE
    return axios.post(
      this.baseUrl + url,
      {
        token: {
          origin: this.organizationId,
          token: this.apiKey,
        },
        collection: this.collectionName,
        ...data
      },
    ).then(response => {
      const {status, statusText, data } = response;
      if (status === 200) {
        return response.data;
      } else {
        throw new Error(`Error during HTTP request: ${status} ${statusText}`);
      }
    });
  }

  deleteAll(): Promise<void> {
    // TO BE DONE
    return this.doHttpRequest('/configuration/delete', { key: null });
  };

  deleteKey(key: string): Promise<void> {
    // TO BE DONE
    return this.doHttpRequest('/configuration/delete', { key });
  }

  get<T>(key: string): Promise<T> {
    // TO BE DONE
    return this.doHttpRequest('/configuration/fetch', { key });
  }

  keys(): Promise<Array<string>> {
    // TO BE DONE
    return this.doHttpRequest('/configuration/fetch', { });
  }

  set<T>(key: string, value: T): Promise<void> {
    // TO BE DONE
    return this.doHttpRequest('/configuration/save', { key, value });
  }

  values<T>(): Promise<Array<T>> {
    // TO BE DONE
    return this.doHttpRequest('/configuration/fetch', { });
  }
}
