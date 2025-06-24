import React, { useState } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, View } from 'react-native';
import { useGetInterventionsQuery } from '../../redux/Apis/interventionApis';
import { IIntervention } from '../../types/DataTypes';
import { InterVentionsProps } from '../../types/PropsType';
import InterventionsCards from './InterventionsCards';

const Interventions = ({ search, fromDate, toDate }: InterVentionsProps) => {
  const [limit, setLimit] = useState(10)
  const { data, isLoading, isFetching } = useGetInterventionsQuery({ search, limit, fromDate, toDate })
  return (
    <FlatList
      data={data?.interventions || [] as IIntervention[]}
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
      onEndReached={() => {
        !isLoading && !isFetching && data?.pagination?.totalItems > limit && setLimit(limit + 10)
      }}
      onEndReachedThreshold={0.5}
    />
  );
};

export default Interventions;

const styles = StyleSheet.create({});
