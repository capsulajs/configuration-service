import { ConfigurationServiceInterface } from 'api/ConfigurationServiceInterface';
import { ConfigurationServiceLocalStorage } from 'provider/LocalStorage';

export const buildConfigurationServiceLocalStorage = (configKey: string, configValue?: any): Promise<ConfigurationServiceInterface> => {

  const configService = new ConfigurationServiceLocalStorage('testConfig');

  return configValue ?
    configService.set({ key: configKey, value: configValue }).then(() => configService) :
    Promise.resolve(configService);

};
