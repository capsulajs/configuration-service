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
import { validateSaveEntryRequest } from '../../validators';

export class ConfigurationServiceLocalStorage<T=any> implements ConfigurationService<T> {
  constructor(private token: string) {
    if (!this.token) {
      throw new Error(messages.tokenNotProvided);
    }
  }

  private getRepository(repository: string) {
    const rawString = localStorage.getItem(`${this.token}.${repository}`);

    if (!rawString) {
      return Promise.reject(
        new Error(messages.repositoryDoesNotExist(repository))
      );
    }

    try {
      return Promise.resolve(JSON.parse(rawString));
    } catch (error) {
      return Promise.reject(error);
    }
  }

  private getRepositorySync(repository: string) {
    const rawString = localStorage.getItem(`${this.token}.${repository}`);
    if (!rawString) {
      throw new Error(messages.repositoryDoesNotExist(repository));
    }

    return JSON.parse(rawString);
  }

  createRepository(request: CreateRepositoryRequest): Promise<CreateRepositoryResponse> {
    if (repositoryRequestValidator(request)) {
      return Promise.reject(new Error(messages.repositoryNotProvided));
    }

    return new Promise((resolve, reject) => {
      this.getRepository(request.repository).then(() => {
        reject(new Error(messages.repositoryAlreadyExists));
      }).catch(() => {
        localStorage.setItem(`${this.token}.${request.repository}`, JSON.stringify({}));
        return resolve({ repository: request.repository });
      });
    });
  }

  delete(request: DeleteRequest): Promise<DeleteResponse> {
    if (repositoryRequestValidator(request)) {
      return Promise.reject(new Error(messages.repositoryNotProvided));
    }

    return new Promise((resolve, reject) => {
      this.getRepository(request.repository).then((repository) => {
        if (request.key) {
          if (!repository.hasOwnProperty(request.key)) {
            reject(new Error(`Configuration repository key ${request.key} not found`));
          }

          const { [request.key]: value, ...rest } = repository;
          localStorage.setItem(`${this.token}.${request.repository}`, JSON.stringify(rest));
        } else {
          localStorage.removeItem(`${this.token}.${request.repository}`);
        }

        resolve({});
      }).catch(reject);
    });
  }

  entries(request: EntriesRequest): Promise<EntriesResponse<T>> {
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
      ).catch(reject);
    });
  }

  async save(request: SaveRequest): Promise<SaveResponse> {
    if (repositoryRequestValidator(request)) {
      throw new Error(messages.repositoryNotProvided);
    }

    if (repositoryKeyRequestValidator(request)) {
      throw new Error(messages.repositoryKeyNotProvided);
    }

    localStorage.setItem(`${this.token}.${request.repository}`, JSON.stringify({
      ...this.getRepositorySync(request.repository),
      [request.key]: request.value
    }));
    return {};
  }

  public createEntry(request: SaveRequest<T>) {
    return this.changeEntry(request, 'create');
  };

  public updateEntry(request: SaveRequest<T>) {
    return this.changeEntry(request, 'update');
  };

  private changeEntry(request: SaveRequest<T>, mode: 'create' | 'update') {
    try {
      validateSaveEntryRequest(request);
    } catch (error) {
      return Promise.reject(error);
    }

    return this.getRepository(request.repository)
      .then(repositoryData => {
        if (mode === 'create' && repositoryData.hasOwnProperty(request.key)) {
          throw new Error(messages.entryAlreadyExist(request.key));
        }
        if (mode === 'update' && !repositoryData.hasOwnProperty(request.key)) {
          throw new Error(messages.entryDoesNotExist(request.key));
        }
        return this.updateRepositoryData(request, repositoryData);
      })
  };

  private updateRepositoryData = (request: SaveRequest<T>, repositoryData: object) => {
    localStorage.setItem(`${this.token}.${request.repository}`, JSON.stringify({
      ...repositoryData,
      [request.key]: request.value
    }));
    return {};
  }
}
