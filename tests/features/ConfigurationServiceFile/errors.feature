
Scenario: New instance of service should throw 'filenameNotProvided' error
    Given configurationServiceFile
    When  user creates configurationServiceFile
    And   user doesn't provide any file name
    Then  user receives an error that file name is not provided

Scenario: New instance of service should throw 'fileOrDirectoryNotExist' error
    Given configurationServiceFile
    When  user creates configurationServiceFile
    And   user provides a file name which does not exist
    Then  user receives an error that file name doesn't exist

Scenario: New instance of service should throw 'fileNotValid' error
    Given configurationServiceFile
    When  user creates configurationServiceFile
    And   user provides a file name which contains invalid configuration
    Then  user receives an error that file is not valid

Scenario: New instance should return 'repositoryNotProvided' error
   Given configurationServiceFile with following methods
          |methods         |
          |entries         |
          |fetch           |
    And   an existing file
    And   an existing repository containing several entries
    When  user calls one of the methods
    And   user does not provide repository name in the request
    Then  user receives an error that the repository name is not provided

Scenario: Call fetch(), entries() with unexisting repository should return 'Configuration repository is not found' error
    Given configurationServiceFile with following methods
          |methods         |
          |fetch           |
          |entries         |
    And   an existing file
    And   an existing repository containing several entries
    When  user calls one of the methods by providing a repository which does not exist in the file
    Then  user receives an error 'Configuration repository is not found'

Scenario: Call fetch() without providing key should return 'repositoryKeyNotProvided' error
    Given ConfigurationServiceFile with fetch method
    And   an existing file
    And   an existing repository containing several entries
    When  user calls fetch method by providing repository name and without any key
    Then  user receives an error that the key is not provided

Scenario: Call fetch()  with unexisting key should return 'Configuration repository key not found' error
    Given ConfigurationServiceFile with fetch method
    And   an existing file
    And   an existing repository containing several entries
    When  user calls fetch method by providing a key which does not exist in the repository
    Then  user receives an error 'Configuration repository key not found'
