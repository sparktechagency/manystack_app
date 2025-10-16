import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import InvoiceCreateUpdateForm from '../../components/Invoice/InvoiceCreateUpdateForm';

const CreateInvoice = () => {
  return (
    <SafeAreaView>
      <InvoiceCreateUpdateForm />
    </SafeAreaView>
  );
};

export default CreateInvoice;

const styles = StyleSheet.create({});
