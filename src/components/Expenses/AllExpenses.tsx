import React, { useState } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, View } from 'react-native';
import { useGetExpensesQuery } from '../../redux/Apis/expensesApis';
import { IExpenses } from '../../types/DataTypes';
import ExpensesCards from './ExpensesCards';

const AllExpenses = ({ search, fromDate, toDate }: { search: string, fromDate: string, toDate: string }) => {
  const [limit, setLimit] = useState(10)
  const { data, isLoading, isFetching } = useGetExpensesQuery({ search, limit, fromDate, toDate })
  return (
    <FlatList
      data={data?.expenses || [] as IExpenses[]}
      keyExtractor={(item: IExpenses) => item._id}
      renderItem={({ item }) => <ExpensesCards key={item._id} item={item} />}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ gap: 15, padding: 0 }}
      ListFooterComponent={() => (isLoading || isFetching) ? <View style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
      }}><ActivityIndicator size="large" color="blue" /></View> : <></>}
      onEndReached={() => {
        !isLoading && !isFetching && setLimit(limit + 10)
      }}
    />
  );
};

export default AllExpenses;

const styles = StyleSheet.create({});
