/**
 * Type definitions for Configuration Service requests and responses
 */

 /**
  * Create Repository Request
  * @token - The requested API key (token) which assigned with relevant role (permission level)
  * @repository - Specified name of the repository
  */
export interface CreateRepositoryRequest {
  token: string;
  repository: string;
};

/**
 * Create Repository Response
 */
export interface CreateRepositoryResponse {};

/**
 * Delete Key Request
 * @token - The requested API key (token) which assigned with relevant role (permission level)
 * @repository - Specified name of the repository
 * @key - Specified key name (entry) for relevant configuration setting in the repository
 */
export interface DeleteRequest {
  token: string;
  repository: string;
  key?: string;
}

/**
 * Delete Response
 */
export interface DeleteResponse {};

/**
 * Entries Request
 * @repository - Specified name of the repository
 */
export interface EntriesRequest {
  repository: string;
}

/**
 * Entries Response
 * @entries - List of all entries from the relevant configuration setting in the repository (Array of Objects)
 * @key - Specified node name applied for relevant configuration settings in the repository
 * @value - Specified key name (entry) for relevant configuration setting in the repository
 */
export interface EntriesResponse<T=any> {
  entries: Array<T>,
  key?: string;
  value?: string;
};

/**
 * Fetch Value Request
 * @repository - Specified name of the repository
 * @key - Specified key name (entry) for relevant configuration setting in the repository
 */
export interface FetchRequest {
  repository: string;
  key: string;
};

/**
 * Fetch Value Response
 * @key - Specified key name (entry) for relevant configuration setting in the repository
 * @value - Specified node name applied for relevant configuration settings in the repository
 */
export interface FetchResponse<T=any> {
  key: string;
  value: T;
};

/**
 * Save Value Request
 * @repository - Specified name of the repository
 * @key - Specified key name (entry) for relevant configuration setting in the repository
 * @value - Specified node (entry) name applied for relevant configuration settings in the repository
 */
export interface SaveRequest<T=any> {
  repository: string;
  key: string;
  value: T;
};

/**
 * Save Value Response
 */
export interface SaveResponse {};
