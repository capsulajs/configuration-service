export type LocalStorageMethod = 'clear' | 'get' | 'set';

export interface LocalStorageRequest<T> {
  method: LocalStorageMethod;
  payload?: T;
};

export interface LocalStorageResponse<T> {
  payload?: T;
};
