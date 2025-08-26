// src/navigation/StackLayout.tsx

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { useGlobalContext } from '../providers/GlobalContextProvider';
import { t } from '../utils/translate';

// Screens & Components
import InvoiceDetails from '../components/Invoice/InvoiceDetails';
import ForgetPassword from '../screens/auth/ForgetPassword';
import Login from '../screens/auth/Login';
import NewPassword from '../screens/auth/NewPassword';
import Otp from '../screens/auth/Otp';
import SignUp from '../screens/auth/SignUp';
import ChangePassword from '../screens/stacks/ChangePassword';
import CreateExpenses from '../screens/stacks/CreateExpenses';
import CreateIntervention from '../screens/stacks/CreateIntervention';
import CreateInterventionCategory from '../screens/stacks/CreateInterventionCategory';
import CreateInvoice from '../screens/stacks/CreateInvoice';
import InterventionCategory from '../screens/stacks/InterventionCategory';
import InterventionDetails from '../screens/stacks/InterventionDetails';
import Payment from '../screens/stacks/Payment';
import PrivacyPolicy from '../screens/stacks/PrivacyPolicy';
import Profile from '../screens/stacks/Profile';
import Subscription from '../screens/stacks/Subscription';
import Support from '../screens/stacks/Support';
import TermsAndConditions from '../screens/stacks/TermsAndConditions';
import UpdateExpenses from '../screens/stacks/UpdateExpenses';
import UpdateIntervention from '../screens/stacks/UpdateIntervention';
import UpdateInterventionCategory from '../screens/stacks/UpdateInterventionCategory';
import UpdateInvoice from '../screens/stacks/UpdateInvoice';
import TabLayout from './TabLayout';

const Stack = createNativeStackNavigator();

const StackLayout = () => {
  const { english } = useGlobalContext();

  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen
        name="Login"
        component={Login}
        options={{
          headerShown: true,
          title: t('login', english),
          headerTitleAlign: 'center',
          headerBackground: () => null,
        }}
      />
      <Stack.Screen
        name="Payment"
        component={Payment}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="SignUp"
        component={SignUp}
        options={{
          headerShown: true,
          title: t('createAccount', english),
          headerTitleAlign: 'center',
          headerBackground: () => null,
        }}
      />
      <Stack.Screen
        name="Forget"
        component={ForgetPassword}
        options={{
          headerShown: true,
          title: t('forgetPassword', english),
          headerTitleAlign: 'center',
          headerBackground: () => null,
        }}
      />
      <Stack.Screen
        name="Otp"
        component={Otp}
        options={{
          headerShown: true,
          title: t('verifyCode', english),
          headerTitleAlign: 'center',
          headerBackground: () => null,
        }}
      />
      <Stack.Screen
        name="NewPassword"
        component={NewPassword}
        options={{
          headerShown: true,
          title: t('newPassword', english),
          headerTitleAlign: 'center',
          headerBackground: () => null,
        }}
      />
      <Stack.Screen
        name="CreateIntervention"
        component={CreateIntervention}
        options={{
          headerShown: true,
          title: t('createIntervention', english),
          headerTitleAlign: 'center',
          headerBackground: () => null,
        }}
      />
      <Stack.Screen
        name="UpdateIntervention"
        component={UpdateIntervention}
        options={{
          headerShown: true,
          title: t('updateIntervention', english),
          headerTitleAlign: 'center',
          headerBackground: () => null,
        }}
      />
      <Stack.Screen
        name="CreateExpenses"
        component={CreateExpenses}
        options={{
          headerShown: true,
          title: t('createExpenses', english),
          headerTitleAlign: 'center',
          headerBackground: () => null,
        }}
      />
      <Stack.Screen
        name="UpdateExpenses"
        component={UpdateExpenses}
        options={{
          headerShown: true,
          title: t('updateExpenses', english),
          headerTitleAlign: 'center',
          headerBackground: () => null,
        }}
      />
      <Stack.Screen
        name="InterventionDetails"
        component={InterventionDetails}
        options={{
          headerShown: true,
          title: t('details', english),
          headerTitleAlign: 'center',
          headerBackground: () => null,
        }}
      />
      <Stack.Screen
        name="InvoiceDetails"
        component={InvoiceDetails}
        options={{
          headerShown: true,
          title: t('details', english),
          headerTitleAlign: 'center',
          headerBackground: () => null,
        }}
      />
      <Stack.Screen
        name="CreateInvoice"
        component={CreateInvoice}
        options={{
          headerShown: true,
          title: t('createInvoice', english),
          headerTitleAlign: 'center',
          headerBackground: () => null,
        }}
      />
      <Stack.Screen
        name="UpdateInvoice"
        component={UpdateInvoice}
        options={{
          headerShown: true,
          title: t('updateInvoice', english),
          headerTitleAlign: 'center',
          headerBackground: () => null,
        }}
      />
      <Stack.Screen
        name="EditProfile"
        component={Profile}
        options={{
          headerShown: true,
          title: t('editProfile', english),
          headerTitleAlign: 'center',
          headerBackground: () => null,
        }}
      />
      <Stack.Screen
        name="Subscription"
        component={Subscription}
        options={{
          headerShown: true,
          title: t('subscription', english),
          headerTitleAlign: 'center',
          headerBackground: () => null,
        }}
      />
      <Stack.Screen
        name="InterventionCategory"
        component={InterventionCategory}
        options={{
          headerShown: true,
          title: t('interventionCategory', english),
          headerTitleAlign: 'center',
          headerBackground: () => null,
        }}
      />
      <Stack.Screen
        name="CreateInterventionCategory"
        component={CreateInterventionCategory}
        options={{
          headerShown: true,
          title: t('createInterventionCategory', english),
          headerTitleAlign: 'center',
          headerBackground: () => null,
        }}
      />
      <Stack.Screen
        name="UpdateInterventionCategory"
        component={UpdateInterventionCategory}
        options={{
          headerShown: true,
          title: t('updateInterventionCategory', english),
          headerTitleAlign: 'center',
          headerBackground: () => null,
        }}
      />
      <Stack.Screen
        name="Support"
        component={Support}
        options={{
          headerShown: true,
          title: t('contactSupport', english),
          headerTitleAlign: 'center',
          headerBackground: () => null,
        }}
      />
      <Stack.Screen
        name="ChangePassword"
        component={ChangePassword}
        options={{
          headerShown: true,
          title: t('changePassword', english),
          headerTitleAlign: 'center',
          headerBackground: () => null,
        }}
      />
      <Stack.Screen
        name="TermsAndConditions"
        component={TermsAndConditions}
        options={{
          headerShown: true,
          title: t('termsAndConditions', english),
          headerTitleAlign: 'center',
          headerBackground: () => null,
        }}
      />
      <Stack.Screen
        name="PrivacyPolicy"
        component={PrivacyPolicy}
        options={{
          headerShown: true,
          title: t('privacyPolicy', english),
          headerTitleAlign: 'center',
          headerBackground: () => null,
        }}
      />
      <Stack.Screen
        name="Tabs"
        component={TabLayout}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default StackLayout;
