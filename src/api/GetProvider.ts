import { ConfigurationService, GetProviderRequest } from '.';

/**
 * Returns the class of a ConfigurationService based on the configurationType
 * @param getProviderRequest
 */
export type GetProvider = (getProviderRequest: GetProviderRequest) => new (configurationServiceConfig: any) => ConfigurationService;
