import React from 'react'
import { Image, ImageSourcePropType, StyleSheet, Text, TextInput, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { logo } from '../../constant/images'
import { globalStyles } from '../../constant/styles'
import { ILogin } from '../../types/loginType'

const Login = () => {
  const [inputValue, setInputValue] = React.useState<ILogin>({
    email: '',
    password: '',
  })

  return (
    <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <View>
        <Image
          source={logo as ImageSourcePropType}
          height={100}
          width={100}
        />
      </View>
      <View style={{ width: '100%', paddingHorizontal: 20 }}>
        {
          Object.keys(inputValue).map((key, index) => (
            <View key={index}>
              <Text style={[globalStyles.inputLabel,]}>{key.charAt(0).toUpperCase() + key.slice(1)}</Text>
              <TextInput
                value={inputValue[key as keyof ILogin]}
                onChangeText={(text) => setInputValue({ ...inputValue, [key]: text })}
                placeholder={`Enter your ${key}`}
                secureTextEntry={key === 'password'}
                placeholderTextColor={globalStyles.inputPlaceholder.color}
                style={globalStyles.input}
              />
            </View>
          ))
        }
      </View>
    </SafeAreaView>
  )
}

export default Login

const styles = StyleSheet.create({})