export interface ConfigurationService {
  clearAll(): Promise<void>;
  clearKey(key: string): Promise<void>;
  get(key: string): Promise<any>;
  keys(): Promise<Array<string>>;
  set(key: string, value: any): Promise<void>;
  values(): Promise<Array<any>>;
};
