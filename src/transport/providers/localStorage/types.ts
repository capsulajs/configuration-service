export type LocalStorageMethod = 'get' | 'set' | 'list';

export interface LocalStorageRequest<T> {
  method: LocalStorageMethod;
  payload?: T;
};

export interface LocalStorageResponse<T> {
  payload?: T;
};
