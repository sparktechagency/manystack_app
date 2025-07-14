import React from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import FilterByDate from '../../components/Intervention/FilterByDate';
import Heading from '../../components/Intervention/Heading';
import Interventions from '../../components/Intervention/Interventions';
import PrettyCard from '../../components/sheard/PrettyCard';
import Search from '../../components/sheard/Search';

const InterVention = () => {
  const [refreshing, setRefreshing] = React.useState(false);
  const [search, setSearch] = React.useState<string>('');
  const [fromDate, setFromDate] = React.useState<string>('');
  const [toDate, setToDate] = React.useState<string>('');
  const fromTOHandler = (formatDate: string, toDate: string) => {
    setFromDate(formatDate);
    setToDate(toDate);
  };
  const elements = [
    <Search search={search} setSearch={setSearch} key={1} />,
    <FilterByDate fromTOHandler={fromTOHandler} key={2} />,
    <Interventions
      search={search}
      fromDate={fromDate}
      toDate={toDate}
      key={3}
    />,
  ];

  const onRefresh = async () => {
    setRefreshing(true);

    setRefreshing(false);
  };
  return (
    <SafeAreaView>
      <View style={{paddingBottom: 62}}>
        <Heading setSearch={setSearch} key={1} />
        <FlatList
          refreshing={refreshing}
          onRefresh={onRefresh}
          keyExtractor={(item, index) => index.toString()}
          data={elements}
          renderItem={({item}) => item}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{gap: 15, paddingHorizontal: 20}}
          ListEmptyComponent={
            <PrettyCard
              title="No Interventions"
              description="No interventions found. Check back later or create a new one to get started!"
            />
          }
        />
      </View>
    </SafeAreaView>
  );
};

export default InterVention;

const styles = StyleSheet.create({});
