import React from 'react'
import { Image, ImageSourcePropType, StyleSheet, View } from 'react-native'
import { Colors } from '../../constant/colors'
import { TabIcons } from '../../constant/images'

const TabItems = ({ route, label, isFocused }: { route: string, label: string, isFocused: boolean }) => {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', height: 50, borderTopWidth: isFocused ? 3 : 0, borderColor: isFocused ? Colors.light.primary as string : 'transparent' }}>
      <Image
        source={TabIcons[label as keyof typeof TabIcons] as ImageSourcePropType}
        style={{
          width: 24,
          height: 24,
          tintColor: isFocused ? Colors.light.primary as string : Colors.light.black as string,
        }}
      />
    </View>
  )
}

export default TabItems

const styles = StyleSheet.create({})