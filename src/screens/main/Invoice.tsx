import React from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import FilterByDate from '../../components/Intervention/FilterByDate';
import Heading from '../../components/Intervention/Heading';
import Invoices from '../../components/Invoice/Invoices';
import Search from '../../components/sheard/Search';
import {useGlobalContext} from '../../providers/GlobalContextProvider';
import {t} from '../../utils/translate';

const Invoice = () => {
  const {english} = useGlobalContext();
  const [search, setSearch] = React.useState<string>('');
  const [refreshing, setRefreshing] = React.useState(false);
  const [fromDate, setFromDate] = React.useState<string>('');
  const [toDate, setToDate] = React.useState<string>('');
  const fromTOHandler = (formatDate: string, toDate: string) => {
    setFromDate(formatDate);
    setToDate(toDate);
  };
  const elements = [
    <Search search={search} setSearch={setSearch} key={1} />,
    <FilterByDate fromTOHandler={fromTOHandler} title="Invoice" key={2} />,
    <Invoices search={search} fromDate={fromDate} toDate={toDate} key={3} />,
  ];
  return (
    <SafeAreaView>
      <View style={{paddingBottom: 62}}>
        <Heading
          setSearch={setSearch}
          title={t('invoice', english)}
          show={false}
        />
        <FlatList
          keyExtractor={(item, index) => index.toString()}
          data={elements}
          renderItem={({item}) => item}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{gap: 15, paddingHorizontal: 20}}
        />
      </View>
    </SafeAreaView>
  );
};

export default Invoice;

const styles = StyleSheet.create({});
