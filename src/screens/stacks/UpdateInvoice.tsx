import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';
import InvoiceCreateUpdateForm from '../../components/Invoice/InvoiceCreateUpdateForm';

const UpdateInvoice = () => {
  return (
    <SafeAreaView>
      <KeyboardAwareScrollView bottomOffset={62}>
        <InvoiceCreateUpdateForm />
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default UpdateInvoice;

const styles = StyleSheet.create({});
