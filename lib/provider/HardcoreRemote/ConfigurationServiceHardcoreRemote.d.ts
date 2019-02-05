import { Dispatcher } from '@capsulajs/capsulajs-transport-providers';
import { ConfigurationService, CreateRepositoryRequest, CreateRepositoryResponse, DeleteRequest, DeleteResponse, EntriesRequest, EntriesResponse, FetchRequest, FetchResponse, SaveRequest, SaveResponse } from '../../api';
export declare class ConfigurationServiceHardcoreRemote<T = any> implements ConfigurationService<T> {
    private token;
    private dispatcher;
    constructor(token: string, dispatcher: Dispatcher);
    private prepRequest;
    createRepository(request: CreateRepositoryRequest): Promise<CreateRepositoryResponse>;
    delete(request: DeleteRequest): Promise<DeleteResponse>;
    entries<T>(request: EntriesRequest): Promise<EntriesResponse<T>>;
    fetch(request: FetchRequest): Promise<FetchResponse<T>>;
    save(request: SaveRequest<T>): Promise<SaveResponse>;
}
