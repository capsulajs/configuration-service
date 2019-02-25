import { ConfigurationService, CreateRepositoryRequest, CreateRepositoryResponse, DeleteRequest, DeleteResponse, EntriesRequest, EntriesResponse, FetchRequest, FetchResponse, SaveRequest, SaveResponse } from '../../api';
export declare class ConfigurationServiceHttp implements ConfigurationService {
    private token;
    private dispatcher;
    constructor(token: string);
    private getRepository;
    createRepository(request: CreateRepositoryRequest): Promise<CreateRepositoryResponse>;
    delete(request: DeleteRequest): Promise<DeleteResponse>;
    entries(request: EntriesRequest): Promise<EntriesResponse>;
    fetch(request: FetchRequest): Promise<FetchResponse>;
    save(request: SaveRequest): Promise<SaveResponse>;
}
