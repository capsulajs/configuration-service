# Configuration Service

## Providers

### localFile

Configuration will be included in a local json file.

_Example token: "./path/to/configuration"_

### httpFile

Configuration will be included in a json file on some external http/https host and will be served statically.

_Example token: "http://localhost:1234"_

### hardcoreServer

Configuration will be available as an entry point of a special "hardcore" server.

### httpServer

Configuration will be available as an entry point of some http/https server.

_Example token: "http://localhost:1234"_

### localStorage

Configuration will be available under a special key in localStorage.

_Example token: "configurationKey"_

## GetProvider util

Is used to get the class of an appropriate ConfigurationProvider.

Will throw an error, if wrong **configProvider** is provided in the call of the function.

Possible values for **configProvider**:
1. "localFile"
2. "httpFile"
3. "hardcoreServer"
4. "httpServer"
5. "localStorage"

**Example**

```typescript
try {
  const HttpFileConfigurationProvider = getProvider({ configProvider: "localFile" as LocalFileConfigurationProvider });
  const configurationService = new HttpFileConfigurationProvider("http://localhost:1234");
} catch(error) {
  console.log('error.message');
}
```


