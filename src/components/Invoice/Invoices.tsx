import React, { useState } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { useGetInvoicesQuery } from '../../redux/Apis/invoiceApis';
import { IInvoice } from '../../types/DataTypes';
import InvoiceCard from './InvoiceCard';

const Invoices = ({ search, fromDate, toDate }: { search: string, fromDate: string, toDate: string }) => {
  const [limit, setLimit] = useState(10)
  const { data, isLoading, isFetching } = useGetInvoicesQuery({ search, limit, fromDate, toDate })
  return (
    <FlatList
      data={data?.invoices || [] as IInvoice[]}
      keyExtractor={(item: IInvoice) => item.invoice_id}
      renderItem={({ item }) => <InvoiceCard key={item.invoice_id} item={item} />}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ gap: 15, padding: 0 }}
    />
  );
};

export default Invoices;

const styles = StyleSheet.create({});
