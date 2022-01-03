module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  env: {
    development: {
      plugins: [['babel-plugin-styled-components', { displayName: true }]],
    },
    production: {
      plugins: ['transform-remove-console'],
    },
  },
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
          '@utils': './src/utils',
          '@services': './src/services',
        },
      },
    ],
    'react-native-reanimated/plugin',
  ],
};
