import { AppRegistry } from 'react-native';
import { init as SentryInit } from '@sentry/react-native';
import App from './src';
import { name as appName } from './app.json';
import { SENTRY_DSN } from './utils/Constants';

if (SENTRY_DSN) {
  SentryInit({
    dsn: SENTRY_DSN,
  });
}

AppRegistry.registerComponent(appName, () => App);
