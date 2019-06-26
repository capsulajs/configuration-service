Feature: Errors tests for the ConfigurationServiceScalecube

Scenario: New instance of service should throw 'tokenNotProvided' error
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
    Then  user receives an error that the repository name is not provided

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
    Then  user receives an error that the apiKey is not provided

Scenario: Call createEntry(), readEntry(),  updateEntry(), deleteEntry(), readEntryHistory() with unexisting repository should throw error
    Given configurationServiceScalecube with following <methods>
          |<methods>       |
          |createEntry     |
          |readEntry       |
          |updateEntry     |
          |deleteEntry     |
          |readEntryHistory|
    And   configurationServiceScalecube is created with a valid token
    And   an existing repository
    When  user calls one of the methods with unexisting repository name
    Then  user receives an error

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
    Then  user receives an error that the key is not provided

Scenario: Call createEntry(), readEntry(),  updateEntry(), deleteEntry(), readEntryHistory()  with unexisting key should throw error
    Given configurationServiceScalecube with following <methods>
          |<methods>       |
          |createEntry     |
          |readEntry       |
          |updateEntry     |
          |deleteEntry     |
          |readEntryHistory|
    And   configurationServiceScalecube is created with a valid token
    And   an existing repository
    When  user calls one of the methods by providing an unexisting key in the request
    Then  user receives an error 

Scenario: createRepository() providing an existing repository name should return error
  Given ConfigurationServiceScalecube with createRepository method
  And   an existing  repository A with apiKey B
  When  user calls createRepository method providing an existing name of repository in the request
  Then  user receives an error that the repository already exists

Scenario: createEntry() with a key that exists in the repository
  Given configurationServiceScalecube with createEntry method
  And   an existing repository A with apiKey B
  And   an entry with key: X and value: Y 
  When  user calls createEntry method with key: X and value: Y 
  Then  user receives an error 
  
Scenario: Call readEntry() with a valid version that doesn't exists
  Given  ConfigurationServiceScalecube with readList method
  And    an existing repository containing an entry with key:X and version:1
  When   user calls readEntry method with key:X,  the name of this repository and version:2
  Then   "Requested version does not exists" error message will be returned 
