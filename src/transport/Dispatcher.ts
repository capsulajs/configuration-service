export interface Dispatcher<T, R> {
  dispatch(request: T): Promise<R>
}
