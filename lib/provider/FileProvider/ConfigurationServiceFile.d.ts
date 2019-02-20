import { ConfigurationService, CreateRepositoryRequest, CreateRepositoryResponse, DeleteRequest, DeleteResponse, EntriesRequest, EntriesResponse, FetchRequest, FetchResponse, SaveRequest, SaveResponse } from '../../api';
export declare class ConfigurationServiceFile<T = any> implements ConfigurationService<T> {
    private filename;
    private storage;
    constructor(filename: string);
    private getRepository;
    createRepository(request: CreateRepositoryRequest): Promise<CreateRepositoryResponse>;
    delete(request: DeleteRequest): Promise<DeleteResponse>;
    entries(request: EntriesRequest): Promise<EntriesResponse>;
    fetch(request: FetchRequest): Promise<FetchResponse>;
    save(request: SaveRequest): Promise<SaveResponse>;
}
