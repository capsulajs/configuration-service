/**
 * Interface of the ConfigurationService
 */

export interface ConfigurationService {
  /**
   * The method provides the deletion of all configuration keys
   * @return empty promise
   * */
  clearAll(): Promise<void>;
  /**
   * The method provides the deletion of configuration by specific key
   * @return empty promise
   * */
  clearKey(key: string): Promise<void>;
  /**
   * The method provides the configuration by specific key
   * @return promise with configuration object
   * */
  get<T>(key: string): Promise<T>;
  /**
   * The method provides the list of configuration keys
   * @return promise string array
   * */
  keys(): Promise<Array<string>>;
  /**
   * The method provides the setting of configuration by specific key
   * @return empty promise
   * */
  set<T>(key: string, value: T): Promise<void>;
  /**
   * The method provides the getting of configurations by specific key
   * @return promise with array of configuration objects by all keys
   * */
  values<T>(): Promise<Array<T>>;
};
