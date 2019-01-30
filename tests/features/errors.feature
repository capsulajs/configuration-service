
Scenario: createRepository() should return 'Configuration repository token not provided' error
	Given configurationServiceLocalStorage with createRepository method
	When  user calls createRepository method
	And   repository token is not provided
	Then  user receives an error 'Configuration repository token not provided'

Scenario: createRepository() should return 'Configuration repository not provided' error
	Given configurationServiceLocalStorage with createRepository method
	When  user calls createRepository method
	And   repository name is not provided
	Then  user receives an error 'Configuration repository not provided'

Scenario: delete() should return 'Configuration repository is not found' error
	Given configurationServiceLocalStorage with delete method
	And   repository is not created
	When  user calls delete method providing the name of unexisting repository
	Then  user receives an error 'Configuration repository is not found'

Scenario: delete() should return 'Configuration repository key not found' error
	Given configurationServiceLocalStorage with delete method
	And   an existing repository
	When  user calls delete method without providing the key
	Then  user receives an error 'Configuration repository key not found'

Scenario: fetch() should return 'Configuration repository is not found' error
	Given configurationServiceLocalStorage with fetch method
	And   repository is not created
	When  user calls fetch method providing the name of unexisting repository
	Then  user receives an error 'Configuration repository is not found'

Scenario: fetch() should return 'Configuration repository key not found' error
	Given configurationServiceLocalStorage with fetch method
	And   an existing repository
	When  user calls fetch method without providing the key
	Then  user receives an error 'Configuration repository key not found'

Scenario: save() should return 'Configuration repository is not found' error
	Given configurationServiceLocalStorage with save method
	And   repository is not created
	When  user calls save method providing the name of unexisting repository
	Then  user receives an error 'Configuration repository is not found'

Scenario: save() should return 'Configuration repository key not found' error
	Given configurationServiceLocalStorage with save method
	And   an existing repository
	When  user calls save method without providing the key
	Then  user receives an error 'Configuration repository key not found'
