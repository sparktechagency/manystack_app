import { useRoute } from '@react-navigation/native'
import React from 'react'
import { Text, View } from 'react-native'

const Payment = () => {
  const { params }: any = useRoute()
  console.log(params?.params?.id)
  return (
    <View>
      <Text>Payment</Text>
    </View>
  )
}

export default Payment
