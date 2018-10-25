import {
  CreateRepositoryRequest,
  CreateRepositoryResponse,
  SetRequest,
  SetResponse,
  GetRequest,
  GetResponse,
} from '.';

/**
 * Interface of the ConfigurationService
 * Type Parameter T specifies the type of the key values
 */

export interface ConfigurationServiceInterface<T=any> {

  /**
   * Creates a Configuration Repository
   */
  createRepository(request: CreateRepositoryRequest): Promise<CreateRepositoryResponse>;

  /**
   * Deletes all the keys
   * @return an empty promise
   * */
  deleteAll(): Promise<void>;

  /**
   * Deletes the specified key
   * @return an empty promise
   * */
  deleteKey(key: string): Promise<void>;

  /**
   * Gets the value of the cpecified key
   * @return promise with the key's values
   * */
  get(request: GetRequest): Promise<GetResponse>;

  /**
   * Gets a list of all the keys
   * @return promise with string array
   * */
  keys(): Promise<Array<string>>;

  /**
   * Sets the value of the specified key
   * @return an empty promise
   * */
  set(request: SetRequest): Promise<SetResponse>;

  /**
   * Gets a list of the values of all of the keys
   * @return promise with array of the values of all of the keys
   * */
  values(): Promise<Array<T>>;
};
