import React from 'react'
import { FlatList, StyleSheet } from 'react-native'
import { intervention } from '../../constant/data'
import { IIntervention } from '../../types/DataTypes'
import InterventionsCards from './InterventionsCards'

const Interventions = () => {
  return (
    <FlatList
      data={intervention as IIntervention[]}
      keyExtractor={(item: IIntervention) => item.invoice_id}
      renderItem={({ item }) => (
        <InterventionsCards key={item.invoice_id} item={item} />
      )}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ gap: 15, padding: 0 }}
    />
  )
}

export default Interventions

const styles = StyleSheet.create({})