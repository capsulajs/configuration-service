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

  private UNSAFE_getRepository(repository: string) {
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

  private setRepository = (repository: string, value: object) => {
    localStorage.setItem(`${this.token}.${repository}`, JSON.stringify(value));
  }

  async createRepository(request: CreateRepositoryRequest): Promise<CreateRepositoryResponse> {
    if (repositoryRequestValidator(request)) {
      throw new Error(messages.repositoryNotProvided);
    }

    try {
      this.getRepositorySync(request.repository);
    } catch {
      this.setRepository(request.repository, {});
      return { repository: request.repository };
    }
    throw new Error(messages.repositoryAlreadyExists);
  }

  delete(request: DeleteRequest): Promise<DeleteResponse> {
    if (repositoryRequestValidator(request)) {
      return Promise.reject(new Error(messages.repositoryNotProvided));
    }

    return new Promise((resolve, reject) => {
      this.UNSAFE_getRepository(request.repository).then((repository) => {
        if (request.key) {
          if (!repository.hasOwnProperty(request.key)) {
            reject(new Error(`Configuration repository key ${request.key} not found`));
          }

          const { [request.key]: value, ...rest } = repository;
          this.setRepository(request.repository, rest);
        } else {
          localStorage.removeItem(`${this.token}.${request.repository}`);
        }

        resolve({});
      }).catch(reject);
    });
  }

  async entries(request: EntriesRequest): Promise<EntriesResponse<T>> {
    if (repositoryRequestValidator(request)) {
      return Promise.reject(new Error(messages.repositoryNotProvided));
    }

    const repository = this.getRepositorySync(request.repository);
    return { entries: Object.keys(repository).map(key => ({ key, value: repository[key] }))};
  };

  fetch(request: FetchRequest): Promise<FetchResponse> {
    if (repositoryRequestValidator(request)) {
      return Promise.reject(new Error(messages.repositoryNotProvided));
    }

    if (repositoryKeyRequestValidator(request)) {
      return Promise.reject(new Error(messages.repositoryKeyNotProvided));
    }

    return new Promise((resolve, reject) => {
      this.UNSAFE_getRepository(request.repository).then(repository =>
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

    const repositoryData = this.getRepositorySync(request.repository);
    this.setRepository(request.repository, {
      ...this.getRepositorySync(request.repository),
      [request.key]: request.value
    });
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

    return this.UNSAFE_getRepository(request.repository)
      .then(repositoryData => {
        if (mode === 'create' && repositoryData.hasOwnProperty(request.key)) {
          throw new Error(messages.entryAlreadyExist(request.key));
        }
        if (mode === 'update' && !repositoryData.hasOwnProperty(request.key)) {
          throw new Error(messages.entryDoesNotExist(request.key));
        }
        this.setRepository(request.repository, {
          ...repositoryData,
          [request.key]: request.value
        });
        return {};
      })
  };
}
