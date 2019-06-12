 Feature: Expose function to select configuration provider in Configuration service

 Background:
    Given Configuration Service with getProvider utility
    And the following <configProvider> available
         |<configProvider>                   |
         |LocalFileConfigurationProvider     |
         |HttpFileConfigurationProvider      |
         |ScalecubeConfigurationProvider|
         |HttpServerConfigurationProvider    |
         |LocalStorageConfigurationProvider  |

 Scenario: getProvider returns the configuration provider according to configProvider
    When calling getProvider with available <configProvider>
    Then the corresponding class of ConfigurationProvider is returned

 Scenario: getProvider with an invalid configProvider throws an error
    When calling getProvider with an invalid value of <configProvider>
         |<configProvider>|
         |''        |
         |{}        |
         |{ test: 'test' }|
         |[]        |
         |['test']  |
         |null      |
         |undefined |
         |true      |
         |false     |
         |0         |
         |-1        |
    Then a relevant error is being thrown

 Scenario: getProvider with an non-existent configProvider throws an error
    When calling getProvider with a configProvider which is not in the list of available configuration types
    Then a relevant error is being thrown
