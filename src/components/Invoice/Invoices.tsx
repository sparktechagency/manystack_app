import React from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { InvoiceData } from '../../constant/data';
import { IInvoice } from '../../types/DataTypes';
import InvoiceCard from './InvoiceCard';

const Invoices = () => {
  return (
    <FlatList
      data={InvoiceData as IInvoice[]}
      keyExtractor={(item: IInvoice) => item.invoice_id}
      renderItem={({ item }) => (
        <InvoiceCard key={item.invoice_id} item={item} />
      )}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ gap: 15, padding: 0 }}
    />
  )
}

export default Invoices

const styles = StyleSheet.create({})