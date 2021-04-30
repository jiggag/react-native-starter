module.exports = {
  extends: ['plugin:react-redux/recommended', 'jiggag-rnlint'],
  rules: {
    'react-redux/no-unused-prop-types': 'warn',
    'react-redux/useSelector-prefer-selectors': 'off',
  },
};
