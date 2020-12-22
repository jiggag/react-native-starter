module.exports = {
  preset: 'react-native',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node', 'd.ts'],
  modulePathIgnorePatterns: ['lib', './jest.setup.js'],
  setupFiles: [
    './jest.setup.js',
    './node_modules/react-native-gesture-handler/jestSetup.js',
    './node_modules/react-native-ui-lib/jest-setup.js',
  ],
  transformIgnorePatterns: ['node_modules/(?!(jest-)?react-native|@react-native-community|@react-navigation)'],
  collectCoverageFrom: ['src/**/*.(js|ts|tsx)', '!src/**/*.d.ts'],
  haste: {
    defaultPlatform: 'ios',
    platforms: ['android', 'ios'],
    providesModuleNodeModules: ['react-native'],
  },
};
