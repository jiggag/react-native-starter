module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['.'],
        extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
        alias: {
          '@components': './src/components',
          '@actions': './src/actions',
          '@reducers': './src/reducers',
          '@sagas': './src/sagas',
          '@utils': './utils',
        },
      },
    ],
  ],
};
