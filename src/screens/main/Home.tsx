import React from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import FloatingPlus from '../../components/Home/FloatingPlus';
import Highlights from '../../components/Home/Highlights';
import OverviewChart from '../../components/Home/OverviewChart';
import ProfitCard from '../../components/Home/ProfitCard';
import WellCome from '../../components/Home/WellCome';
import { useGlobalContext } from '../../providers/GlobalContextProvider';
import { useGetHomePageDataQuery } from '../../redux/Apis/userApis';
import { t } from '../../utils/translate';

const Home = () => {
  const { english } = useGlobalContext();
  const { data, isLoading, isFetching } = useGetHomePageDataQuery(undefined)
  const elements = [
    <WellCome key={1} />,
    <ProfitCard title={t("profit", english)} count={`$${data?.data?.totalProfit || 0}`} percentage={data?.data?.profitChange || "0%"} key={2} />,
    <ProfitCard title="Intervention" count={data?.data?.totalIntervention || "0"} percentage={data?.data?.interventionChange || "0%"} key={3} />,
    <OverviewChart key={4} />,
    <Highlights key={5} interventionCount={data?.data?.totalInterventionsInPrice || "0"} priceCount={`$${Number(data?.data?.totalExpensesInPrice / 1000 || 0).toFixed(2)}` || "0"} />,
  ];
  return (
    <SafeAreaView>
      <FlatList
        keyExtractor={(item, index) => index.toString()}
        data={elements}
        renderItem={({ item }) => item}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          gap: 15,
          paddingHorizontal: 20,
          marginBottom: 100,
        }}
      />
      <FloatingPlus key={6} />
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({});
