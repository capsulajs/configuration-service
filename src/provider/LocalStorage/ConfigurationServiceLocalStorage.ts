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

export class ConfigurationServiceLocalStorage<T=any> implements ConfigurationService<T> {
  constructor(private token: string) {}
  
  private getRepository(repository: string) {
    const rawString = localStorage.getItem(`${this.token}.${repository}`);
  
    if (!rawString) {
      return Promise.reject(
        new Error(`Configuration repository ${repository} not found`)
      );
    }
  
    try {
      return Promise.resolve(JSON.parse(rawString));
    } catch (error) {
      return Promise.reject(error);
    }
  }

  createRepository(request: CreateRepositoryRequest): Promise<CreateRepositoryResponse> {
    localStorage.setItem(`${this.token}.${request.repository}`, JSON.stringify({}));
    return Promise.resolve({ repository: request.repository });
  }

  delete(request: DeleteRequest): Promise<DeleteResponse> {
    return new Promise((resolve, reject) => {
      this.getRepository(request.repository).then((repository) => {
        if (request.key) {
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
    return this.getRepository(request.repository).then(repository => ({
      entries: Object.keys(repository).map(key => repository[key])
    }));
  };

  fetch(request: FetchRequest): Promise<FetchResponse> {
    return this.getRepository(request.repository).then(repository =>
      Object.keys(repository).indexOf(request.key) >= 0
        ? Promise.resolve({ key: request.key, value: repository[request.key] })
        : Promise.reject(new Error(`Configuration repository key ${request.key} not found`))
      );
  }

  save(request: SaveRequest): Promise<SaveResponse> {
    return new Promise((resolve, reject) => {
      this.getRepository(request.repository).then((repository) => {
        localStorage.setItem(`${this.token}.${request.repository}`, JSON.stringify({
          ...repository,
          [request.key]: request.value
        }));
        
        resolve({});
      }).catch(reject);
    });
  }
}
