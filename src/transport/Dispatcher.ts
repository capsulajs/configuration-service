import { DispatcherRequest, DispatcherResponse } from '.';

export interface Dispatcher<T, R> {
  dispatch(request: DispatcherRequest<T>): Promise<DispatcherResponse<R>>;
};
