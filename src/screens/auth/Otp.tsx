import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  NavigationProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import React, { useCallback, useState } from 'react';
import {
  Image,
  ImageSourcePropType,
  StyleSheet,
  Text,
  View
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';
import { OtpInput } from 'react-native-otp-entry';
import { SafeAreaView } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';
import BackButton from '../../components/sheard/BackButton';
import GradientButton from '../../components/sheard/GradientButton';
import { Colors } from '../../constant/colors';
import { logo } from '../../constant/images';
import { useGlobalContext } from '../../providers/GlobalContextProvider';
import {
  useVerifyEmailMutation,
  useVerifyOtpMutation,
} from '../../redux/Apis/authApis';
import { StackTypes } from '../../types/ScreenPropsTypes';
import { hexToRGBA } from '../../utils/hexToRGBA';
import { t } from '../../utils/translate';
const Otp = () => {
  const route = useRoute();
  const params = route?.params as { params: { from: string; email: string } };
  const from = params?.params?.from;
  const navigate = useNavigation<NavigationProp<StackTypes>>();
  const { english, height } = useGlobalContext();
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [verify, { isLoading }] = useVerifyEmailMutation();
  const [verifyOtp, { isLoading: otpLoading }] = useVerifyOtpMutation();

  const handleOtpChange = useCallback(() => {
    setLoading(true);
    if (code?.length != 6) {
      setLoading(false);
      return Toast.show({
        type: 'error',
        text1: english ? 'Invalid OTP' : "Code OTP invalide",
        text2: english ? 'Please enter a valid 6-digit OTP.' : "Veuillez entrer un code OTP valide de 6 chiffres.",
      });
    }
    from === 'signup'
      ? verify({
        code,
        email: params?.params?.email,
      })
        .unwrap()
        .then(async res => {
          setLoading(false);
          Toast.show({
            type: 'success',
            text1: english ? 'Success' : "Succès",
            text2: res.data?.message || (english ? 'OTP verified successfully.' : "OTP vérifié avec succès."),
          });
          await AsyncStorage.removeItem('email');
          navigate.navigate(from == 'signup' ? 'Login' : 'NewPassword');
        })
        .catch(err => {
          Toast.show({
            type: 'error',
            text1: english ? 'Error' : "Erreur",
            text2: err?.data?.message || (english ? 'An unexpected error occurred.' : "Une erreur inattendue est survenue."),
          });
        })
        .finally(() => setLoading(false))
      : verifyOtp({
        code,
      })
        .unwrap()
        .then(res => {
          setLoading(false);
          Toast.show({
            type: 'success',
            text1: english ? 'Success' : "Succès",
            text2: res.data?.message || (english ? 'OTP verified successfully.' : "OTP vérifié avec succès."),
          });
          navigate.navigate(from == 'signup' ? 'Login' : 'NewPassword');
        })
        .catch(err => {
          setLoading(false);
          Toast.show({
            type: 'error',
            text1: english ? 'Error' : "Erreur",
            text2: err?.data?.message || (english ? 'An unexpected error occurred.' : "Une erreur inattendue est survenue."),
          });
        })
        .finally(() => setLoading(false));
  }, [code, verify, from, navigate, setLoading]);

  return (
    <SafeAreaView>
      <BackButton text={t('verifyCode', english)} />
      <KeyboardAwareScrollView bottomOffset={62} >
        <View style={{
          flex: 1, justifyContent: 'center', alignItems: 'center', width: '100%',
          height: height,
          paddingHorizontal: 20,
          paddingVertical: 20,
        }}>
          <View style={{ marginTop: -60 }}>
            <Image source={logo as ImageSourcePropType} height={100} width={100} />
          </View>
          {/* form */}
          <View style={{ width: '90%', paddingHorizontal: 20 }}>
            <Text
              style={{
                fontSize: 16,
                fontWeight: 500,
                textAlign: 'center',
                marginVertical: 20,

                color: Colors.light.primary as string,
              }}>
              {t('enter_verification_code', english)}
            </Text>
            <OtpInput
              numberOfDigits={6}
              focusColor="green"
              autoFocus={false}
              hideStick={true}
              placeholder="******"
              blurOnFilled={true}
              disabled={false}
              type="numeric"
              secureTextEntry={false}
              focusStickBlinkingDuration={500}
              // onFocus={() => console.log('Focused')}
              // onBlur={() => console.log('Blurred')}
              // onTextChange={text => console.log(text)}
              onFilled={text => setCode(text)}
              textInputProps={{
                accessibilityLabel: 'One-Time Password',
              }}
              textProps={{
                accessibilityRole: 'text',
                accessibilityLabel: 'OTP digit',
                allowFontScaling: false,
              }}
              theme={{
                pinCodeContainerStyle: {
                  backgroundColor: hexToRGBA(Colors.light.primary as string, 0.2),
                },
                pinCodeTextStyle: {
                  color: hexToRGBA(Colors.light.primary as string, 1),
                  fontWeight: 700,
                },
              }}
            />

            <View
              style={{
                paddingHorizontal: 25,
                marginTop: 40,
              }}>
              <GradientButton
                isLoading={isLoading || loading}
                handler={handleOtpChange}>
                <View>
                  <Text
                    style={{
                      color: 'white',
                      textAlign: 'center',
                      fontWeight: '700',
                      fontSize: 18,
                    }}>
                    {t('submit', english)}
                  </Text>
                </View>
              </GradientButton>
            </View>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default Otp;

const styles = StyleSheet.create({});
