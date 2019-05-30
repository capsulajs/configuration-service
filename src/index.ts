export { ConfigurationService } from './api';
export { ConfigurationServiceHardcoreRemote } from './provider/HardcoreRemote';
export { ConfigurationServiceLocalStorage } from './provider/LocalStorage';
export { ConfigurationServiceFile } from './provider/FileProvider';
export { ConfigurationServiceHttp } from './provider/HttpProvider';
export { ConfigurationServiceHttpFile } from './provider/HttpFile';
export { messages } from './utils';

// const configurationServiceHttpFile = new ConfigurationServiceHttpFile('localhost:3000');
//
// configurationServiceHttpFile.entries({ repository: 'workspace7' }).then((response) => {
//   console.log('entries response', response)
// }).catch((error) => {
//   console.log('error', error);
// })
//
// export { ConfigurationServiceHttpFile };

