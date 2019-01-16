#############################################
# Capsula-Hub ConfigurationService Gherkin  #
#############################################

# 'configurationService' configuration is built into the local storage from remote service with configKey, defaultValues
Scenario: 'configKey' receive 'localStorageKey' and builds the configurationService local storage
  Given   configurationService with buildConfigurationServiceLocalStorage method
  And     user sends createConfigurationService request
  Then    buildConfigurationServiceLocalStorage response will be received
  And     buildConfigurationServiceLocalStorage (configKey, defaultValues)

# The method 'deleteAll' provides the deletion of all configuration keys, return empty promise
Scenario: If a valid 'deleteAll' is sent then a response received is rejected or passed
  Given   configurationService with deleteAll method
  When    user sends a valid deleteAll request (default values{numValue: 1, stringValue: 'test'})
  And     request is valid
  Then    a rejected or passed response will be received

Scenario: A 'deleteAll' is sent and no response is received due to server or network error
  Given   configurationService with deleteAll method
  And     keys array in local storage has configuration values
  When    user sends a valid deleteAll request
  And     network or server error
  Then    a relevant error message will be presented
  And     hub will continue to run

Scenario: Validating the 'deleteAll' method values
  Given   configurationService with deleteAll method
  When    user sends a deleteAll request (default values{numValue: 1, stringValue: 'test'})
  Then    a rejected or passed response will be received

# The method 'deleteKey' provides the deletion of configuration by specific key, return empty promise
Scenario: If a 'deleteKey' is sent then a response received is rejected or passed
  Given   configurationService with deleteKey method
  When    user sends a valid deleteKey request (default values{numValue: 1, stringValue: 'test'})
  Then    a rejected or passed response will be received

Scenario: If a 'deleteKey' is sent with a non exist key, an error will be received
  Given   configurationService with deleteKey method
  When    user sends a deleteKey request
  And     key sent does not exist
  Then    rejected response will be received
  And     error(`Configuration key ${configKey} not found`)

Scenario: A 'deleteKey' is sent and no response is received due to server or network error
  Given   configurationService with deleteKey method
  When    user sends a valid deleteKey request
  And     network or server error
  Then    a relevant error message will be presented
  And     hub will continue to run

Scenario: Validating the response from a 'deleteKey' method
  Given   configurationService with deleteKey method
  When    user sends a valid deleteKey request (default values{numValue: 1, stringValue: 'test'})
  And     response that was given was not a rejected or passed
  Then    a relevant error will be presented

# The method 'get' provides the configuration by specific key, return promise with configuration object
Scenario: 'get' method is used for a specific key, return configuration received
  Given   configurationService with get method
  When    user sends a valid 'get' request with ({numValue: 3, stringValue: 'testX'})
  Then    configuration object will be emitted

Scenario: 'get' method is sent with a non exist key, a rejection message "Configuration key aKey not found" will be received
  Given   configurationService with get method
  When    user sends a non exist stringValue
  Then    an error message "Configuration key aKey not found" will be received

Scenario: Validating the 'get' return value (string)
  Given   configurationService with get method
  When    user sends an in valid 'get' request with <numValue>, <stringValue>
  |numValue	|stringValue	|
  |!(string)|!(string)		|
  Then    a relevant error will be received

# The method 'keys' provides the list of configuration keys, return promise string array
Scenario: 'keys' method is used by ConfigurationService to send configurations for all keys, an array of configurations received
  Given   configurationService with keys method
  When    user sends a valid keys request with (configKey + '1', {numValue: 3, stringValue: 'testX'})
  Then    configuration object array of configuration keys requested in configKey will be emitted

Scenario: 'keys' method is used by ConfigurationService to send a non exist value, an error will be presented
  Given   configurationService with keys method
  When    user sends a non exist keys request (configKey + '9999')
  Then    a relevant error will be received

Scenario: Validating the 'keys' return value (string)
  Given   configurationService with keys method
  When    user sends an invalid 'keys' request with <configKey> <numValue>, <stringValue>
  |configKey  |numValue |stringValue	|
  |!(string)  |!(string)|!(string)		|
  Then    a relevant error will be received

# The method 'set' provides the setting of configuration by specific key, return empty promise
Scenario: 'set' method is used to send a specific key configuration, response received is rejected or passed
  Given   configurationService with set method
  When    user sends a valid 'set' request with (configKey + '1', {numValue: 3, stringValue: 'testX'})
  Then    a rejected or passed response will be received

Scenario: 'set' method is used by ConfigurationService to send a non exist value, an error will be presented
  Given   configurationService with set method
  When    user sends a non exist 'set' value (numValue: 9999)
  Then    a relevant error will be received

Scenario: Validating the 'set' return value for a specific key (string)
  Given   configurationService with set method
  When    user sends an invalid 'set' request with <configKey> <numValue>, <stringValue>
  |configKey  |numValue |stringValue	|
  |!(string)  |!(string)|!(string)		|
  Then    a relevant error will be received

# The method 'values' provides the getting of configurations by specific key, return promise with array of configuration objects by all keys
Scenario: 'values' method is used to get the configuration of a specific key, response received is an array of configurations by all keys
  Given   configurationService with set method
  When    user sends a valid 'values' request with (configKey + 'A', {numValue: 3, stringValue: 'testX'})
  Then    array of configuration  objects for all keys received

Scenario: 'values' method is used by ConfigurationService to send a non exist value of a specific key, an error will be presented
  Given   configurationService with set method
  When    user sends an invalid 'values' request with (numValue: 9999)
  Then    a relevant error will be received

Scenario: Validating the 'values' returned response of the array
  Given   configurationService with set method
  When    user sends an invalid 'values' request with <configKey> <numValue>, <stringValue>
  |configKey  |numValue |stringValue	|
  |!(string)  |!(string)|!(string)		|
  Then    a relevant error will be received
