export interface ConfigurationService {
  // STAGE 2 clearAll(): Promise<any>;
  // STAGE 2 clearKey(): Promise<any>;
  get(key: string): Promise<any>;
  // STAGFE 2 keys(): Promise<Array<any>>;
  set(key: string, value: any): Promise<any>;
  // STAGE 2 values(): Promise<Array<any>>;
};
