
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

Scenario: createRepository() providing an existing repository name should return 'repositoryAlreadyExists' error
  Given ConfigurationServiceLocalStorage with createRepository method
  And   an existing repository
  When  user calls createRepository method by providing the token and the existing name of repository
  Then  user receives an error that the repository already exists

Scenario: Call createEntry() with request, that is not an object, is rejected with an error
  Given  ConfigurationServiceLocalStorage with createEntry method
  When   user calls createEntry method with following <request>
          | <request> |
          | ''        |
          | ' '       |
          | []        |
          | ['test']  |
          | null      |
          | true      |
          | false     |
          | 0         |
          | -1        |
          | undefined |
  Then   `invalidRequest` error message will be returned

Scenario: Call createEntry() with invalid repository is rejected with an error
  Given  ConfigurationServiceLocalStorage with createEntry method
  And    an entry with key: X and value Z that does not exist
  When   user calls createEntry method with key: X, value Z and with following <repository>
          | <repository>  |
          | ''        |
          | ' '       |
          | []        |
          | ['test']  |
          | null      |
          | true      |
          | false     |
          | 0         |
          | -1        |
          | undefined |
          | {}        |
          | { test: 'test' } |
  Then   `invalidRepository` error message will be returned

Scenario: Call createEntry() with invalid key is rejected with an error
  Given  ConfigurationServiceLocalStorage with createEntry method
  And    an existing repository A
  When   user calls createEntry method with repository: A, value: Z and with following <key>
          | <key>     |
          | ''        |
          | ' '       |
          | []        |
          | ['test']  |
          | null      |
          | true      |
          | false     |
          | 0         |
          | -1        |
          | undefined |
          | {}        |
          | { test: 'test' } |
  Then   `invalidKey` error message will be returned

Scenario: Call createEntry() with a non-existent repository is rejected with an error
  Given  ConfigurationServiceLocalStorage with createEntry method
  And    non existing repository B
  When   user calls createEntry method with repository: B, value: Z and with key: X
  Then   `wrongRepository` error message will be returned

Scenario: Call createEntry() for an existing entry should be rejected with an error
  Given  ConfigurationServiceLocalStorage with createEntry method
  And    an existing repository A
  And    an entry with key: X and value: Y is already saved
  When   user calls createEntry method with repository: A, value: Y and with key: X
  Then   `entryAlreadyExist` error message will be returned

Scenario: Call updateEntry() with request, that is not an object, is rejected with an error
  Given  ConfigurationServiceLocalStorage with updateEntry method
  When   user calls updateEntry method with following <request>
          | <request> |
          | ''        |
          | ' '       |
          | []        |
          | ['test']  |
          | null      |
          | true      |
          | false    |
          | 0         |
          | -1        |
          | undefined |
  Then   `invalidRequest` error message will be returned

Scenario: Call updateEntry() with invalid repository is rejected with an error
  Given  ConfigurationServiceLocalStorage with updateEntry method
  And    an entry with key: X and value: Y is already saved
  When   user calls updateEntry method with key: X, value Z and with following <repository>
          | <repository>  |
          | ''        |
          | ' '       |
          | []        |
          | ['test']  |
          | null      |
          | true      |
          | false     |
          | 0         |
          | -1        |
          | undefined |
          | {}        |
          | { test: 'test' } |
  Then   `invalidRepository` error message will be returned

Scenario: Call updateEntry() with invalid key is rejected with an error
  Given  ConfigurationServiceLocalStorage with updateEntry method
  And    an existing repository A
  When   user calls updateEntry method with repository:a, value:Z and with following <key>
          | <key>     |
          | ''        |
          | ' '       |
          | []        |
          | ['test']  |
          | null      |
          | true      |
          | false     |
          | 0         |
          | -1        |
          | undefined |
          | {}        |
          | { test: 'test' } |
  Then   `invalidKey` error message will be returned

Scenario: Call updateEntry() with a non-existent repository is rejected with an error
  Given  ConfigurationServiceLocalStorage with updateEntry method
  And    non existing repository B
  And    an entry with key: X and value: Y is already saved
  When   user calls updateEntry method with repository: B, value:Z and with following key: X
  Then   `wrongRepository` error message will be returned

Scenario: Call updateEntry() for a non-existing entry should be rejected with an error
  Given  ConfigurationServiceLocalStorage with updateEntry method
  And    an existing repository A
  And    an entry with key: X and value: Y doesn't exist
  When   user calls updateEntry method with repository: A, value: Z and with key: X
  Then   `entryDoesNotExist` error message will be returned
  