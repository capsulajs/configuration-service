import { Dispatcher } from '@capsulajs/capsulajs-transport-providers';
import {
  ConfigurationService,
  CreateRepositoryRequest,
  CreateRepositoryResponse,
  FetchRequest,
  FetchResponse,
  SaveRequest,
  SaveResponse,
} from '../../api';

export class ConfigurationServiceScaleCube<T=any> implements ConfigurationService<T> {
  constructor(private token: string, private dispatcher: Dispatcher) {
    super();
  };

  private prepRequest(request: any): any {
    return {
      token: {
        token: this.token,
        issuer: 'Auth0'
      },
      ...request
    };
  }

  createRepository(request: CreateRepositoryRequest): Promise<CreateRepositoryResponse> {
    return this.dispatcher.dispatch(
      '/io.scalecube.configuration.api.ConfigurationService/createRepository',
      this.prepRequest(request),
    );
  }
  
  delete(key?: string): Promise<void> {
    return this.dispatcher.dispatch(
      '/io.scalecube.configuration.api.ConfigurationService/delete',
      this.prepRequest({ key })
    );
  }

  fetch(request: FetchRequest): Promise<FetchResponse<T>> {
    return this.dispatcher.dispatch(
      '/io.scalecube.configuration.api.ConfigurationService/fetch',
      this.prepRequest(request),
    ).then((request: any) => ({ value: request.value }));
  }

  save(request: SaveRequest<T>): Promise<SaveResponse> {
    return this.dispatcher.dispatch(
      '/io.scalecube.configuration.api.ConfigurationService/save',
      this.prepRequest(request),
    );
  }
  
  entries<T>(): Promise<Array<T>> {
    return this.dispatcher.dispatch(
      '/io.scalecube.configuration.api.ConfigurationService/entries',
      this.prepRequest({})
    );
  }
}
