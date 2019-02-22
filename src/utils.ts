export const repositoryRequestValidator = (request: any) => request === undefined || request.repository === undefined;
export const repositoryKeyRequestValidator = (request: any) => request.key === undefined;
export const messages = {
  notImplemented: 'Configuration repository method not implemented yet',
  filenameNotProvided: 'Configuration repository filename not provided',
  endpointNotProvided: 'Configuration repository endpoint not provided',
  fileOrDirectoryNotExist: 'Configuration repository file or directory not exist',
  fileNotValid: 'Configuration repository file not valid',
  tokenNotProvided: 'Configuration repository token not provided',
  repositoryNotProvided: 'Configuration repository not provided',
  repositoryKeyNotProvided: 'Configuration repository key not provided',
  repositoryAlreadyExists: 'Configuration repository already exists'
};
