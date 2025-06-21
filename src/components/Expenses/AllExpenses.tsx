import React from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { useGetExpensesQuery } from '../../redux/Apis/expensesApis';
import { IExpenses } from '../../types/DataTypes';
import ExpensesCards from './ExpensesCards';

const AllExpenses = () => {
  const { data } = useGetExpensesQuery(undefined)
  console.log(data)
  return (
    <FlatList
      data={data?.expenses || [] as IExpenses[]}
      keyExtractor={(item: IExpenses) => item.name}
      renderItem={({ item }) => <ExpensesCards key={item.name} item={item} />}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ gap: 15, padding: 0 }}
    />
  );
};

export default AllExpenses;

const styles = StyleSheet.create({});
