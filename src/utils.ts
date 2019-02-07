export const repositoryRequestValidator = (request: any) => request === undefined || request.repository === undefined;
export const repositoryKeyRequestValidator = (request: any) => request.key === undefined;
export const messages = {
  notImplemented: 'Configuration repository method not implemented yet',
  filenameNotProvided: 'Configuration repository filename not provided',
  fileNotExist: 'Configuration repository file not exist',
  tokenNotProvided: 'Configuration repository token not provided',
  repositoryNotProvided: 'Configuration repository not provided',
  repositoryKeyNotProvided: 'Configuration repository key not provided',
  repositoryAlreadyExists: 'Configuration repository already exists'
};
