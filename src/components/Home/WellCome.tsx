import React from 'react'
import { Image, ImageSourcePropType, StyleSheet, Text, View } from 'react-native'
import { Colors } from '../../constant/colors'
import { logo } from '../../constant/images'
import { globalStyles } from '../../constant/styles'
import { hexToRGBA } from '../../utils/hexToRGBA'

const WellCome = () => {
  return (
    <View style={[globalStyles.flex, { justifyContent: "space-between" }]}>
      <View style={[globalStyles.flex, { justifyContent: "flex-start", gap: 10 }]}>
        <Image
          source={logo as ImageSourcePropType}
          style={{ width: 40, height: 40, }}
        />
        <View>
          <Text style={[globalStyles.text, { fontSize: 12, color: hexToRGBA(Colors.light.black as string, .5) }]}>WellCome Back</Text>
          <Text style={[globalStyles.inputLabel,]}>Many Stake</Text>
        </View>
      </View>
      <Text>WellCome</Text>
    </View>
  )
}

export default WellCome

const styles = StyleSheet.create({

})