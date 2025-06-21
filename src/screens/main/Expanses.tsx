import React from 'react';
import {
  FlatList,
  ImageSourcePropType,
  StyleSheet,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AllExpenses from '../../components/Expenses/AllExpenses';
import ProfitCard from '../../components/Home/ProfitCard';
import FilterByDate from '../../components/Intervention/FilterByDate';
import Heading from '../../components/Intervention/Heading';
import Search from '../../components/sheard/Search';
import { Loss } from '../../constant/images';
import { useGlobalContext } from '../../providers/GlobalContextProvider';
import { t } from '../../utils/translate';

const Expanses = () => {
  const [refreshing, setRefreshing] = React.useState(false);
  const [search, setSearch] = React.useState<string>('');
  const [fromDate, setFromDate] = React.useState<string>('');
  const [toDate, setToDate] = React.useState<string>('');
  const fromTOHandler = (formatDate: string, toDate: string) => {
    setFromDate(formatDate);
    setToDate(toDate);
  }
  const { english } = useGlobalContext();
  const elements = [
    <ProfitCard
      title={t("expanses", english)}
      count="$23,787"
      percentage="+14%"
      icon={Loss as ImageSourcePropType}
      key={1}
    />,
    <Search search={search} setSearch={setSearch} key={2} />,
    <FilterByDate fromTOHandler={fromTOHandler} title="Expenses" key={3} />,
    <AllExpenses search={search} fromDate={fromDate} toDate={toDate} key={4} />,
  ];
  const onRefresh = async () => {
    setRefreshing(true);

    setRefreshing(false);
  };
  return (
    <SafeAreaView>
      <View style={{ paddingBottom: 62 }}>
        <Heading setSearch={setSearch} title={t("expanses", english)} />
        <FlatList
          refreshing={refreshing}
          onRefresh={onRefresh}
          keyExtractor={(item, index) => index.toString()}
          data={elements}
          renderItem={({ item }) => item}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ gap: 15, paddingHorizontal: 20 }}
        />
      </View>
    </SafeAreaView>
  );
};

export default Expanses;

const styles = StyleSheet.create({});
