Feature: Data tests for the ConfigurationServiceScalecube

  Background:
    Given ConfigurationServiceScalecube is created with a valid token

  Scenario: createRepository() should create configuration repository
    Given ConfigurationServiceScalecube with createRepository method
    When  user calls createRepository method with the following request
      | <parameter> | <type> |
      | repository  | string |
    Then  a new empty repository is created with the provided repository name

  Scenario: delete() should return empty object and delete the entry from repository
    Given  ConfigurationServiceScalecube with delete method
    And    an existing repository A
    And    an entry with key:X
    When   user calls delete method with the following request
      | <parameter> | <type> |
      | repository  | string |
      | key         | string |
    Then   the entry with key:X is deleted from repository A

  Scenario: fetch() should return an entry from repository
    Given  ConfigurationServiceScalecube with fetch method
    And    an existing repository A
    And    an entry with key:X and version:1
    When   user calls fetch method with the following request
      | <parameter> | <type> |
      | repository  | string |
      | version     | number |
      | key         | string |
    Then   user receives an entry of version:1 with key:X and its value from repository A

  Scenario: entries() should return a list with all entries from repository
    Given  ConfigurationServiceScalecube with entries method
    And    an existing repository A
    And    several entries with version:1
    When   user calls entries method with the following request
      | <parameter> | <type> |
      | repository  | string |
      | version     | number |
    Then   user receives all the entries of the version:1 with values and their keys from repository A

  Scenario: Call save() with new key should create a new entry
    Given configurationServiceScalecube with save method
    And   an existing repository A without entries
    When  user calls save method with the following request
      | <parameter> | <type>   |
      | repository  | string   |
      | value       | JsonNode |
      | key         | string   |
    Then  an entry with the provided key and value and {version:1} is saved in repository A

  Scenario: Call save() with an existing key should update the relevant entry
    Given configurationServiceScalecube with updateEntry method
    And   an existing repository A
    And   an entry with key: X and value: Y is already saved
    When  user calls save method with key: X and the following request
      | <parameter> | <type>   |
      | repository  | string   |
      | value       | JsonNode |
      | key         | string   |
    And   key:X and value:Z
    Then  the entry with key X is updated with value Z
    And   version is increased by 1

#for future implementation
  Scenario: Call fetch() with empty version returns the latest version
    Given  ConfigurationServiceScalecube with fetch method
    And    an existing repository containing an entry with key:X and version:1
    When   user calls fetch method with key:X,  the name of this repository and empty version
    Then   user receives an entry of version:1 with key:X and its value from the repository

  Scenario: Call readEntryHistory() should return all the history for a specific key
    Given  ConfigurationServiceScalecube with readEntryHistory method
    And    an existing repository containing the following entries with <key> and <version>
      | <key> | <version> |
      | X     | 1         |
      | X     | 2         |
      | X     | 3         |
    When   user calls readEntryHistory method with key:X and the name of this repository
    Then   user receives all the history for key:X and its value from the repository

  Scenario: Call entries() without specifying the version returns the latest version
    Given  ConfigurationServiceScalecube with entries method
    And    an existing repository containing several entries
    When   user calls entries method with the name of this repository and without specifying the vesion
    Then   user receives all the entries of the latest version with values and their keys from the repository

  Scenario: Call entries() with a valid version that doesn't exists
    Given  ConfigurationServiceScalecube with entries method
    And    an existing repository containing several entries with version:1
    When   user calls entries method with the name of this repository and version:2
    Then   user receives  an empty array

  Scenario: Call createEntry() with a new key should create a new entry
    Given configurationServiceScalecube with createEntry method
    And   an existing repository A
    And   an entry with key: X does not exist
    When  user calls create method with key: X and the following request
      | <parameter> | <type>   |
      | repository  | string   |
      | value       | JsonNode |
      | key         | string   |
    And   key:X and value:Z
    Then  the entry with key X is created with value Z
    And   version equals 1
    And   the promise that is returned from a method call resolves with an empty object

  Scenario: Call updateEntry() with an existing key should update the relevant entry
    Given configurationServiceScalecube with updateEntry method
    And   an existing repository A
    And   an entry with key: X and value: Y is already saved
    When  user calls save method with key: X and the following request
      | <parameter> | <type>   |
      | repository  | string   |
      | value       | JsonNode |
      | key         | string   |
    And   key:X and value:Z
    Then  the entry with key X is updated with value Z
    And   version is increased by 1
    And   the promise that is returned from a method call resolves with an empty object

