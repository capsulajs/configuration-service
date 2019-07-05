Feature: Data tests for the ConfigurationServiceScalecube
Background:
  Given ConfigurationServiceScalecube is created with a valid token

Scenario: createRepository() should create configuration repository
  Given ConfigurationServiceScalecube with createRepository method
  When  user calls createRepository method with the following parameters 
          |<parameter>|<type> |
          |apiKey     | object|
          |repository | string|
  Then  a new empty repository is created with the provided apiKey and repository name

Scenario: deleteEntry() should return empty object and delete the entry from repository
  Given  ConfigurationServiceScalecube with deleteEntry method
  And    an existing repository A and apiKey B
  And    an entry with key:X
  When   user calls deleteEntry method with the following request
          |<parameter>|<type>  |
          |apiKey     | object |
          |repository | string |
          |key        | string |
  Then   the entry with key:X is deleted from repository A

Scenario: readEntry() should return entry by key
  Given  ConfigurationServiceScalecube with readEntry method
  And    an existing repository A and apiKey B
  And    an entry with key:X and version:1
  When   user calls readEntry method with the following request
          |<parameter>|<type>  |
          |apiKey     | object |
          |repository | string |
          |version    | number |
          |key        | string |
  Then   user receives an entry of version:1 with key:X and its value from repository A

Scenario: Call readEntry() with empty version returns the latest version
  Given  ConfigurationServiceScalecube with readEntry method
  And    an existing repository containing an entry with key:X and version:1
  When   user calls readEntry method with key:X,  the name of this repository and empty version
  Then   user receives an entry of version:1 with key:X and its value from the repository
  
 Scenario: createEntry() should persist value by key
   Given configurationServiceScalecube with createEntry method
   And    an existing repository A and apiKey B
   When   user calls createEntry method with the following request
          |<parameter>|<type>  |
          |apiKey     | object |
          |repository | string |
          |value      |JsonNode|
          |key        | string |
   Then  an entry with the provided key and value and {version:1} is saved in repository A 

 Scenario: Call updateEntry() should update existing entry
   Given configurationServiceScalecube with updateEntry method
   And   an existing repository A with apiKey B
   And   an entry with key: X and value: Y is already saved
   When   user calls updateEntry method with the following request
          |<parameter>|<type>  |
          |apiKey     | object |
          |repository | string |
          |value      |JsonNode|
          |key        | string |
   And   key:X and value:Z
   Then  the entry with key X is updated with value Z
   And   version is increased by 1

 Scenario: Call readEntryHistory() should return all the history for a specific key
  Given  ConfigurationServiceScalecube with readEntryHistory method
  And    an existing repository containing the following entries with <key> and <version>
         |<key> |<version>|
         |X     | 1 |
         |X     | 2 |
         |X     | 3 |
  When   user calls readEntryHistory method with key:X and the name of this repository
  Then   user receives all the history for key:X and its value from the repository

Scenario: readList() should return all  entries(keys/values)
  Given  ConfigurationServiceScalecube with readList method
  And    an existing repository A and apiKey B
  And    several entries with version:1
  When   user calls readList method with the following request
          |<parameter>|<type>  |
          |apiKey     | object |
          |repository | string |
          |version    | number |
  Then   user receives all the entries of the version:1 with values and their keys from repository A
  
Scenario: Call readList() without specifying the vesion returns the latest version
  Given  ConfigurationServiceScalecube with readList method
  And    an existing repository containing several entries
  When   user calls readList method with the name of this repository and without specifying the vesion
  Then   user receives all the entries of the latest version with values and their keys from the repository

Scenario: Call readList() with a valid version that doesn't exists
  Given  ConfigurationServiceScalecube with readList method
  And    an existing repository containing several entries with version:1
  When   user calls readList method with the name of this repository and version:2
  Then   user receives  an empty array

