import { NavigationProp, ParamListBase, useNavigation } from '@react-navigation/native'
import React from 'react'
import { Image, ImageSourcePropType, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Back } from '../../constant/images'
interface propType {
  text?: string
}
const BackButton = ({ text }: propType) => {
  const navigation = useNavigation<NavigationProp<ParamListBase>>()
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10, justifyContent: 'space-between', paddingHorizontal: 20, marginTop: 8 }}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Image
          source={Back as ImageSourcePropType}
          style={{ width: 24, height: 24 }}
        />
      </TouchableOpacity>
      <Text style={{
        fontSize: 20,
        fontWeight: '500',
      }}>{text}</Text>
      <Text></Text>
    </View>
  )
}

export default BackButton

const styles = StyleSheet.create({})