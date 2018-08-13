import { ConfigurationServiceLocalStorage } from 'src/provider/LocalStorage';

export const buildConfigurationServiceLocalStorage = (configKey: string, configValue?: any) => {

  const configService = new ConfigurationServiceLocalStorage('testConfig');

  return configValue ?
    configService.set(configKey, configValue).then(() => configService) :
    Promise.resolve(configService);

};
