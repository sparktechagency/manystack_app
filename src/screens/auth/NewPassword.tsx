import { NavigationProp, useNavigation } from '@react-navigation/native';
import React from 'react';
import {
  Image,
  ImageSourcePropType,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import GradientButton from '../../components/sheard/GradientButton';
import { eye, eyeSlash, logo } from '../../constant/images';
import { globalStyles } from '../../constant/styles';
import { useGlobalContext } from '../../providers/GlobalContextProvider';
import { INewPassword } from '../../types/loginType';
import { StackTypes } from '../../types/ScreenPropsTypes';
import { t } from '../../utils/translate';
const NewPassword = () => {
  const navigate = useNavigation<NavigationProp<StackTypes>>();
  const [passShow, setPassShow] = React.useState(true);
  const [cPassShow, setCPassShow] = React.useState(true);
  const { english } = useGlobalContext();
  const [error, setError] = React.useState({
    password: false,
    confirmPassword: false,
  });

  const [inputValue, setInputValue] = React.useState<INewPassword>({
    password: '123456',
    confirmPassword: '123456',
  });

  const submitHandler = () => {
    Object.keys(inputValue).forEach(key => {
      if (inputValue[key as keyof INewPassword] === '') {
        setError(prev => ({ ...prev, [key]: true }));
      } else {
        setError(prev => ({ ...prev, [key]: false }));
      }
    });
    navigate.navigate('Tabs');
  };
  return (
    <SafeAreaView
      style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <View style={{ marginTop: -60 }}>
        <Image source={logo as ImageSourcePropType} height={100} width={100} />
      </View>
      {/* form */}
      <View style={{ width: '100%', paddingHorizontal: 20 }}>
        {Object.keys(inputValue).map((key, index) => (
          <View key={index}>
            <Text style={[globalStyles.inputLabel]}>
              {/* {key.charAt(0).toUpperCase() + key.slice(1)} */}
              {key === 'password' ? t('password', english) : t('confirmPassword', english)}
            </Text>
            <View style={{ position: 'relative' }}>
              <TextInput
                value={inputValue[key as keyof INewPassword]}
                onChangeText={text => {
                  setInputValue({ ...inputValue, [key]: text });
                  setError({ ...error, [key]: false });
                }}
                placeholder={`${t('enter', english)} ${t(key as any, english)}`}
                secureTextEntry={
                  key === 'password'
                    ? passShow
                    : key === 'confirmPassword'
                      ? cPassShow
                      : false
                }
                placeholderTextColor={globalStyles.inputPlaceholder.color}
                style={[
                  globalStyles.input,
                  error[key as keyof INewPassword]
                    ? globalStyles.inputError
                    : {},
                ]}
              />
              {(key === 'password' || key === 'confirmPassword') && (
                <TouchableOpacity
                  style={{ position: 'absolute', right: 10, top: 15 }}
                  onPress={() => {
                    if (key === 'password') {
                      setPassShow(!passShow);
                    } else {
                      setCPassShow(!cPassShow);
                    }
                  }}>
                  <Image
                    source={
                      key === 'password'
                        ? passShow
                          ? (eye as ImageSourcePropType)
                          : (eyeSlash as ImageSourcePropType)
                        : cPassShow
                          ? (eye as ImageSourcePropType)
                          : (eyeSlash as ImageSourcePropType)
                    }
                    style={{ width: 20, height: 20 }}
                  />
                </TouchableOpacity>
              )}
            </View>
          </View>
        ))}

        <View
          style={{
            paddingHorizontal: 25,
          }}>
          <GradientButton handler={() => submitHandler()}>
            <Text
              style={{
                color: 'white',
                textAlign: 'center',
                fontWeight: 700,
                fontSize: 18,
              }}>
              {t('submit', english)}
            </Text>
          </GradientButton>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default NewPassword;

const styles = StyleSheet.create({});
