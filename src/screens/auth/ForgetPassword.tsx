import {NavigationProp, useNavigation} from '@react-navigation/native';
import React from 'react';
import {
  Image,
  ImageSourcePropType,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import GradientButton from '../../components/sheard/GradientButton';
import {logo} from '../../constant/images';
import {globalStyles} from '../../constant/styles';
import {IForget} from '../../types/loginType';
import {StackTypes} from '../../types/ScreenPropsTypes';

const ForgetPassword = () => {
  const navigate = useNavigation<NavigationProp<StackTypes>>();
  const [error, setError] = React.useState({
    email: false,
  });

  const [inputValue, setInputValue] = React.useState<IForget>({
    email: 'siyamoffice0273@gmail.com',
  });

  const submitHandler = () => {
    Object.keys(inputValue).forEach(key => {
      if (inputValue[key as keyof IForget] === '') {
        setError(prev => ({...prev, [key]: true}));
      } else {
        setError(prev => ({...prev, [key]: false}));
      }
    });
    navigate.navigate('Otp', {params: {from: 'forget'}});
  };

  return (
    <SafeAreaView
      style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <View style={{marginTop: -60}}>
        <Image source={logo as ImageSourcePropType} height={100} width={100} />
      </View>
      {/* form */}
      <View style={{width: '100%', paddingHorizontal: 20}}>
        {Object.keys(inputValue).map((key, index) => (
          <View key={index}>
            <Text style={[globalStyles.inputLabel]}>
              {key.charAt(0).toUpperCase() + key.slice(1)}
            </Text>
            <View style={{position: 'relative'}}>
              <TextInput
                value={inputValue[key as keyof IForget]}
                onChangeText={text => {
                  setInputValue({...inputValue, [key]: text});
                  setError({...error, [key]: false});
                }}
                placeholder={`Enter your ${key}`}
                placeholderTextColor={globalStyles.inputPlaceholder.color}
                style={[
                  globalStyles.input,
                  error[key as keyof IForget] ? globalStyles.inputError : {},
                ]}
              />
            </View>
          </View>
        ))}

        <View
          style={{
            paddingHorizontal: 25,
            marginTop: 20,
          }}>
          <GradientButton handler={() => submitHandler()}>
            <Text
              style={{
                color: 'white',
                textAlign: 'center',
                fontWeight: 700,
                fontSize: 18,
              }}>
              Submit
            </Text>
          </GradientButton>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ForgetPassword;

const styles = StyleSheet.create({});
