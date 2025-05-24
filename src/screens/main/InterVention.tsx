import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Heading from '../../components/Intervention/Heading';

const InterVention = () => {
  const elements = [
    <View></View>,

  ];
  return (
    <SafeAreaView >
      <Heading key={1} />
      <FlatList
        keyExtractor={(item, index) => index.toString()}
        data={elements}
        renderItem={({ item }) => item}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ gap: 15, paddingHorizontal: 20 }}
      />
    </SafeAreaView>
  )
}

export default InterVention

const styles = StyleSheet.create({})