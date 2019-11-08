Feature: Errors tests for the ConfigurationServiceScalecube

  Scenario: Create new instance of service without providing a token should throw an error
    Given configurationServiceScalecube
    When  user creates new configurationServiceScalecube instance
    And   token is not provided
    Then  user receives 'tokenNotProvided' error

 #readEntryHistory should be left for future implementation
  Scenario: Call any method from configurationServiceScalecube without repository in the request - error is thrown
    Given configurationServiceScalecube is created with a valid token
    And   configurationServiceScalecube with following <methods>
      | <methods>        |
      | createRepository |
      | delete           |
      | entries          |
      | fetch            |
      | save             |
      | readEntryHistory |
    When  user calls each of the methods
    And   user doesn't provide repository name in the request
    Then  user receives 'repositoryNotProvided' error

 #readEntryHistory should be left for future implementation
  Scenario: Call entries(), fetch(), save(), delete(), readEntryHistory() with non-existent repository should throw error
    Given configurationServiceScalecube with following <methods>
      | <methods>        |
      | entries          |
      | fetch            |
      | save             |
      | delete           |
      | readEntryHistory |
    And   configurationServiceScalecube is created with a valid token
    And   an existing repository A
    When  user calls each of the methods with repository B
    Then  user receives 'getRepositoryNotFoundErrorMessage' error

 #readEntryHistory should be left for future implementation
  Scenario: Call fetch(), save(), delete(), readEntryHistory() without providing key should throw error
    Given configurationServiceScalecube with following <methods>
      | <methods>        |
      | save             |
      | fetch            |
      | delete           |
      | readEntryHistory |
    And   configurationServiceScalecube is created with a valid token
    And   an existing repository
    When  user calls each of the methods without providing the key in the request
    Then  user receives 'repositoryKeyNotProvided' error

 #readEntryHistory should be left for future implementation
  Scenario: Call fetch(), save(), delete(), readEntryHistory() with non-existent key should throw error
    Given configurationServiceScalecube with following <methods>
      | <methods>        |
      | save             |
      | fetch            |
      | delete           |
      | readEntryHistory |
    And   configurationServiceScalecube is created with a valid token
    And   an existing repository A with apiKey B
    When  user calls each of the methods with apiKey C in the request
    Then  user receives 'getRepositoryKeyNotFoundErrorMessage' error

  Scenario: createRepository() providing an existing repository name should return error
    Given ConfigurationServiceScalecube with createRepository method
    And   an existing  repository A with apiKey B
    When  user calls createRepository method repository A in the request
    Then  user receives'repositoryAlreadyExists' error

  Scenario: Call createEntry() with request, that is not an object, is rejected with an error
    Given  ConfigurationServiceScalecube with createEntry method
    When   user calls createEntry method with following <request>
          | <request> |
          | ''        |
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
    Given  ConfigurationServiceScalecube with createEntry method
    And    an entry with key: X and value Z that does not exist
    When   user calls createEntry method with key: X, value Z and with following <repository>
          | <repository>  |
          | ''        |
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
    Given  ConfigurationServiceScalecube with createEntry method
    And    an existing repository A
    When   user calls createEntry method with repository: A, value: Z and with following <key>
          | <key>  |
          | ''        |
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

  Scenario: Call createEntry() with a valid request and there is a server error - promise is rejected with an error
    Given configurationServiceScalecube with createEntry method
    And   an existing repository A
    And   an entry with key: X does not exist
    When  user calls create method with key: X and the following request
         | <parameter> | <type>   |
         | repository  | string   |
         | value       | JsonNode |
         | key         | string   |
    And   key:X and value:Z
    And   a server error occurs
    Then  'Server error' is returned

  Scenario: Call updateEntry() with request, that is not an object, is rejected with an error
    Given  ConfigurationServiceScalecube with updateEntry method
    When   user calls updateEntry method with following <request>
          | <request> |
          | ''        |
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
    Given  ConfigurationServiceScalecube with updateEntry method
    And    an entry with key: X and value: Y is already saved
    When   user calls updateEntry method with key: X, value Z and with following <repository>
          | <repository>  |
          | ''        |
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
    Given  ConfigurationServiceScalecube with updateEntry method
    And    an existing repository A
    When   user calls updateEntry method with repository:a, value:Z and with following <key>
          | <key>  |
          | ''        |
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

  Scenario: Call updateEntry() with a valid request and there is a server error - promise is rejected with an error
    Given configurationServiceScalecube with updateEntry method
    And   an existing repository A
    And   an entry with key: X and value: Y is already saved
    When  user calls save method with key: X and the following request
         | <parameter> | <type>   |
         | repository  | string   |
         | value       | JsonNode |
         | key         | string   |
    And   key:X and value:Z
    And   a server error occurs
    Then  'Server error' is returned

#for future implementation
  Scenario: Call fetch() with a valid version that doesn't exists
    Given  ConfigurationServiceScalecube with fetch method
    And    an existing repository containing an entry with key:X and version:1
    When   user calls fetch method with key:X,  the name of this repository and version:2
    Then   `Key 'X' version '2' not found` error message will be returned