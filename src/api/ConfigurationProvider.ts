/**
 * Configuration will be included in a local json file
 */
export type LocalFileConfigurationProvider = 'localFile';
/**
 * Configuration will be included in a json file on some external http/https host and will be served statically
 */
export type HttpFileConfigurationProvider = 'httpFile';
/**
 * Configuration will be available as an entry point of a special "hardcore" server
 */
export type HardcoreServerConfigurationProvider = 'hardcoreServer';
/**
 * Configuration will be available as an entry point of some http server
 */
export type HttpServerConfigurationProvider = 'httpServer';
/**
 * Configuration will be available under a special key in localStorage
 */
export type LocalStorageConfigurationProvider = 'localStorage';
/**
 * The type of Configuration Provider, that specifies how to get the configuration source
 */
export type ConfigurationProvider = LocalFileConfigurationProvider | HttpFileConfigurationProvider | HardcoreServerConfigurationProvider | HttpServerConfigurationProvider | LocalStorageConfigurationProvider;
