Feature: Errors tests for the ConfigurationServiceScalecube

Scenario: New instance of service should throw 'tokenNotProvided' error
    Given configurationServiceScalecube
    When  user create configurationServiceScalecube
    And   token is not provided
    Then  user receives an error that token is not provided

Scenario: New instance should return 'repositoryNotProvided' error
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

Scenario: Call deleteEntry(), readEntry(), readList() and createEntry() with unexisting repository should return 'Configuration repository is not found' error
    Given configurationServiceScalecube with following <methods>
          |<methods>        |
          |deleteEntry      |
          |readEntry        |
          |createEntry      |
          |readList         |
          |readEntryHistory |
    And   configurationServiceScalecube is created with a valid token
    And   an existing repository
    When  user calls one of the methods with unexisting repository name
    Then  user receives an error 'Configuration repository is not found'

Scenario: Call readEntry(), createEntry() readEntryHistory() and without providing key should return 'repositoryKeyNotProvided' error
    Given configurationServiceScalecube with following <methods>
          |<methods>       |
          |readEntry       |
          |createEntry     |
          |readEntryHistory|
    And   configurationServiceScalecube is created with a valid token
    And   an existing repository
    When  user calls one of the methods by providing repository name and without any key
    Then  user receives an error that the key is not provided

Scenario: Call deleteEntry(), readEntry()  with unexisting key should return 'Configuration repository key not found' error
    Given configurationServiceScalecube with following <methods>
          |<methods>        |
          |deleteEntry      |
          |readEntry        |
          |readEntryHistory |
    And   configurationServiceScalecube is created with a valid token
    And   an existing repository
    When  user calls one of the methods by providing an unexisting key
    Then  user receives an error 'Configuration repository key not found'

Scenario: deleteEntry() without key should delete configuration repository
          Calling readList method afterwards will throw an error
    Given configurationServiceScalecube with deleteEntry method
    And   configurationServiceScalecube is created with a valid token
    And   an existing repository containing an entry with key:X
    And   user calls deleteEntry method by providing repository name and without any key
    And   repository is deleted
    When  user calls readList method with the name of the repository that was deleted
    Then  user receives an error 'Configuration repository is not found'

Scenario: createRepository() providing an existing repository name should return 'repositoryAlreadyExists' error
  Given ConfigurationServiceScalecube with createRepository method
  And   an existing repository
  When  user calls createRepository method by providing the token and the existing name of repository
  Then  user receives an error that the repository already exists

Scenario: createEntry() with a key that exists in the repository
  Given configurationServiceScalecube with createEntry method
  And   an existing repository
  And   an entry with key: X and value: Y that is existing in the repository
  When  user calls createEntry method with key: X and value: Y and the name of this repository
  Then  user receives an error //to confirm

Scenario: Call updateEntry() with a key that is not in the repository
  Given configurationServiceScalecube with updateEntry method
  And   an existing repository
  And   an entry with key: X and value: Y that is not existing in the repository
  When  user calls updateEntry method with key: X and value: Y and the name of this repository
  Then  user receives an error 'Configuration repository key not found'

Scenario: Call readEntry() with invalid version
  Given  ConfigurationServiceScalecube with readEntry method
  And    an existing repository containing an entry with key:X
  When   user calls readEntry method with key:X and the name of this repository and following <version>
          |<version> |
          | 0        |
          |{}        |
          |{ test: 'test' }|
          |[]        |
          |['test']  |
          |true      |
          |false     |
          |-1        |
  Then   relevant error message will be returned
  
Scenario: Call readList() with invalid version
  Given  ConfigurationServiceScalecube with readEntry method
  And    an existing repository containing several entries
  When   user calls readList method with the name of this repository and following <version>
          |<version> |
          | 0        |
          |{}        |
          |{ test: 'test' }|
          |[]        |
          |['test']  |
          |true      |
          |false     |
          |-1        |
  Then   relevant error message will be returned
  
Scenario: Call readEntry() with a valid version that doesn't exists
  Given  ConfigurationServiceScalecube with readList method
  And    an existing repository containing an entry with key:X and version:1
  When   user calls readEntry method with key:X,  the name of this repository and version:2
  Then   "Requested version does not exists" error message will be returned 
