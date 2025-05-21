import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar, useColorScheme, StyleSheet } from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import GlobalContextProvider from '../providers/GlobalContextProvider';
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
      <GlobalContextProvider>
        <DrawerLayout />
      </GlobalContextProvider>
    </NavigationContainer>
  );
};

export default Root;

const styles = StyleSheet.create({});
