import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import InvoiceDetails from '../components/Invoice/InvoiceDetails';
import ForgetPassword from '../screens/auth/ForgetPassword';
import Login from '../screens/auth/Login';
import NewPassword from '../screens/auth/NewPassword';
import Otp from '../screens/auth/Otp';
import SignUp from '../screens/auth/SignUp';
import ChangePassword from '../screens/stacks/ChangePassword';
import CreateExpenses from '../screens/stacks/CreateExpenses';
import CreateIntervention from '../screens/stacks/CreateIntervention';
import CreateInvoice from '../screens/stacks/CreateInvoice';
import InterventionCategory from '../screens/stacks/InterventionCategory';
import InterventionDetails from '../screens/stacks/InterventionDetails';
import PrivacyPolicy from '../screens/stacks/PrivacyPolicy';
import Profile from '../screens/stacks/Profile';
import Subscription from '../screens/stacks/Subscription';
import Support from '../screens/stacks/Support';
import TermsAndConditions from '../screens/stacks/TermsAndConditions';
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
      <Stack.Screen
        name="Subscription"
        component={Subscription}
        options={{
          headerShown: true,
          title: 'Subscription',
          headerTitleAlign: 'center',
          headerBackground: () => null,
        }}
      />
      <Stack.Screen
        name="InterventionCategory"
        component={InterventionCategory}
        options={{
          headerShown: true,
          title: 'Intervention Category',
          headerTitleAlign: 'center',
          headerBackground: () => null,
        }}
      />
      <Stack.Screen
        name="Support"
        component={Support}
        options={{
          headerShown: true,
          title: 'Contact Support',
          headerTitleAlign: 'center',
          headerBackground: () => null,
        }}
      />
      <Stack.Screen
        name="ChangePassword"
        component={ChangePassword}
        options={{
          headerShown: true,
          title: 'Change Password',
          headerTitleAlign: 'center',
          headerBackground: () => null,
        }}
      />
      <Stack.Screen
        name="TermsAndConditions"
        component={TermsAndConditions}
        options={{
          headerShown: true,
          title: 'Terms And Conditions',
          headerTitleAlign: 'center',
          headerBackground: () => null,
        }}
      />
      <Stack.Screen
        name="PrivacyPolicy"
        component={PrivacyPolicy}
        options={{
          headerShown: true,
          title: 'Privacy Policy',
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
