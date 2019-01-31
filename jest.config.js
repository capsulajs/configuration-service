module.exports = {
  setupFiles: [
    'jest-localstorage-mock'
  ],
  transform: {
    '\\.ts$': 'ts-jest'
  },
  testRegex: '.*\\.test\\.ts$',
  moduleFileExtensions: [
    'ts',
    'js'
  ],
  moduleDirectories: [
    'src',
    'node_modules'
  ],
  testEnvironment: 'node'
};
