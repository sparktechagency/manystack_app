import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { StyleSheet } from 'react-native';
import ForgetPassword from '../screens/auth/ForgetPassword';
import Login from '../screens/auth/Login';
import SignUp from '../screens/auth/SignUp';
import TabLayout from './TabLayout';
const Stack = createNativeStackNavigator();
const StackLayout = () => {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen
        options={{ headerShown: false }}
        name="Login"
        component={Login}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="SignUp"
        component={SignUp}
      />
      <Stack.Screen
        options={{ headerShown: true, title: 'Forget Password', headerTitleAlign: 'center', headerBackground: () => null, }}
        name="Forget"
        component={ForgetPassword}
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
