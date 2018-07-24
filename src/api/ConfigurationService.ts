import { Dispatcher } from '../transport';

export class ConfigurationService<T, R> {
  private dispatcher: Dispatcher<T, R>;

  constructor(dispatcher: Dispatcher<T, R>) {
    if (!dispatcher) {
      throw new Error('Dispatcher must be supplied!');
    }
    this.dispatcher = dispatcher;
  };

  private execCommand(command: string, payload?: T): Promise<R | undefined> {
    if (!command) {
      throw new Error(`Wrong command ${command}`);
    }

    return this.dispatcher.dispatch({ command, payload })
      .then(resp => resp.payload);
  }

  get(): Promise<R | undefined> {
    return this.execCommand('get');
  };

  set(request: T): Promise<R | undefined> {
    return this.execCommand('set', request);
  };
};
