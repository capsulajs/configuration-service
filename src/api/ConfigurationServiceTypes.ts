/**
 * Type definitions for Configuration Service requests and responses
 */

 /**
  * Create Repository Request
  * Authentication Token and the Repository Name are supposed to be added by the Service Method
  */
export interface CreateRepositoryRequest {
};

/**
 * Create Repository Response
 * An empty object, just an acknowledgement
 */
export interface CreateRepositoryResponse {
};


/**
 * Fetch Value Request
 */
export interface FetchRequest {
  key: string;
};

/**
 * Fetch Value Response
 */
export interface FetchResponse<T=any> {
  value: T;
};

/**
 * Save Value Request
 * @key - Key
 * @value - Value
 */
export interface SaveRequest<T=any> {
  key: string;
  value: T;
};

/**
 * Save Value Response
 * An empty object, just an acknowledgement
 */
export interface SaveResponse {
};
