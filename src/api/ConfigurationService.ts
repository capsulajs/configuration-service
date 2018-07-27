export interface ConfigurationService {
  clearAll(): Promise<void>;
  clearKey(key: string): Promise<void>;
  get<T>(key: string): Promise<T>;
  keys(): Promise<Array<string>>;
  set<T>(key: string, value: T): Promise<void>;
  values<T>(): Promise<Array<T>>;
};
