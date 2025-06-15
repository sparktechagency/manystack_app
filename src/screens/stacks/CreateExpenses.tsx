import React from 'react';
import {SafeAreaView} from 'react-native';
import ExpensesCreateUpdateForm from '../../components/Expenses/ExpensesCreateUpdateForm';

const CreateExpenses = () => {
  return (
    <SafeAreaView>
      <ExpensesCreateUpdateForm />
    </SafeAreaView>
  );
};

export default CreateExpenses;
