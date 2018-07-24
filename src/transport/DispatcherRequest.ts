export interface DispatcherRequest<T> {
  command: string;
  payload?: T;
};
