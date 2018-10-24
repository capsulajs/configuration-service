import { Dispatcher } from 'capsulajs-transport-providers';

import { ConfigurationServiceBase } from '../../api';

export class ConfigurationServiceScaleCube<T=any> extends ConfigurationServiceBase<T> {
  private dispatcher: Dispatcher;

  constructor(configName: string, dispatcher: Dispatcher) {
    super(configName);
    this.dispatcher = dispatcher;
  };

  deleteAll(): Promise<void> {
    // TO BE DONE
    return this.dispatcher.dispatch('/configuration/delete', { key: null } );
  };

  deleteKey(key: string): Promise<void> {
    // TO BE DONE
    return this.dispatcher.dispatch('/configuration/delete', { key });
  }

  get<T>(key: string): Promise<T> {
    // TO BE DONE
    return this.dispatcher.dispatch('/configuration/fetch', { key });
  }

  keys(): Promise<Array<string>> {
    // TO BE DONE
    return this.dispatcher.dispatch('/configuration/fetch', { });
  }

  set<T>(key: string, value: T): Promise<void> {
    // TO BE DONE
    return this.dispatcher.dispatch('/configuration/save', { key, value });
  }

  values<T>(): Promise<Array<T>> {
    // TO BE DONE
    return this.dispatcher.dispatch('/configuration/fetch', { });
  }
}
