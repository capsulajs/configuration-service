import { CreateRepositoryRequest, CreateRepositoryResponse, DeleteRequest, DeleteResponse, EntriesRequest, EntriesResponse, FetchRequest, FetchResponse, SaveRequest, SaveResponse } from '.';
/**
 * Interface of the ConfigurationService
 * Type Parameter T specifies the type of the key values
 */
export interface ConfigurationService<T = any> {
    /**
     * This operation enable you to create the specified Repository for collecting and storing
     * the relevant entries and requires a write permission level granted for owner role only
     */
    createRepository(request: CreateRepositoryRequest): Promise<CreateRepositoryResponse>;
    /**
     * This operation enable you to delete a specified entry (key) from the relevant Repository
     * and requires a write level permission granted for owner either admin role only
     * @return an empty promise
     * */
    delete(request: DeleteRequest): Promise<DeleteResponse>;
    /**
     * This operation enable you to get all values (array of objects) by retrieving all the entries (keys)
     * from the relevant Repository and enabled for each accessible permission level (read&write)
     * granted for owner either admin or member role
     * @return promise with array of the values of all of the keys
     * */
    entries(request: EntriesRequest): Promise<EntriesResponse<T>>;
    /**
     * Gets the value of the specified key
     * @return promise with the key's values
     * */
    fetch(request: FetchRequest): Promise<FetchResponse>;
    /**
     * Sets the value of the specified key
     * @return an empty promise
     * */
    save(request: SaveRequest): Promise<SaveResponse>;
}
