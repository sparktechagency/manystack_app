import { CommonActions, NavigationProp, ParamListBase, useNavigation } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { FlatList, ImageSourcePropType, View } from 'react-native';
import { useIAP } from 'react-native-iap';
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
  const navigation = useNavigation<NavigationProp<ParamListBase>>()
  const {
    connected,
    getActiveSubscriptions,

  } = useIAP({});
  const { english, currency } = useGlobalContext();
  const { data, isLoading, isFetching } = useGetHomePageDataQuery(undefined);
  const insets = useSafeAreaInsets();
  const elements = [
    <WellCome key={1} />,
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
    if (!connected) return;
    const checkSubscriptions = async () => {
      try {
        const subs = await getActiveSubscriptions();
        if (subs?.length <= 0) {
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
      } catch (error) {
        console.error("Failed to get active subscriptions:", error);
      }
    };

    checkSubscriptions();
  }, [connected, getActiveSubscriptions, navigation]);
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
    </View >
  );
};

export default Home;
