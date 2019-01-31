
Scenario: New instance of service should throw 'tokenNotProvided' error
    Given configurationServiceLocalStorage
    When  user create configurationServiceLocalStorage
    And   token is not provided
    Then  user receives an error that token is not provided

Scenario: New instance should return 'repositoryNotProvided' error
    Given configurationServiceLocalStorage is created with a valid token
    And   configurationServiceLocalStorage with following methods
          |methods         |
          |createRepository|
          |delete          |
          |entries         |
          |fetch           |
          |save            |
    When  user calls one of the methods
    And   user does not provide repository name in the request
    Then  user receives an error that the repository name is not provided

Scenario: Call delete(), fetch(), entries() and save() with unexisting repository should return 'Configuration repository is not found' error
    Given configurationServiceLocalStorage with following methods
          |methods         |
          |delete          |
          |fetch           |
          |save            |
          |entries         |
    And   configurationServiceLocalStorage is created with a valid token
    And   an existing repository
    When  user calls one of the methods with unexisting repository name
    Then  user receives an error 'Configuration repository is not found'

Scenario: Call fetch() and save() without providing key should return 'repositoryKeyNotProvided' error
    Given configurationServiceLocalStorage with following methods
          |methods         |
          |fetch           |
          |save            |
    And   configurationServiceLocalStorage is created with a valid token
    And   an existing repository
    When  user calls one of the methods by providing repository name and without any key
    Then  user receives an error that the key is not provided

Scenario: Call delete(), fetch()  with unexisting key should return 'Configuration repository key not found' error
    Given configurationServiceLocalStorage with following methods
          |methods         |
          |delete          |
          |fetch           |
    And   configurationServiceLocalStorage is created with a valid token
    And   an existing repository
    When  user calls one of the methods by providing an unexisting key
    Then  user receives an error 'Configuration repository key not found'

Scenario: delete() without key should delete configuration repository
          Calling entries method afterwards will throw an error
    Given configurationServiceLocalStorage with delete method
    And   configurationServiceLocalStorage is created with a valid token
    And   an existing repository containing an entry with key:X
    And   user calls delete method by providing repository name and without any key
    And   repository is deleted
    When  user calls entries method with the name of the repository that was deleted
    Then  user receives an error 'Configuration repository is not found'

