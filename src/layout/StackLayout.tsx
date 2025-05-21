import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../screens/auth/Login';
import SignUp from '../screens/auth/SignUp';
import ForgetPassword from '../screens/auth/ForgetPassword';
import Otp from '../screens/auth/Otp';
import NewPassword from '../screens/auth/NewPassword';
import TabLayout from './TabLayout';

const Stack = createNativeStackNavigator();

const StackLayout = () => {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen
        name="Login"
        component={Login}
        options={{
          headerShown: true,
          title: 'Login',
          headerTitleAlign: 'center',
          headerBackground: () => null,
        }}
      />
      <Stack.Screen
        name="SignUp"
        component={SignUp}
        options={{
          headerShown: true,
          title: 'Create Account',
          headerTitleAlign: 'center',
          headerBackground: () => null,
        }}
      />
      <Stack.Screen
        name="Forget"
        component={ForgetPassword}
        options={{
          headerShown: true,
          title: 'Forget Password',
          headerTitleAlign: 'center',
          headerBackground: () => null,
        }}
      />
      <Stack.Screen
        name="Otp"
        component={Otp}
        options={{
          headerShown: true,
          title: 'Verify Code',
          headerTitleAlign: 'center',
          headerBackground: () => null,
        }}
      />
      <Stack.Screen
        name="NewPassword"
        component={NewPassword}
        options={{
          headerShown: true,
          title: 'New Password',
          headerTitleAlign: 'center',
          headerBackground: () => null,
        }}
      />
      {/* Main app tabs */}
      <Stack.Screen
        name="Tabs"
        component={TabLayout}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default StackLayout;
