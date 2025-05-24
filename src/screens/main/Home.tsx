import React from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import FloatingPlus from '../../components/Home/FloatingPlus';
import Highlights from '../../components/Home/Highlights';
import OverviewChart from '../../components/Home/OverviewChart';
import ProfitCard from '../../components/Home/ProfitCard';
import WellCome from '../../components/Home/WellCome';

const Home = () => {
  const elements = [
    <WellCome key={1} />,
    <ProfitCard title="Profit" count="$23,787" percentage="+14%" key={2} />,
    <ProfitCard title="Intervention" count="100" percentage="+14%" key={3} />,
    <OverviewChart key={4} />,
    <Highlights key={5} />,

  ];
  return (
    <SafeAreaView >
      <FlatList
        keyExtractor={(item, index) => index.toString()}
        data={elements}
        renderItem={({ item }) => item}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ gap: 15, paddingHorizontal: 20 }}
      />
      <FloatingPlus key={6} />
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({});
