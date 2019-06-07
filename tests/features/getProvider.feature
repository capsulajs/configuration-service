 Feature: Expose function to select configuration provider in Configuration service

 Background:
    Given Configuration Service with getProvider utility
    And the following <configurationType> available
         |<configurationType>            |
         |LocalFileConfigurationType     |
         |HttpFileConfigurationType      |
         |HardcoreServerConfigurationType|
         |HttpServerConfigurationType    |
         |LocalStorageConfigurationType  |

 Scenario: getProvider returns the configuration provider according to configurationType
    When calling getProvider with available <configurationType>
    Then the corresponding class of ConfigurationService is returned

 Scenario: getProvider with an invalid configurationType is rejected with error
    When calling getProvider with an invalid value of <configurationType>
         |<configurationType>|
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
    Then a relevant error is returned

 Scenario: getProvider with an non-existent configurationType is rejected with error
    When calling getProvider with a configurationType which is not in the list of available configuration types
    Then a relevant error is returned

