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

  private getRepository(repository: string) {
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
      this.getRepository(request.repository);
    } catch {
      this.setRepository(request.repository, {});
      return { repository: request.repository };
    }
    throw new Error(messages.repositoryAlreadyExists);
  }

  async delete(request: DeleteRequest): Promise<DeleteResponse> {
    if (repositoryRequestValidator(request)) {
      throw new Error(messages.repositoryNotProvided);
    }

    const repository = this.getRepository(request.repository);
    if (request.key && !repository.hasOwnProperty(request.key)) {
        throw new Error(`Configuration repository key ${request.key} not found`);
    }

    if (request.key) {
      const { [request.key]: value, ...rest } = repository;
      this.setRepository(request.repository, rest);
    } else {
      localStorage.removeItem(`${this.token}.${request.repository}`);
    }
    return {};
  }

  async entries(request: EntriesRequest): Promise<EntriesResponse<T>> {
    if (repositoryRequestValidator(request)) {
      return Promise.reject(new Error(messages.repositoryNotProvided));
    }

    const repository = this.getRepository(request.repository);
    return { entries: Object.keys(repository).map(key => ({ key, value: repository[key] }))};
  };

  async fetch(request: FetchRequest): Promise<FetchResponse> {
    if (repositoryRequestValidator(request)) {
      throw new Error(messages.repositoryNotProvided);
    }

    if (repositoryKeyRequestValidator(request)) {
      throw new Error(messages.repositoryKeyNotProvided);
    }

    const repository = this.getRepository(request.repository)

    if (Object.keys(repository).indexOf(request.key) >= 0) {
      return { key: request.key, value: repository[request.key] };
    }

    throw new Error(`Configuration repository key ${request.key} not found`);
  }

  async save(request: SaveRequest): Promise<SaveResponse> {
    if (repositoryRequestValidator(request)) {
      throw new Error(messages.repositoryNotProvided);
    }

    if (repositoryKeyRequestValidator(request)) {
      throw new Error(messages.repositoryKeyNotProvided);
    }

    const repositoryData = this.getRepository(request.repository);
    this.setRepository(request.repository, {
      ...this.getRepository(request.repository),
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

  private async changeEntry(request: SaveRequest<T>, mode: 'create' | 'update') {
    validateSaveEntryRequest(request);
    const repository = this.getRepository(request.repository);

    if (mode === 'create' && repository.hasOwnProperty(request.key)) {
      throw new Error(messages.entryAlreadyExist(request.key));
    }

    if (mode === 'update' && !repository.hasOwnProperty(request.key)) {
      throw new Error(messages.entryDoesNotExist(request.key));
    }

    this.setRepository(request.repository, {
      ...repository,
      [request.key]: request.value
    });
    return {};
  };
}
