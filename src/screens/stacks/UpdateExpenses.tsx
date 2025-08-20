import React from 'react';
import { SafeAreaView } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';
import ExpensesCreateUpdateForm from '../../components/Expenses/ExpensesCreateUpdateForm';

const UpdateExpenses = () => {
  return (
    <SafeAreaView>
      <KeyboardAwareScrollView bottomOffset={62}>
        <ExpensesCreateUpdateForm />
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default UpdateExpenses;
