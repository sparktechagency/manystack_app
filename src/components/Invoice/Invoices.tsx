import React, {useState} from 'react';
import {ActivityIndicator, FlatList, StyleSheet, View} from 'react-native';
import {useGetInvoicesQuery} from '../../redux/Apis/invoiceApis';
import {IInvoice} from '../../types/DataTypes';
import InvoiceCard from './InvoiceCard';

const Invoices = ({
  search,
  fromDate,
  toDate,
}: {
  search: string;
  fromDate: string;
  toDate: string;
}) => {
  const [limit, setLimit] = useState(10);
  const {data, isLoading, isFetching} = useGetInvoicesQuery({
    search,
    limit,
    fromDate,
    toDate,
  });
  return (
    <FlatList
      data={data?.invoices || ([] as IInvoice[])}
      keyExtractor={(item: IInvoice) => item?._id}
      renderItem={({item}) => <InvoiceCard key={item?._id} item={item} />}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{gap: 15, padding: 0}}
      ListFooterComponent={() =>
        isLoading || isFetching ? (
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <ActivityIndicator size="large" color="blue" />
          </View>
        ) : (
          <></>
        )
      }
      onEndReached={() => {
        !isLoading &&
          !isFetching &&
          data?.pagination?.totalItems > limit &&
          setLimit(limit + 10);
      }}
    />
  );
};

export default Invoices;

const styles = StyleSheet.create({});
