import { Repository } from './api';
import { ConfigurationServiceHardcoreRemote } from './provider/HardcoreRemote';
import { ConfigurationServiceLocalStorage } from './provider/LocalStorage';
import { ConfigurationServiceFile } from './provider/FileProvider';
import { ConfigurationServiceHttp } from './provider/HttpProvider';
import { ConfigurationServiceHttpFile } from './provider/HttpFile';

export const repositoryRequestValidator = (request: any) => request === undefined || request.repository === undefined;

export const repositoryKeyRequestValidator = (request: any) => request.key === undefined;

export const messages = {
  notImplemented: 'Configuration repository method not implemented yet',
  tokenNotProvided: 'Configuration repository token not provided',
  repositoryNotProvided: 'Configuration repository not provided',
  repositoryKeyNotProvided: 'Configuration repository key not provided',
  repositoryAlreadyExists: 'Configuration repository already exists'
};

export const configurationTypes = {
  localFile: 'localFile',
  hardcoreServer: 'hardcoreServer',
  httpFile: 'httpFile',
  httpServer: 'httpServer',
  localStorage: 'localStorage',
};

export const fetchFile = (token: string, fileName: string) => fetch(`http://${token}/${fileName}.json`)
  .then((response) => response.json());

export const formatRepositoryToEntries = (repository: Repository) => Object.keys(repository)
  .map(key => ({ key, value: repository[key] }));

export const getRepositoryNotFoundErrorMessage = (repository: string) => `Configuration repository ${repository} not found`;

export const getRepositoryKeyNotFoundErrorMessage = (key: string) => `Configuration repository key ${key} not found`;

export const getProvider = (getProviderRequest: any) => {
  switch (getProviderRequest.configProvider) {
    case configurationTypes.httpServer: {
      return ConfigurationServiceHttp;
    }
    case configurationTypes.hardcoreServer: {
      return ConfigurationServiceHardcoreRemote;
    }
    case configurationTypes.httpFile: {
      return ConfigurationServiceHttpFile;
    }
    case configurationTypes.localFile: {
      return ConfigurationServiceFile;
    }
    case configurationTypes.localStorage: {
      return ConfigurationServiceLocalStorage;
    }
  }
};
