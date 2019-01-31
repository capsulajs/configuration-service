Feature: Data tests for the ConfigurationServiceLocalStorage
Background:
  Given ConfigurationServiceLocalStorage is created with a valid token

Scenario: createRepository() should create configuration repository
  Given ConfigurationServiceLocalStorage with createRepository method
  When  user calls createRepository method by providing the token and the name of repository
  Then  a new empty repository is created with the provided name

Scenario: delete() should return empty object and delete configuration repository key
  Given  ConfigurationServiceLocalStorage with delete method
  And    an existing repository containing an entry with key:X
  When   user calls delete method with key:X and the name of this repository
  Then   the entry with key:X is deleted from the repository

Scenario: entries() should return all values and keys
  Given  ConfigurationServiceLocalStorage with entries method
  And    an existing repository containing several entries
  When   user calls entries method with valid request and with the name of this repository
  Then   user receives all values with their keys from the repository

Scenario: fetch() should return value by key
  Given  ConfigurationServiceLocalStorage with fetch method
  And    an existing repository containing an entry with key:X
  When   user calls fetch method with key:X and the name of this repository
  Then   user receives the key:X with its value from the repository

 Scenario: save() should persist value by key
   Given configurationServiceLocalStorage with save method
   And   an existing repository
   When  user calls save method with key: X and value: Y and the name of this repository
   Then  specific entry (key and the value) is saved in the repository

 Scenario: Call save() providing an existing key
   Given configurationServiceLocalStorage with save method
   And   an existing repository
   And   an entry with key: X and value: Y is already saved
   When  user calls save method with key: X and value: Y and the name of this repository
   Then  the existing entry (key and the value) is rewritten and saved in the repository
