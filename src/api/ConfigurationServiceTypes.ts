/**
 * Type definitions for Configuration Servce requests and responses
 */

 /**
  * Create Repository Request
  * Authentication Token and the Repository Name are supposed to be added by the Service Method
  */
export interface CreateRepositoryRequest {
};

/**
 * Create Repository Response
 * An empty object, just an aknowledgement
 */
export interface CreateRepositoryResponse {
};

/**
 * Set Value Request
 * @key - Key
 * @value - Value
 */
export interface SetRequest<T=any> {
  key: string;
  value: T;
}

/**
 * Set Value Response
 * An empty object, just an aknowledgement
 */
export interface SetResponse {
};

/**
 * Get Value Request
 */
export interface GetRequest {
  key: string;
};

/**
 * Get Value Response
 */
export interface GetResponse<T=any> {
  value: T;
}