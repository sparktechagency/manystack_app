import React from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Heading from '../../components/Intervention/Heading';
import Search from '../../components/sheard/Search';

const InterVention = () => {
  const [search, setSearch] = React.useState<string>('');
  const elements = [
    <Search search={search} setSearch={setSearch} key={1} />,

  ];
  return (
    <SafeAreaView >
      <Heading key={1} />
      <FlatList
        keyExtractor={(item, index) => index.toString()}
        data={elements}
        renderItem={({ item }) => item}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ gap: 15, paddingHorizontal: 20 }}
      />
    </SafeAreaView>
  )
}

export default InterVention

const styles = StyleSheet.create({})