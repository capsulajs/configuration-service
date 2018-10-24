import { ConfigurationServiceInterface } from '.';

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

  abstract deleteAll(): Promise<void>;

  abstract deleteKey(key: string): Promise<void>;

  abstract get(key: string): Promise<T>;

  abstract keys(): Promise<Array<string>>;

  abstract set(key: string, value: T): Promise<void>;

  abstract values(): Promise<Array<T>>;
};
