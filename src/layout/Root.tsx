import { NavigationContainer } from '@react-navigation/native'
import React, { useEffect } from 'react'
import { StatusBar, StyleSheet, useColorScheme } from 'react-native'
import SplashScreen from 'react-native-splash-screen'
import { Colors } from 'react-native/Libraries/NewAppScreen'
import StackLayout from './StackLayout'
const Root = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };
  useEffect(() => {
    SplashScreen.hide()
  }, [])

  return (
    <NavigationContainer>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <StackLayout />
    </NavigationContainer>
  )
}

export default Root

const styles = StyleSheet.create({})