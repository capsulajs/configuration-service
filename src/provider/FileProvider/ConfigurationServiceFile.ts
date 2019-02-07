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

export class ConfigurationServiceFile<T=any> implements ConfigurationService<T> {
  constructor(private token: string) {
    if (!this.token) {
      throw new Error(messages.tokenNotProvided);
    }
  }
  
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
  
  save(request: SaveRequest): Promise<SaveResponse> {
    if (repositoryRequestValidator(request)) {
      return Promise.reject(new Error(messages.repositoryNotProvided));
    }
    
    if (repositoryKeyRequestValidator(request)) {
      return Promise.reject(new Error(messages.repositoryKeyNotProvided));
    }
    
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
