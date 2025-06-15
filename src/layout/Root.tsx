import { NavigationContainer } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { StatusBar, useColorScheme } from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { Provider } from 'react-redux';
import GlobalContextProvider from '../providers/GlobalContextProvider';
import { store } from '../redux/store';
import DrawerLayout from './DrawerLayout';

const Root = () => {
  const isDarkMode = useColorScheme() === 'dark';

  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <NavigationContainer>
      <StatusBar
        barStyle={isDarkMode ? 'dark-content' : 'light-content'}
        backgroundColor={isDarkMode ? Colors.lighter : Colors.darker}
      />
      <Provider store={store}>
        <GlobalContextProvider>
          <DrawerLayout />
        </GlobalContextProvider>
      </Provider>
    </NavigationContainer>
  );
};

export default Root;
