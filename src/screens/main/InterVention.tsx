import React from 'react';
import {FlatList, SafeAreaView, StyleSheet, View} from 'react-native';
import FilterByDate from '../../components/Intervention/FilterByDate';
import Heading from '../../components/Intervention/Heading';
import Interventions from '../../components/Intervention/Interventions';
import Search from '../../components/sheard/Search';

const InterVention = () => {
  const [search, setSearch] = React.useState<string>('');
  const elements = [
    <Search search={search} setSearch={setSearch} key={1} />,
    <FilterByDate key={2} />,
    <Interventions key={3} />,
  ];
  return (
    <SafeAreaView>
      <View style={{paddingBottom: 62}}>
        <Heading key={1} />
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

export default InterVention;

const styles = StyleSheet.create({});
