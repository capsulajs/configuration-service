import { Dispatcher } from '@capsulajs/capsulajs-transport-providers';
import {
  ConfigurationService,
  CreateRepositoryRequest,
  CreateRepositoryResponse,
  DeleteRequest,
  DeleteResponse,
  EntriesRequest,
  EntriesResponse,
  FetchRequest,
  FetchResponse,
  SaveRequest,
  SaveResponse,
} from '../../api';
import { messages, repositoryRequestValidator, repositoryKeyRequestValidator } from '../../utils';

export class ConfigurationServiceHttp<T=any> implements ConfigurationService<T> {
  private storage: any;

  constructor(private endpoint: string, private dispatcher: Dispatcher) {
    if (!this.endpoint) {
      throw new Error(messages.endpointNotProvided);
    }
  }

  private getRepository(repository: string) {
    return new Promise((resolve, reject) => {
      this.dispatcher.dispatch(this.endpoint, {}).then((storage: any) => {
        storage[repository]
          ? resolve(storage[repository])
          : reject(new Error(`Configuration repository ${repository} not found`));
      }).catch(reject);
    });
  }

  createRepository(request: CreateRepositoryRequest): Promise<CreateRepositoryResponse> {
    return Promise.reject(new Error(messages.notImplemented));
  }

  delete(request: DeleteRequest): Promise<DeleteResponse> {
    return Promise.reject(new Error(messages.notImplemented));
  }

  entries(request: EntriesRequest): Promise<EntriesResponse> {
    if (repositoryRequestValidator(request)) {
      return Promise.reject(new Error(messages.repositoryNotProvided));
    }

    return this.getRepository(request.repository).then((repository: any) => ({
      entries: Object.keys(repository).map(key => ({ key, value: repository[key] }))
    }));
  };

  fetch(request: FetchRequest): Promise<FetchResponse> {
    if (repositoryRequestValidator(request)) {
      return Promise.reject(new Error(messages.repositoryNotProvided));
    }

    if (repositoryKeyRequestValidator(request)) {
      return Promise.reject(new Error(messages.repositoryKeyNotProvided));
    }

    return new Promise((resolve, reject) => {
      this.getRepository(request.repository).then(repository =>
        Object.keys(repository).indexOf(request.key) >= 0
          ? resolve({ key: request.key, value: repository[request.key] })
          : reject(new Error(`Configuration repository key ${request.key} not found`))
      ).catch(reject);
    });
  }

  save(request: SaveRequest): Promise<SaveResponse> {
    return Promise.reject(new Error(messages.notImplemented));
  }
}
