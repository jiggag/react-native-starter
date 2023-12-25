module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    'dynamic-import-node',
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
        alias: {
          'components': './src/components',
          'screens': './src/screens',
          'constants': './src/constants',
        },
      },
    ]
  ],
};
