/**
 * Configuration will be included in a local json file
 */
export type LocalFileConfigurationType = 'localFile';
/**
 * Configuration will be included in a json file on some external http/https host
 */
export type HttpFileConfigurationType = 'httpFile';
/**
 * Configuration will be available as an entry point of a special "hardcore" server
 */
export type HardcoreServerConfigurationType = 'hardcoreServer';
/**
 * Configuration will be available as an entry point of some http server
 */
export type HttpServerConfigurationType = 'httpServer';
/**
 * Configuration will be available under a special key in localStorage
 */
export type LocalStorageConfigurationType = 'localStorage';
/**
 * The type of Configuration Provider, that specifies how to get the configuration source
 */
export type ConfigurationType = LocalFileConfigurationType | HttpFileConfigurationType | HardcoreServerConfigurationType | HttpServerConfigurationType | LocalStorageConfigurationType;
