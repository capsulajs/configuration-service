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
          |<methods>       |
          |createRepository|
          |delete          |
          |entries         |
          |fetch           |
          |save            |
          |readEntryHistory|
   When  user calls each of the methods
   And   user doesn't provide repository name in the request
   Then  user receives 'repositoryNotProvided' error

 #readEntryHistory should be left for future implementation
Scenario: Call entries(), fetch(), save(), delete(), readEntryHistory() with non-existent repository should throw error
   Given configurationServiceScalecube with following <methods>
          |<methods>       |
          |entries         |
          |fetch           |
          |save            |
          |delete          |
          |readEntryHistory|
   And   configurationServiceScalecube is created with a valid token
   And   an existing repository A
   When  user calls each of the methods with repository B
   Then  user receives 'getRepositoryNotFoundErrorMessage' error

 #readEntryHistory should be left for future implementation
Scenario: Call fetch(), save(), delete(), readEntryHistory() without providing key should throw error
   Given configurationServiceScalecube with following <methods>
          |<methods>       |
          |save            |
          |fetch           |
          |delete          |
          |readEntryHistory|
   And   configurationServiceScalecube is created with a valid token
   And   an existing repository
   When  user calls each of the methods without providing the key in the request
   Then  user receives 'repositoryKeyNotProvided' error

 #readEntryHistory should be left for future implementation
Scenario: Call fetch(), save(), delete(), readEntryHistory() with non-existent key should throw error
   Given configurationServiceScalecube with following <methods>
         |<methods>       |
         |save            |
         |fetch           |
         |delete          |
         |readEntryHistory|
   And   configurationServiceScalecube is created with a valid token
   And   an existing repository A with apiKey B
   When  user calls each of the methods with apiKey C in the request
   Then  user receives 'getRepositoryKeyNotFoundErrorMessage' error

Scenario: createRepository() providing an existing repository name should return error
   Given ConfigurationServiceScalecube with createRepository method
   And   an existing  repository A with apiKey B
   When  user calls createRepository method repository A in the request
   Then  user receives'repositoryAlreadyExists' error

#for future implementation
Scenario: Call fetch() with a valid version that doesn't exists
   Given  ConfigurationServiceScalecube with fetch method
   And    an existing repository containing an entry with key:X and version:1
   When   user calls fetch method with key:X,  the name of this repository and version:2
   Then   `Key 'X' version '2' not found` error message will be returned
