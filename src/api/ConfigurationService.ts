import {
  CreateRepositoryRequest,
  CreateRepositoryResponse,
  FetchRequest,
  FetchResponse,
  SaveRequest,
  SaveResponse
} from '.';

/**
 * Interface of the ConfigurationService
 * Type Parameter T specifies the type of the key values
 */

export interface ConfigurationService<T = any> {
  /**
   * Creates a Configuration Repository
   */
  createRepository(request: CreateRepositoryRequest): Promise<CreateRepositoryResponse>;

  /**
   * Deletes the specified or deletes all the keys if no specified key
   * @return an empty promise
   * */
  delete(key?: string): Promise<void>;
  
  /**
   * Gets the value of the specified key
   * @return promise with the key's values
   * */
  fetch(request: FetchRequest): Promise<FetchResponse>;

  /**
   * Gets a list of the values of all of the keys
   * @return promise with array of the values of all of the keys
   * */
  entries(): Promise<Array<T>>;
  
  /**
   * Sets the value of the specified key
   * @return an empty promise
   * */
  save(request: SaveRequest): Promise<SaveResponse>;
};
