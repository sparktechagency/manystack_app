import { AppRegistry } from 'react-native';
import 'react-native-reanimated';
import { name as appName } from './app.json';
import Root from './src/layout/Root';

AppRegistry.registerComponent(appName, () => Root);
