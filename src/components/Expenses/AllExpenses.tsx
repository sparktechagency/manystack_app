import React from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { ExpensesFr } from '../../constant/data';
import { IExpenses } from '../../types/DataTypes';
import ExpensesCards from './ExpensesCards';

const AllExpenses = () => {
  return (
    <FlatList
      data={ExpensesFr as IExpenses[]}
      keyExtractor={(item: IExpenses) => item.name}
      renderItem={({ item }) => <ExpensesCards key={item.name} item={item} />}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ gap: 15, padding: 0 }}
    />
  );
};

export default AllExpenses;

const styles = StyleSheet.create({});
