import React, { useState } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, View } from 'react-native';
import { useGetInterventionsQuery } from '../../redux/Apis/interventionApis';
import { IIntervention } from '../../types/DataTypes';
import InterventionsCards from './InterventionsCards';

const Interventions = () => {
  const [limit, setLimit] = useState(10)
  const { data, isLoading, isFetching } = useGetInterventionsQuery(undefined)
  console.log(data)
  return (
    <FlatList
      data={[] as IIntervention[]}
      keyExtractor={(item: IIntervention) => item.interventionId}
      renderItem={({ item }) => (
        <InterventionsCards key={item._id} item={item} />
      )}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ gap: 15, padding: 0 }}
      ListFooterComponent={() => (isLoading || isFetching) ? <View style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
      }}><ActivityIndicator size="large" color="blue" /></View> : <></>}
      onEndReached={() => setLimit(limit + 10)}
    />
  );
};

export default Interventions;

const styles = StyleSheet.create({});
