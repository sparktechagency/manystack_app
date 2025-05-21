import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { StyleSheet } from 'react-native';
import ForgetPassword from '../screens/auth/ForgetPassword';
import Login from '../screens/auth/Login';
import NewPassword from '../screens/auth/NewPassword';
import Otp from '../screens/auth/Otp';
import SignUp from '../screens/auth/SignUp';
import TabLayout from './TabLayout';
const Stack = createNativeStackNavigator();
const StackLayout = () => {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen
        options={{ headerShown: true, title: 'Login', headerTitleAlign: 'center', headerBackground: () => null, }}
        name="Login"
        component={Login}
      />
      <Stack.Screen
        options={{ headerShown: true, title: 'Create Account', headerTitleAlign: 'center', headerBackground: () => null, }}
        name="SignUp"
        component={SignUp}
      />
      <Stack.Screen
        options={{ headerShown: true, title: 'Forget Password', headerTitleAlign: 'center', headerBackground: () => null, }}
        name="Forget"
        component={ForgetPassword}
      />
      <Stack.Screen
        options={{ headerShown: true, title: 'Verify Code', headerTitleAlign: 'center', headerBackground: () => null, }}
        name="Otp"
        component={Otp}
      />
      <Stack.Screen
        options={{ headerShown: true, title: 'Verify Code', headerTitleAlign: 'center', headerBackground: () => null, }}
        name="NewPassword"
        component={NewPassword}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="Tabs"
        component={TabLayout}
      />
    </Stack.Navigator>
  );
};

export default StackLayout;

const styles = StyleSheet.create({});
