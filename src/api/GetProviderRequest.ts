import { ConfigurationType } from '.';

export interface GetProviderRequest {
  /**
   * The type of a provider that will be used in ConfigurationService
   */
  configurationType: ConfigurationType;
}
