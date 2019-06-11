import { ConfigurationProviderClass, GetProviderRequest } from '.';

/**
 * Returns the class of a ConfigurationProvider based on a specific configuration provider name
 * @param getProviderRequest
 */
export type GetProvider = (getProviderRequest: GetProviderRequest) => ConfigurationProviderClass;
