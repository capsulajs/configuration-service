import fs from 'fs';
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
  Repository
} from '../../api';
import { messages, repositoryRequestValidator, repositoryKeyRequestValidator } from '../../utils';

export class ConfigurationServiceFile<T=any> implements ConfigurationService<T> {
  constructor(private token: string) {
    if (!this.token) {
      throw new Error(messages.tokenNotProvided);
    }
  }

  private getRepository(repository: string) {
    try {
      return Promise.resolve(JSON.parse(fs.readFileSync(this.token, 'utf8')) as Repository);
    } catch {
      return Promise.reject(new Error(`Configuration repository ${repository} not found`));
    }
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

    return this.getRepository(request.repository).then(repository => ({
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
      ).catch(error => reject(error));
    });
  }

  save(request: SaveRequest): Promise<SaveResponse> {
    return Promise.reject(new Error(messages.notImplemented));
  }
}
