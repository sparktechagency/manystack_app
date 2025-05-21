import React from 'react'
import { Image, ImageSourcePropType, StyleSheet, View } from 'react-native'
import { TabIcons } from '../../constant/images'

const TabItems = ({ route, label, isFocused }: { route: string, label: string, isFocused: boolean }) => {
  console.log(route, label, isFocused)
  return (
    <View>
      <Image
        source={TabIcons[label as keyof typeof TabIcons] as ImageSourcePropType}
        style={{
          width: 20,
          height: 20,
          tintColor: isFocused ? '#FF0000' : '#000000',
        }}
      />
    </View>
  )
}

export default TabItems

const styles = StyleSheet.create({})