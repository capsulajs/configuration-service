import {
  ConfigurationServiceInterface,
  CreateRepositoryRequest,
  CreateRepositoryResponse,
  SetRequest,
  SetResponse,
  GetRequest,
  GetResponse,
} from '.';

/**
 * Interface of the ConfigurationService
 * Configuration consists of key/value pairs
 * key is a string, type parameter is to specify value type, any for most cases
 */

export abstract class ConfigurationServiceBase<T=any> implements ConfigurationServiceInterface<T> {
  /**
   * Base constructor
   * @param configName - name of the configuration
   */
  constructor (
    protected configName: string,
  ) {};

  abstract createRepository(request: CreateRepositoryRequest): Promise<CreateRepositoryResponse>;

  abstract deleteAll(): Promise<void>;

  abstract deleteKey(key: string): Promise<void>;

  abstract get(request: GetRequest): Promise<GetResponse>;

  abstract keys(): Promise<Array<string>>;

  abstract set(request: SetRequest): Promise<SetResponse>;

  abstract values(): Promise<Array<T>>;
};
