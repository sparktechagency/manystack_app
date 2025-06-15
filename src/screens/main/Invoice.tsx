import React from 'react';
import { FlatList, SafeAreaView, StyleSheet, View } from 'react-native';
import FilterByDate from '../../components/Intervention/FilterByDate';
import Heading from '../../components/Intervention/Heading';
import Invoices from '../../components/Invoice/Invoices';
import Search from '../../components/sheard/Search';
import { useGlobalContext } from '../../providers/GlobalContextProvider';
import { t } from '../../utils/translate';

const Invoice = () => {
  const { english } = useGlobalContext();
  const [search, setSearch] = React.useState<string>('');
  const elements = [
    <Search search={search} setSearch={setSearch} key={1} />,
    <FilterByDate title="Invoice" key={2} />,
    <Invoices key={3} />,
  ];
  return (
    <SafeAreaView>
      <View style={{ paddingBottom: 62 }}>
        <Heading title={t("invoice", english)} />
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

export default Invoice;

const styles = StyleSheet.create({});
