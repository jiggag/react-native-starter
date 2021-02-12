import { AppRegistry } from 'react-native';
import codePush from 'react-native-code-push';
import { name as appName } from './app.json';
import App from './src';

const codePushConfig = {
  checkFrequency: codePush.CheckFrequency.ON_APP_RESUME,
  installMode: codePush.InstallMode.ON_NEXT_RESUME,
  minimumBackgroundDuration: 60 * 3,
};
AppRegistry.registerComponent(appName, () => codePush(codePushConfig)(App));
