import {
  CreateRepositoryRequest,
  CreateRepositoryResponse,
  DeleteRequest,
  DeleteResponse,
  EntriesRequest,
  EntriesResponse,
  FetchRequest,
  FetchResponse,
  SaveRequest,
  SaveResponse
} from '.';

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
  fetch(request: FetchRequest): Promise<FetchResponse<T>>;
  /**
   * Sets the value of the specified key
   * Deprecated method
   * @return an empty promise
   * */
  save(request: SaveRequest<T>): Promise<SaveResponse>;
  /**
   * Creates a new entry in ConfigurationService
   * @return a promise, that is resolved when a new entry has been successfully created
   * Rejected in case of:
   * Code|Description
   * -----|-----
   * ERR_ALREADY_EXIST|The entry with a provided key already exists|
   * ERR_INVALID_REQUEST|Request is invalid|
   * ERR_NETWORK_ERROR|Network error while providing the operation|
   * */
  create(request: SaveRequest<T>): Promise<SaveResponse>;
  /**
   * Updates an existing entry in ConfigurationService
   * @return a promise, that is resolved when a new entry has been successfully updated
   * Rejected in case of:
   * Code|Description
   * -----|-----
   * ERR_NOT_EXIST|The entry with a provided key hasn't been created yet|
   * ERR_INVALID_REQUEST|Request is invalid|
   * ERR_NETWORK_ERROR|Network error while providing the operation|
   * */
  update(request: SaveRequest<T>): Promise<SaveResponse>;
}
