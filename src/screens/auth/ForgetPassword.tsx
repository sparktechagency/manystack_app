import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import React from 'react';
import {
  ActivityIndicator,
  Image,
  ImageSourcePropType,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';
import { SafeAreaView } from 'react-native-safe-area-context';
import BackButton from '../../components/sheard/BackButton';
import GradientButton from '../../components/sheard/GradientButton';
import { logo } from '../../constant/images';
import { globalStyles } from '../../constant/styles';
import { useForgetPassword } from '../../hooks/authApisCall';
import { useGlobalContext } from '../../providers/GlobalContextProvider';
import { IForget } from '../../types/loginType';
import { StackTypes } from '../../types/ScreenPropsTypes';
import { t } from '../../utils/translate';

const ForgetPassword = () => {
  const navigate = useNavigation<NavigationProp<StackTypes>>();
  const { english, height } = useGlobalContext();
  const [error, setError] = React.useState({
    email: false,
  });

  const [inputValue, setInputValue] = React.useState<IForget>({
    email: '',
  });
  const { forgetPasswordHandler, isLoading } = useForgetPassword();
  const submitHandler = () => {
    if (inputValue.email === '') {
      return setError({
        email: true,
      });
    }
    forgetPasswordHandler({ email: inputValue.email }, async () => {
      await AsyncStorage.setItem('email', inputValue?.email);
      navigate.navigate('Otp', {
        params: { from: 'forget', email: inputValue.email },
      });
    });
  };

  return (
    <SafeAreaView
    >
      <BackButton text={t('forgetPassword', english)} />
      <KeyboardAwareScrollView bottomOffset={62} >
        <View style={{
          flex: 1, justifyContent: 'center', alignItems: 'center', width: '100%',
          height: height - 200,
          paddingHorizontal: 20,
          paddingVertical: 20,
        }}>
          <View style={{ marginTop: -60 }}>
            <Image source={logo as ImageSourcePropType} height={100} width={100} />
          </View>
          {/* form */}
          <View style={{ width: '100%', paddingHorizontal: 20 }}>
            {Object.keys(inputValue).map((key, index) => (
              <View key={index}>
                <Text style={[globalStyles.inputLabel]}>
                  {key.charAt(0).toUpperCase() + key.slice(1)}
                </Text>
                <View style={{ position: 'relative' }}>
                  <TextInput
                    value={inputValue[key as keyof IForget]}
                    onChangeText={text => {
                      setInputValue({ ...inputValue, [key]: text });
                      setError({ ...error, [key]: false });
                    }}
                    placeholder={`${t('enter', english)} ${t(key as any, english)}`}
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
                {isLoading ? (
                  <ActivityIndicator size="small" color="white" />
                ) : (
                  <Text
                    style={{
                      color: 'white',
                      textAlign: 'center',
                      fontWeight: 700,
                      fontSize: 18,
                    }}>
                    {t('submit', english)}
                  </Text>
                )}
              </GradientButton>
            </View>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default ForgetPassword;

const styles = StyleSheet.create({});
