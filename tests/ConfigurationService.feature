#############################################
# Capsula-Hub ConfigurationService Gherkin  #
#############################################

# Tests tagged as @Future are for future implementations of newlogic

# The method 'deleteAll' provides the deletion of all configuration keys, return empty promise
Scenario: If a valid 'deleteAll' is sent then a response received is rejected or passed
Given   configurationService with deleteAll method
And     there are configuration keys in local storage
When    user sends a valid deleteAll request (default values{numValue: 1, stringValue: 'test'})
And     request is valid
Then    user received 'resolved' promise
And     all configuration keys removed

# The method 'deleteKey' provides the deletion of configuration by specific key, return empty promise
Scenario: If a 'deleteKey' is sent then a response received is rejected or passed
Given   configurationService with deleteKey method
And     configKey:X exists in local storage
When    user sends a valid deleteKey request (configKey:X)
Then    user received 'resolved' promise
And     configKey:X was removed from local storage

# The method 'get' provides the configuration by specific key, return promise with configuration object
Scenario: 'get' method is used for a specific key, return configuration received
Given   configurationService with get method
And     provider has the configuration for key:X
When    user sends a valid 'get' request with (key:X)
Then    user receives a correct response for key:X

Scenario: 'get' method is sent with a non exist key, a rejection message "Configuration key aKey not found" will be received
Given   configurationService with get method
And     provider is local storage doesn't have the configuration for key:Z
When    user sends a 'get' request with key:Z
Then    an error message "Configuration key key:Z not found" will be received

# The method 'keys' provides the list of configuration keys, return promise string array
Scenario: 'keys' method is used by ConfigurationService instance to send configurations for all keys, an array of configurations received
Given   configurationService with keys method
And     configuration service has several configuration keys
When    user sends a valid keys request
Then    user receives array of strings of the keys configuration

# REMOVE, THERE ARE NO ARGUMENTS TO THE REQUEST
Scenario: 'keys' method is used by ConfigurationService to send a non exist value, an error will be presented
Given   configurationService with keys method
When    user sends a non exist keys request (configKey + '9999')
Then    a relevant error will be received

# The method 'set' provides the setting of configuration by specific key, return empty promise
Scenario: 'set' method is used to send a specific key configuration
Given   configurationService with set method
And     provider has configuration for key:9999
When    user sends a valid 'set' request with (key:9999, value:T)
Then    configuration for key:9999 was updated with value:T

Scenario: 'set' method is used by ConfigurationService to send a non exist key, an error will be presented
Given   configurationService with set method
And     provider doesn't have key:10000 configuration
When    user sends a non exist 'set' value (key:10000, value:T)
Then    a relevant error will be received

# The method 'values' provides the getting of configurations by specific key, return promise with array of configuration objects by all keys
Scenario: 'values' method is used to get the configuration of a specific key, response received is an array of configurations by all keys
Given   configurationService with values method
And     provider has several configured keys
And     key (value:a, key:b)
When    user sends a valid 'values' request with (value:a, key:b)
Then    array of configuration objects for all values received

Scenario: 'values' method is used by ConfigurationService to send a non exist value of a specific key, an error will be presented
Given   configurationService with values method
And     provider has several configured keys
And     key (value:XXX, key:b) does not exist
When    user sends an invalid 'values' request with (value:XXX, key:b)
Then    a relevant error will be received

@Future
# To be used in the future when this logic wil be implemented.
Scenario: If a 'deleteKey' is sent with a non exist key, an error will be received
Given   configurationService with deleteKey method
And     configKey:X exists in local storage
When    user sends a deleteKey request
And     configKey:X sent does not exist
Then    rejected response will be received
And     error(`Configuration key ${configKey} not found`)

@Future
# To be used in the future when this logic wil be implemented.
Scenario: Validating the 'get' request value (string)
Given   configurationService with get method
And     provider is local storage
When    user sends an in valid 'get' request with <numValue>, <stringValue>
|numValue |stringValue  |
|!(string)|!(string)    |
Then    a relevant error will be received

@Future
# To be used in the future when this logic wil be implemented.
Scenario: Validating the 'keys' return value (string)
Given   configurationService with keys method
When    user sends an invalid 'keys' request with <configKey> <numValue>, <stringValue>
|configKey  |numValue |stringValue  |
|!(string)  |!(string)|!(string)    |
Then    a relevant error will be received

@Future
# To be used in the future when this logic wil be implemented.
Scenario: Validating the 'set' request value for a specific key (string)
Given   configurationService with set method
When    user sends an invalid 'set' request with <Key> <Value>
|Key        |Value    |
|!(string)  |!(string)|
Then    a relevant error will be received

@Future
# To be used in the future when this logic wil be implemented.
Scenario: Validating the 'values' request of the array
Given   configurationService with values method
And     provider has several configured keys
When    user sends an invalid 'values' request with <Key>, <Value>
|Key        |Value    |
|!(string)  |!(string)|
Then    a relevant error will be received