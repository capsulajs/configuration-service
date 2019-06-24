Feature: Data tests for the ConfigurationServiceScalecube
Background:
  Given ConfigurationServiceScalecube is created with a valid token

Scenario: createRepository() should create configuration repository
  Given ConfigurationServiceScalecube with createRepository method
  When  user calls createRepository method by providing the token and the name of repository
  Then  a new empty repository is created with the provided name

Scenario: deleteEntry() should return empty object and delete configuration repository key
  Given  ConfigurationServiceScalecube with deleteEntry method
  And    an existing repository containing an entry with key:X
  When   user calls deleteEntry method with key:X and the name of this repository
  Then   the entry with key:X is deleted from the repository

Scenario: readList() should return all values and keys
  Given  ConfigurationServiceScalecube with readList method
  And    an existing repository containing several entries with version:1
  When   user calls readList method with the version:1 and the name of this repository
  Then   user receives all the entries with values and their keys from the repository of the version:1

Scenario: readEntry() should return value by key
  Given  ConfigurationServiceScalecube with readEntry method
  And    an existing repository containing an entry with key:X and version:1
  When   user calls readEntry method with key:X and version:1 and the name of this repository
  Then   user receives an entry of version:1 with key:X and its value from the repository

 Scenario: createEntry() should persist value by key
   Given configurationServiceScalecube with createEntry method
   And   an existing repository
   When  user calls createEntry method with key: X and value: Y and the name of this repository
   Then  entry with key: X, value: Y and {version:1} is saved in the repository

 Scenario: Call updateEntry() should update existing entry
   Given configurationServiceScalecube with updateEntry method
   And   an existing repository
   And   an entry with key: X and value: Y is already saved
   When  user calls updateEntry method with key: X and value: Z and the name of this repository
   Then  the existing entry is updated with value Z
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

Scenario: Call readList() without specifying the vesion
  Given  ConfigurationServiceScalecube with readList method
  And    an existing repository containing several entries
  When   user calls readList method with the name of this repository and without specifying the vesion
  Then   user receives all the entries of the latest version with values and their keys from the repository

Scenario: Call readList() with a valid version that doesn't exists
  Given  ConfigurationServiceScalecube with readList method
  And    an existing repository containing several entries with version:1
  When   user calls readList method with the name of this repository and version:2
  Then   user receives all the entries of version:1 with values and their keys from the repository

Scenario:Call readEntry() without specifying the vesion
  Given  ConfigurationServiceScalecube with readEntry method
  And    an existing repository containing an entry with key:X and version:1
  When   user calls readEntry method with key:X,  the name of this repository and version:2
  Then   user receives an entry of version:1 with key:X and its value from the repository
