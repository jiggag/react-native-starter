module.exports = {
  preset: "react-native",
  moduleFileExtensions: [
    "ts",
    "tsx",
    "js",
    "jsx",
  ],
  setupFiles: [],
  globals: {
    __DEV__: false,
    window: {}
  },
  transformIgnorePatterns: [
    "node_modules/(?!@react-native|react-native)"
  ],
  testRegex: '__tests__/.*\\.test\\.(tsx|ts)$'
};
