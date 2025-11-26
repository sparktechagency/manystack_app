import { CommonActions, NavigationProp, ParamListBase, useNavigation } from '@react-navigation/native';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { FlatList, ImageSourcePropType, SafeAreaView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import FloatingPlus from '../../components/Home/FloatingPlus';
import Highlights from '../../components/Home/Highlights';
import MonthButton from '../../components/Home/MonthButton';
import OverviewChart from '../../components/Home/OverviewChart';
import ProfitCard from '../../components/Home/ProfitCard';
import WellCome from '../../components/Home/WellCome';
import { Loss } from '../../constant/images';
import { useGlobalContext } from '../../providers/GlobalContextProvider';
import { useGetHomePageDataQuery, useGetProfileQuery } from '../../redux/Apis/userApis';
import { t } from '../../utils/translate';
const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const Home = () => {
  const navigation = useNavigation<NavigationProp<ParamListBase>>()
  const { data: dataProfile, isLoading } = useGetProfileQuery(undefined)
  const [selectedMonth, setSelectedMonth] = useState(moment().month())
  const { english, currency, user } = useGlobalContext();
  const { data, isLoading: isLoadingHome } = useGetHomePageDataQuery(months[selectedMonth]);
  const insets = useSafeAreaInsets();
  const elements = [
    <WellCome key={1} />,
    <MonthButton
      selectedMonth={selectedMonth}
      setSelectedMonth={setSelectedMonth}
      key={8}
    />,
    <ProfitCard
      title="Intervention"
      count={`${data?.data?.totalInterventions || 0}` || '0'}
      percentage={(data?.data?.interventionChange || 0) || '0%'}
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
    <ProfitCard
      title={t('profit', english)}
      count={`${currency}${data?.data?.totalProfit || 0}`}
      percentage={data?.data?.profitChange || '0%'}
      key={2}
    />,
    <OverviewChart monthlyData={data?.data?.monthlyData || []} key={4} />,
    <Highlights
      key={5}
      interventionCount={data?.data?.todayHighlights?.totalInterventions || '0'}
      priceCount={
        `${currency}${Number(
          data?.data?.todayHighlights?.totalPrice || 0,
        ).toFixed(2)}` || '0'
      }
    />,
  ];

  useEffect(() => {
    if (isLoading || isLoadingHome) {
      return;
    }
    if (!dataProfile?.data?.subscription?.isActive) {
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [
            {
              name: 'Subscription',
              params: { show: false },
            },
          ],
        })
      );
    }

  }, [dataProfile, dataProfile?.data?.subscription?.isActive, isLoading, isLoadingHome]);
  return (
    <SafeAreaView style={{ paddingTop: insets.top, paddingBottom: insets.bottom }}>
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
    </SafeAreaView >
  );
};

export default Home;
