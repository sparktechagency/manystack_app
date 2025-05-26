import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import InvoiceDetails from '../components/Invoice/InvoiceDetails';
import ForgetPassword from '../screens/auth/ForgetPassword';
import Login from '../screens/auth/Login';
import NewPassword from '../screens/auth/NewPassword';
import Otp from '../screens/auth/Otp';
import SignUp from '../screens/auth/SignUp';
import CreateExpenses from '../screens/stacks/CreateExpenses';
import CreateIntervention from '../screens/stacks/CreateIntervention';
import CreateInvoice from '../screens/stacks/CreateInvoice';
import InterventionDetails from '../screens/stacks/InterventionDetails';
import Profile from '../screens/stacks/Profile';
import UpdateExpenses from '../screens/stacks/UpdateExpenses';
import UpdateIntervention from '../screens/stacks/UpdateIntervention';
import UpdateInvoice from '../screens/stacks/UpdateInvoice';
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
      <Stack.Screen
        name="CreateIntervention"
        component={CreateIntervention}
        options={{
          headerShown: true,
          title: 'Create Intervention',
          headerTitleAlign: 'center',
          headerBackground: () => null,
        }}
      />
      <Stack.Screen
        name="UpdateIntervention"
        component={UpdateIntervention}
        options={{
          headerShown: true,
          title: 'Update Intervention',
          headerTitleAlign: 'center',
          headerBackground: () => null,
        }}
      />
      <Stack.Screen
        name="CreateExpenses"
        component={CreateExpenses}
        options={{
          headerShown: true,
          title: 'Create Expenses',
          headerTitleAlign: 'center',
          headerBackground: () => null,
        }}
      />
      <Stack.Screen
        name="UpdateExpenses"
        component={UpdateExpenses}
        options={{
          headerShown: true,
          title: 'Update Expenses',
          headerTitleAlign: 'center',
          headerBackground: () => null,
        }}
      />
      <Stack.Screen
        name="InterventionDetails"
        component={InterventionDetails}
        options={{
          headerShown: true,
          title: 'Details',
          headerTitleAlign: 'center',
          headerBackground: () => null,
        }}
      />
      <Stack.Screen
        name="InvoiceDetails"
        component={InvoiceDetails}
        options={{
          headerShown: true,
          title: 'Details',
          headerTitleAlign: 'center',
          headerBackground: () => null,
        }}
      />
      <Stack.Screen
        name="CreateInvoice"
        component={CreateInvoice}
        options={{
          headerShown: true,
          title: 'Create Invoice',
          headerTitleAlign: 'center',
          headerBackground: () => null,
        }}
      />
      <Stack.Screen
        name="UpdateInvoice"
        component={UpdateInvoice}
        options={{
          headerShown: true,
          title: 'Update Invoice',
          headerTitleAlign: 'center',
          headerBackground: () => null,
        }}
      />
      <Stack.Screen
        name="EditProfile"
        component={Profile}
        options={{
          headerShown: true,
          title: 'Edit Profile',
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
