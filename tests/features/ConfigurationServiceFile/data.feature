
Scenario: entries() should return all values and keys
  Given  ConfigurationServiceFile with entries method
  And    an existing file
  And    an existing repository containing several entries
  When   user calls entries method with valid request and with the name of this repository
  Then   user receives all values with their keys from the repository

Scenario: fetch() should return value by key
  Given  ConfigurationServiceFile with fetch method
  And    an existing file
  And    an existing repository containing an entry with key:X
  When   user calls fetch method with key:X and the name of this repository
  Then   user receives the key:X with its value from the repository
