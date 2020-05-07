import { AppRegistry } from 'react-native';
import App from './src';
import { name as appName } from './app.json';
import { SENTRY_DSN } from './utils/Constants';

require('react-native').unstable_enableLogBox();

if (SENTRY_DSN) {
  // TODO sentry error tracking
}

AppRegistry.registerComponent(appName, () => App);
