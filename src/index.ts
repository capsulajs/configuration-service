import * as API from './api';

export { API };
export { ConfigurationService } from './api';
export { ConfigurationServiceScalecube } from './provider/Scalecube';
export { ConfigurationServiceLocalStorage } from './provider/LocalStorage';
export { ConfigurationServiceFile } from './provider/FileProvider';
export { ConfigurationServiceHttp } from './provider/HttpProvider';
export { ConfigurationServiceHttpFile } from './provider/HttpFile';
export { messages, getProvider, configurationTypes } from './utils';
