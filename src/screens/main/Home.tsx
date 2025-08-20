import React from 'react';
import { FlatList, ImageSourcePropType, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import FloatingPlus from '../../components/Home/FloatingPlus';
import Highlights from '../../components/Home/Highlights';
import OverviewChart from '../../components/Home/OverviewChart';
import ProfitCard from '../../components/Home/ProfitCard';
import WellCome from '../../components/Home/WellCome';
import { Loss } from '../../constant/images';
import { useGlobalContext } from '../../providers/GlobalContextProvider';
import { useGetHomePageDataQuery } from '../../redux/Apis/userApis';
import { t } from '../../utils/translate';

const Home = () => {
  const { english, currency } = useGlobalContext();
  const { data, isLoading, isFetching } = useGetHomePageDataQuery(undefined);
  const insets = useSafeAreaInsets();
  const elements = [
    <WellCome key={1} />,
    <ProfitCard
      title={t('profit', english)}
      count={`${currency}${data?.data?.totalProfit || 0}`}
      percentage={data?.data?.profitChange || '0%'}
      key={2}
    />,
    <ProfitCard
      title="Intervention"
      count={`${data?.data?.totalIntervention || 0}` || '0'}
      percentage={data?.data?.interventionChange || '0%'}
      key={3}
    />,
    <ProfitCard
      title={english ? 'Income' : 'Chiffre d’Affaire'}
      count={`${currency}${data?.data?.totalIncome || 0}`}
      percentage={data?.data?.incomeChange || '0%'}
      key={3}
    />,
    <ProfitCard
      title={t('expanses', english)}
      count={`${currency}${data?.data?.totalExpensesInPrice || 0}`}
      percentage={`${data?.data?.expenseChange || "0%"}`}
      icon={Loss as ImageSourcePropType}
      key={1}
    />,
    <OverviewChart monthlyData={data?.data?.monthlyData || []} key={4} />,
    <Highlights
      key={5}
      interventionCount={data?.data?.totalInterventionsInPrice || '0'}
      priceCount={
        `${currency}${Number(
          data?.data?.totalExpensesInPrice / 1000 || 0,
        ).toFixed(2)}` || '0'
      }
    />,
  ];
  return (
    <View style={{ paddingTop: insets.top, paddingBottom: insets.bottom }}>
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
    </View>
  );
};

export default Home;
