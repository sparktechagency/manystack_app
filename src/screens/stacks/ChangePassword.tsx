import React from 'react';

import {
  NavigationProp,
  ParamListBase,
  useNavigation,
} from '@react-navigation/native';
import {
  Image,
  ImageSourcePropType,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';
import { SafeAreaView } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';
import BackButton from '../../components/sheard/BackButton';
import GradientButton from '../../components/sheard/GradientButton';
import { eye, eyeSlash } from '../../constant/images';
import { globalStyles } from '../../constant/styles';
import { useChangePassword } from '../../hooks/userApiCalls';
import { useGlobalContext } from '../../providers/GlobalContextProvider';
import { IChangePassword } from '../../types/loginType';
import { t } from '../../utils/translate';

const ChangePassword = () => {
  const navigation = useNavigation<NavigationProp<ParamListBase>>();
  const [passShow, setPassShow] = React.useState(true);
  const [opassShow, setOPassShow] = React.useState(true);
  const [cPassShow, setCPassShow] = React.useState(true);
  const { changePasswordHandler, isLoading } = useChangePassword();
  const { english, width, height } = useGlobalContext();
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState({
    'current password': false,
    'new password': false,
    'confirm password': false,
  });

  const [inputValue, setInputValue] = React.useState<IChangePassword>({
    'current password': '',
    'new password': '',
    'confirm password': '',
  });

  const submitHandler = () => {
    setLoading(true);
    let invalid = false;
    Object.keys(inputValue).forEach(key => {
      if (inputValue[key as keyof IChangePassword] === '') {
        setError(prev => ({ ...prev, [key]: true }));
        invalid = true;
      } else {
        setError(prev => ({ ...prev, [key]: false }));
      }
    });
    if (invalid) {
      setLoading(false);
      return Toast.show({
        type: 'error',
        text1: english ? 'All fields are required' : 'Tous les champs sont requis',
      });
    }
    const data = {
      currentPassword: inputValue['current password'],
      newPassword: inputValue['new password'],
      confirmPassword: inputValue['confirm password'],
    };

    changePasswordHandler(data, () => {
      setInputValue({
        'current password': '',
        'new password': '',
        'confirm password': '',
      });
      navigation.goBack();
      setLoading(false);
    });
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  };

  return (
    <SafeAreaView
      style={{
        position: 'relative',
        height: height,
      }}>
      <BackButton text={t('changePassword', english)} />
      <KeyboardAwareScrollView bottomOffset={62} >
        <View style={{
          height: height,
          paddingHorizontal: 20,
          paddingVertical: 20,
        }}>
          {Object.keys(inputValue).map((key, index, arr) => {
            return (
              <View key={key} style={{}}>
                <Text style={globalStyles.inputLabel}>
                  {t(key as any, english)}
                </Text>
                <View style={{ position: 'relative' }}>
                  <TextInput
                    value={inputValue[key as keyof IChangePassword]}
                    onChangeText={text => {
                      setInputValue({ ...inputValue, [key]: text });
                      setError({ ...error, [key]: false });
                    }}
                    placeholder={`${t('enter', english)} ${t(
                      key as any,
                      english,
                    )}`}
                    secureTextEntry={
                      key === 'new password'
                        ? passShow
                        : key === 'confirm password'
                          ? cPassShow
                          : opassShow
                    }
                    placeholderTextColor={globalStyles.inputPlaceholder.color}
                    style={[
                      globalStyles.input,
                      error[key as keyof IChangePassword]
                        ? globalStyles.inputError
                        : {},
                    ]}
                  />
                  {(key === 'new password' ||
                    key === 'confirm password' ||
                    key === 'current password') && (
                      <TouchableOpacity
                        style={{ position: 'absolute', right: 10, top: 18 }}
                        onPress={() => {
                          if (key === 'new password') {
                            setPassShow(!passShow);
                          } else if (key === 'confirm password') {
                            setCPassShow(!cPassShow);
                          } else {
                            setOPassShow(!opassShow);
                          }
                        }}>
                        <Image
                          source={
                            key === 'new password'
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
            );
          })}
        </View>
      </KeyboardAwareScrollView>

      <View
        style={{
          paddingHorizontal: 25,
          position: 'absolute',
          bottom: 100,
          width: width,
          paddingVertical: 16,
        }}>
        <GradientButton
          isLoading={isLoading || loading}
          handler={submitHandler}>
          <Text
            style={{
              color: 'white',
              textAlign: 'center',
              fontWeight: 700,
              fontSize: 18,
            }}>
            Sauvegarder
          </Text>
        </GradientButton>
      </View>
    </SafeAreaView>
  );
};

export default ChangePassword;
