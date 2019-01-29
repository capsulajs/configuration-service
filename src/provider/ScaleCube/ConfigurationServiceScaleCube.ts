import { Dispatcher } from '@capsulajs/capsulajs-transport-providers';
import {
  ConfigurationServiceBase,
  CreateRepositoryRequest,
  CreateRepositoryResponse,
  SetRequest,
  SetResponse,
  GetRequest,
  GetResponse,
} from '../../api';

export class ConfigurationServiceScaleCube<T=any> extends ConfigurationServiceBase<T> {
  constructor(configName: string, private token: string, private dispatcher: Dispatcher) {
    super(configName);
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
    return this.dispatcher.dispatch('/configuration/delete', { key: null });
  };

  deleteKey(key: string): Promise<void> {
    return this.dispatcher.dispatch('/configuration/delete', { key });
  }

  get(request: GetRequest): Promise<GetResponse<T>> {
    return this.dispatcher.dispatch(
      '/io.scalecube.configuration.api.ConfigurationService/fetch',
      this.prepRequest(request),
    ).then((request: any) => ({ value: request.value }));
  }

  keys(): Promise<Array<string>> {
    return this.dispatcher.dispatch('/configuration/fetch', {});
  }

  set(request: SetRequest<T>): Promise<SetResponse> {
    return this.dispatcher.dispatch(
      '/io.scalecube.configuration.api.ConfigurationService/save',
      this.prepRequest(request),
    );
  }

  values<T>(): Promise<Array<T>> {
    return this.dispatcher.dispatch('/configuration/fetch', {});
  }
}
