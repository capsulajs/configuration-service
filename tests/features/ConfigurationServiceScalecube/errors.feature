Feature: Errors tests for the ConfigurationServiceScalecube

Scenario: Create new instance of service without providing a token should throw a error
    Given configurationServiceScalecube
    When  user create configurationServiceScalecube
    And   token is not provided
    Then  user receives an error that token is not provided

Scenario: Call method from configurationServiceScalecube  without repository in the request - error is thrown
    Given configurationServiceScalecube is created with a valid token
    And   configurationServiceScalecube with following <methods>
          |<methods>       |
          |createRepository|
          |deleteEntry      |
          |readList        |
          |readEntry       |
          |createEntry     |
          |readEntryHistory|
    When  user calls one of the methods
    And   user does not provide repository name in the request
    Then  `Please specify 'repository'` error message will be returned

Scenario: Call method from configurationServiceScalecube  without apiKey in the request - error is thrown
    Given configurationServiceScalecube is created with a valid token
    And   configurationServiceScalecube with following <methods>
          |<methods>       |
          |createRepository|
          |deleteEntry      |
          |readList        |
          |readEntry       |
          |createEntry     |
          |readEntryHistory|
    When  user calls one of the methods
    And   user does not provide apiKey in the request
    Then  `Please specify 'apiKey' not found` error message will be returned

Scenario: Call createEntry(), readEntry(),  updateEntry(), deleteEntry(), readEntryHistory() with unexisting repository should throw error
    Given configurationServiceScalecube with following <methods>
          |<methods>       |
          |createEntry     |
          |readEntry       |
          |updateEntry     |
          |deleteEntry     |
          |readEntryHistory|
    And   configurationServiceScalecube is created with a valid token
    And   an existing repository A 
    When  user calls one of the methods with repository B
    Then  `Repository 'B' key 'KEY-NAME' not found` error message will be returned

Scenario: Call createEntry(), readEntry(),  updateEntry(), deleteEntry(), readEntryHistory() and without providing key should throw error
    Given configurationServiceScalecube with following <methods>
          |<methods>       |
          |createEntry     |
          |readEntry       |
          |updateEntry     |
          |deleteEntry     |
          |readEntryHistory|
    And   configurationServiceScalecube is created with a valid token
    And   an existing repository
    When  user calls one of the methods without providing the key in the request
    Then  `Please specify 'key'` error message will be returned

Scenario: Call readEntry(),  updateEntry(), deleteEntry(), readEntryHistory() with unexisting key should throw error
    Given configurationServiceScalecube with following <methods>
          |<methods>       |
          |readEntry       |
          |updateEntry     |
          |deleteEntry     |
          |readEntryHistory|
    And   configurationServiceScalecube is created with a valid token
    And   an existing repository A with apiKey B
    When  user calls one of the methods with apiKey C in the request
    Then  `Repository 'A' key 'C' not found` error message will be returned

Scenario: createRepository() providing an existing repository name should return error
  Given ConfigurationServiceScalecube with createRepository method
  And   an existing  repository A with apiKey B
  When  user calls createRepository method repository A in the request
  Then  `Repository with name: 'A' already exists` error message will be returned 

Scenario: createEntry() with a key that already exists in the repository
  Given configurationServiceScalecube with createEntry method
  And   an existing repository A with apiKey B
  And   an entry with key: X and value: Y 
  When  user calls createEntry method with key: X and value: Y 
  Then  `Repository 'A' key 'B' already exists` error message will be returned 
  
Scenario: Call readEntry() with a valid version that doesn't exists
  Given  ConfigurationServiceScalecube with readList method
  And    an existing repository containing an entry with key:X and version:1
  When   user calls readEntry method with key:X,  the name of this repository and version:2
  Then   `Key 'X' version '2' not found` error message will be returned 
