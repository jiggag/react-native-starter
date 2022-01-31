module.exports = {
  preset: 'react-native',
  moduleFileExtensions: [
    'ts',
    'tsx',
    'js',
    'jsx',
  ],
  setupFiles: [
    '<rootDir>/__tests__/setup.ts',
  ],
  globals: {
    window: {}
  },
  transformIgnorePatterns: [
    'node_modules/(?!@react-native|react-native)'
  ],
  testRegex: '__tests__/.*\\.test\\.(tsx|ts)$'
};
