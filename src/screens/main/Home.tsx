import React from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import WellCome from '../../components/Home/WellCome';

const Home = () => {
  const elements = [<WellCome key={1} />];
  return (
    <SafeAreaView >
      <FlatList
        keyExtractor={(item, index) => index.toString()}
        data={elements}
        renderItem={({ item }) => item}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ gap: 10, paddingHorizontal: 20 }}
      />
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({});
