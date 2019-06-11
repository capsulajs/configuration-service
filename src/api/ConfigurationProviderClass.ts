import { ConfigurationService } from './ConfigurationService';

export type ConfigurationProviderClass = new (...configurationServiceConfig: any[]) => ConfigurationService;
