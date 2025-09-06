import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { StatusBar, useColorScheme } from 'react-native';
import { KeyboardProvider } from 'react-native-keyboard-controller';
import Toast from 'react-native-toast-message';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { Provider } from 'react-redux';
import GlobalContextProvider from '../providers/GlobalContextProvider';
import { store } from '../redux/store';
import DrawerLayout from './DrawerLayout';
const Root = () => {

  const isDarkMode = useColorScheme() === 'dark';

  return (
    <KeyboardProvider>
      <NavigationContainer>
        <StatusBar barStyle="dark-content" backgroundColor={Colors.lighter} />
        <Provider store={store}>
          <GlobalContextProvider>
            <DrawerLayout />
            <Toast />
          </GlobalContextProvider>
        </Provider>
      </NavigationContainer>
    </KeyboardProvider>
  );
};

export default Root;
