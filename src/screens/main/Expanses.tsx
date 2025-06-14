import React from 'react';
import {
  FlatList,
  ImageSourcePropType,
  SafeAreaView,
  StyleSheet,
  View,
} from 'react-native';
import AllExpenses from '../../components/Expenses/AllExpenses';
import ProfitCard from '../../components/Home/ProfitCard';
import FilterByDate from '../../components/Intervention/FilterByDate';
import Heading from '../../components/Intervention/Heading';
import Search from '../../components/sheard/Search';
import { Loss } from '../../constant/images';
import { useGlobalContext } from '../../providers/GlobalContextProvider';
import { t } from '../../utils/translate';

const Expanses = () => {
  const [search, setSearch] = React.useState<string>('');
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
    <FilterByDate title="Expanses" key={3} />,
    <AllExpenses key={4} />,
  ];

  return (
    <SafeAreaView>
      <View style={{ paddingBottom: 62 }}>
        <Heading title="Expanses" />
        <FlatList
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
