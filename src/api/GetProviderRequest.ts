import { ConfigurationProvider } from '.';

export interface GetProviderRequest {
  /**
   * The type of a provider that will be used in ConfigurationService
   */
  configProvider: ConfigurationProvider;
}
