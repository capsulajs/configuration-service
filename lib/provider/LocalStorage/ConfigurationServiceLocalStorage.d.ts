import { ConfigurationService, CreateRepositoryRequest, CreateRepositoryResponse, DeleteRequest, DeleteResponse, EntriesRequest, EntriesResponse, FetchRequest, FetchResponse, SaveRequest, SaveResponse } from '../../api';
export declare class ConfigurationServiceLocalStorage<T = any> implements ConfigurationService<T> {
    private token;
    constructor(token: string);
    private getRepository;
    createRepository(request: CreateRepositoryRequest): Promise<CreateRepositoryResponse>;
    delete(request: DeleteRequest): Promise<DeleteResponse>;
    entries(request: EntriesRequest): Promise<EntriesResponse<T>>;
    fetch(request: FetchRequest): Promise<FetchResponse>;
    save(request: SaveRequest): Promise<SaveResponse>;
}
