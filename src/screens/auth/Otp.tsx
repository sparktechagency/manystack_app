import { NavigationProp, useNavigation } from '@react-navigation/native';
import React from 'react';
import { Image, ImageSourcePropType, StyleSheet, Text, View } from 'react-native';
import { OtpInput } from 'react-native-otp-entry';
import { SafeAreaView } from 'react-native-safe-area-context';
import GradientButton from '../../components/sheard/GradientButton';
import { Colors } from '../../constant/colors';
import { logo } from '../../constant/images';
import { useGlobalContext } from '../../providers/GlobalContextProvider';
import { StackTypes } from '../../types/ScreenPropsTypes';
import { hexToRGBA } from '../../utils/hexToRGBA';
import { t } from '../../utils/translate';
const Otp = () => {
  const navigate = useNavigation<NavigationProp<StackTypes>>();
  const { english } = useGlobalContext();
  return (
    <SafeAreaView
      style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <View style={{ marginTop: -60 }}>
        <Image source={logo as ImageSourcePropType} height={100} width={100} />
      </View>
      {/* form */}
      <View style={{ width: '100%', paddingHorizontal: 20 }}>
        <Text
          style={{
            fontSize: 16,
            fontWeight: 500,
            textAlign: 'center',
            marginVertical: 20,

            color: Colors.light.primary as string,
          }}>
          {t("enter_verification_code", english)}
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
          onFocus={() => console.log('Focused')}
          onBlur={() => console.log('Blurred')}
          onTextChange={text => console.log(text)}
          onFilled={text => console.log(`OTP is ${text}`)}
          textInputProps={{
            accessibilityLabel: 'One-Time Password',
          }}
          textProps={{
            accessibilityRole: 'text',
            accessibilityLabel: 'OTP digit',
            allowFontScaling: false,
          }}
          theme={{
            // containerStyle: {backgroundColor: Colors.light.white},
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
            handler={() => {
              navigate.navigate('NewPassword');
            }}>
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

export default Otp;

const styles = StyleSheet.create({});
