import { Dispatcher } from 'capsulajs-transport-providers';

import {
  // Token,
  ConfigurationServiceBase,
  CreateRepositoryRequest,
  CreateRepositoryResponse,
  SetRequest,
  SetResponse,
  GetRequest,
  GetResponse,
} from '../../api';

export class ConfigurationServiceScaleCube<T=any> extends ConfigurationServiceBase<T> {
  // private
  // private dispatcher: Dispatcher;

  constructor(configName: string, private token: string, private dispatcher: Dispatcher) {
    super(configName);
    // this.dispatcher = dispatcher;
  };

  private prepRequest(request: any): any {
    return {
      token: this.token,
      repository: this.configName,
      ...request
    };
  }

  createRepository(request: CreateRepositoryRequest): Promise<CreateRepositoryResponse> {
    return this.dispatcher.dispatch(
      '/io.scalecube.configuration.api.ConfigurationService/createRepository',
      this.prepRequest(request),
    );
  }

  deleteAll(): Promise<void> {
    // TO BE DONE
    return this.dispatcher.dispatch('/configuration/delete', { key: null } );
  };

  deleteKey(key: string): Promise<void> {
    // TO BE DONE
    return this.dispatcher.dispatch('/configuration/delete', { key });
  }

  get(request: GetRequest): Promise<GetResponse<T>> {
    // TO BE CHECKED
    return this.dispatcher.dispatch(
      '/io.scalecube.configuration.api.ConfigurationService/fetch',
      this.prepRequest(request),
    ).then(response => ({
      value: (response as any).value
    }));
  }

  keys(): Promise<Array<string>> {
    // TO BE DONE
    return this.dispatcher.dispatch('/configuration/fetch', { });
  }

  set(request: SetRequest<T>): Promise<SetResponse> {
    // TO BE CHECKED
    return this.dispatcher.dispatch(
      '/io.scalecube.configuration.api.ConfigurationService/save',
      this.prepRequest(request),
    );
  }

  values<T>(): Promise<Array<T>> {
    // TO BE DONE
    return this.dispatcher.dispatch('/configuration/fetch', { });
  }
}
