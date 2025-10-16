import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';
import InvoiceCreateUpdateForm from '../../components/Invoice/InvoiceCreateUpdateForm';

const UpdateInvoice = () => {
  return (
    <SafeAreaView>
        <InvoiceCreateUpdateForm />
    </SafeAreaView>
  );
};

export default UpdateInvoice;

const styles = StyleSheet.create({});
