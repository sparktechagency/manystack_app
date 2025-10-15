import { Link, NavigationProp, useNavigation } from '@react-navigation/native';
import React, { useCallback } from 'react';
import CountryPicker from 'react-native-country-picker-modal';

import {
  ActivityIndicator,
  Dimensions,
  Image,
  ImageSourcePropType,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';
import { SafeAreaView } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';
import Address from '../../components/sheard/Address';
import BackButton from '../../components/sheard/BackButton';
import GradientButton from '../../components/sheard/GradientButton';
import { Colors } from '../../constant/colors';
import { currencyData, genderData } from '../../constant/data';
import { eye, eyeSlash } from '../../constant/images';
import { globalStyles } from '../../constant/styles';
import { useGlobalContext } from '../../providers/GlobalContextProvider';
import { useRegisterMutation } from '../../redux/Apis/authApis';
import { IAddress, ILogin, ISignUp } from '../../types/loginType';
import { StackTypes } from '../../types/ScreenPropsTypes';
import { hexToRGBA } from '../../utils/hexToRGBA';
import { t } from '../../utils/translate';
const SignUp = () => {
  const navigation = useNavigation<NavigationProp<StackTypes>>();
  const [passShow, setPassShow] = React.useState(true);
  const [cPassShow, setCPassShow] = React.useState(true);
  const [countryCode, setCountryCode] = React.useState('FR');
  const [callingCode, setCallingCode] = React.useState('33');
  const { width } = Dimensions.get('window');
  const { english } = useGlobalContext();
  const [loading, setLoading] = React.useState(false);
  const [address, setAddress] = React.useState<IAddress>({
    streetName: '',
    city: '',
    streetNo: '',
    country: '',
    postalCode: '',
  });

  const [error, setError] = React.useState({
    'first name': false,
    'last name': false,
    email: false,
    contact: false,
    gender: false,
    'N°SIREN': false,
    address: false,
    password: false,
    confirmPassword: false,
    streetName: false,
    city: false,
    streetNo: false,
    country: false,
    postalCode: false,
    currency: false,
  });

  const [inputValue, setInputValue] = React.useState<ISignUp>({
    'first name': '',
    'last name': '',
    email: '',
    currency: '',
    contact: '',
    gender: '',
    'N°SIREN': '',
    address: 'address',
    password: '',
    confirmPassword: '',
  });
  //rtk
  const [register, { isLoading }] = useRegisterMutation();

  const submitHandler = useCallback(() => {
    setLoading(true);
    let isInvalid = false;
    type Combined = ISignUp & IAddress;
    const combinedInputValue: Combined = {
      ...inputValue,
      ...address,
    };
    Object.keys(combinedInputValue).forEach(key => {
      if (combinedInputValue[key as keyof ISignUp] === '') {
        isInvalid = true;
        setError(prev => ({ ...prev, [key]: true }));
      } else {
        setError(prev => ({ ...prev, [key]: false }));
      }
    });
    if (isInvalid) {
      Toast.show({
        type: 'error',
        text1: english ? 'Please fill all fields' : "Veuillez remplir tous les champs",
        text2: english ? 'All fields are required' : "Tous les champs sont requis",
      });
      return;
    }
    const data = {
      firstName: combinedInputValue['first name'],
      lastName: combinedInputValue['last name'],
      email: combinedInputValue['email'],
      contact: `${callingCode}${combinedInputValue['contact']}`,
      nSiren: combinedInputValue['N°SIREN'],
      address: {
        streetNo: combinedInputValue['streetNo'],
        streetName: combinedInputValue['streetName'],
        city: combinedInputValue['city'],
        postalCode: combinedInputValue['postalCode'],
        country: combinedInputValue['country'],
        countryCode: `${countryCode}_${callingCode}`,
      },
      gender: combinedInputValue['gender'],
      password: combinedInputValue['password'],
      currency: combinedInputValue['currency'] || '$',
    };
    register(data)
      .unwrap()
      .then(res => {
        navigation.navigate('Otp', {
          params: { from: 'signup', email: combinedInputValue['email'] },
        });
        Toast.show({
          type: 'success',
          text1: english ? 'registered successfully' : "Enregistré avec succès",
          text2: res.message || english ? 'registered successfully' : "Enregistré avec succès",
        });
      })
      .catch(err => {
        Toast.show({
          type: 'error',
          text1: english ? 'registration failed' : "Enregistrement échoué",
          text2: err.data?.message || english ? 'Something went wrong' : "Quelque chose s'est mal passé",
        });
      });
    setLoading(false);
  }, [register, inputValue, address, callingCode, countryCode, navigation,]);
  return (
    <SafeAreaView>
      <BackButton text={t('createAccount', english)} />
      <KeyboardAwareScrollView
        style={{
          width: '100%',
          height: '100%',
          paddingHorizontal: 20,
          paddingVertical: 20,
        }}
        bottomOffset={62}>

        {Object.keys(inputValue).map((key, index, arr) => {
          if (key === 'last name' && arr[index - 1] === 'first name') {
            return null;
          }
          if (key === 'first name' && arr[index + 1] === 'last name') {
            return (
              <View
                key={`${key}-${arr[index + 1]}`}
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <View style={{ flex: 1, marginRight: 10 }}>
                  <Text style={globalStyles.inputLabel}>
                    {t('firstName', english)}
                  </Text>
                  <View style={{ position: 'relative' }}>
                    <TextInput
                      value={inputValue['first name']}
                      onChangeText={text => {
                        setInputValue({ ...inputValue, ['first name']: text });
                        setError({ ...error, ['first name']: false });
                      }}
                      placeholder={`${t('enter', english)} ${t(
                        'firstName',
                        english,
                      )}`}
                      placeholderTextColor={globalStyles.inputPlaceholder.color}
                      style={[
                        globalStyles.input,
                        error['first name'] ? globalStyles.inputError : {},
                      ]}
                    />
                  </View>
                </View>

                <View style={{ flex: 1, marginLeft: 10 }}>
                  <Text style={globalStyles.inputLabel}>
                    {t('lastName', english)}
                  </Text>
                  <View style={{ position: 'relative' }}>
                    <TextInput
                      value={inputValue['last name']}
                      onChangeText={text => {
                        setInputValue({ ...inputValue, ['last name']: text });
                        setError({ ...error, ['last name']: false });
                      }}
                      placeholder={`${t('enter', english)} ${t(
                        'lastName',
                        english,
                      )}`.slice(0, 20)}
                      placeholderTextColor={globalStyles.inputPlaceholder.color}
                      style={[
                        globalStyles.input,
                        error['last name'] ? globalStyles.inputError : {},
                      ]}
                    />
                  </View>
                </View>
              </View>
            );
          }

          if (key === 'gender') {
            return (
              <View key={key}>
                <Text style={globalStyles.inputLabel}>
                  {t('gender', english)}
                </Text>
                <Dropdown
                  style={[
                    globalStyles.input,
                    error[key as keyof ILogin] ? globalStyles.inputError : {},
                  ]}
                  data={genderData}
                  labelField="label"
                  valueField="value"
                  placeholder={t('selectGender', english)}
                  value={inputValue.gender}
                  onChange={item => {
                    setInputValue({ ...inputValue, gender: item.value });
                    setError({ ...error, gender: false });
                  }}
                  placeholderStyle={{
                    color: globalStyles.inputPlaceholder.color,
                  }}
                  selectedTextStyle={{ color: '#000' }}
                  containerStyle={{ borderRadius: 5 }}
                  dropdownPosition="auto"
                />
              </View>
            );
          }
          if (key === 'contact') {
            return (
              <View key={key}>
                <Text style={globalStyles.inputLabel}>
                  {t('contact', english)}
                </Text>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <CountryPicker
                    countryCode={countryCode as any}
                    withFlag
                    withCallingCode
                    withFilter
                    withCallingCodeButton
                    onSelect={country => {
                      setCountryCode(country.cca2);
                      setCallingCode(country.callingCode[0]);
                    }}
                    containerButtonStyle={{
                      width: 110,
                      height: 50,
                      paddingHorizontal: 10,
                      justifyContent: 'center',
                      backgroundColor: hexToRGBA(
                        Colors.light.white as string,
                        0.4,
                      ),
                    }}
                  />

                  <TextInput
                    value={inputValue.contact}
                    onChangeText={text => {
                      setInputValue({ ...inputValue, contact: text });
                      setError({ ...error, contact: false });
                    }}
                    keyboardType="phone-pad"
                    placeholderTextColor={globalStyles.inputPlaceholder.color}
                    placeholder={`Téléphone société`}
                    style={[
                      globalStyles.input,
                      {
                        paddingHorizontal: 12,
                        borderBottomRightRadius: 8,
                        borderWidth: 1,
                        width: width - 150,
                        marginBottom: 0,
                      },
                      error.contact ? globalStyles.inputError : {},
                    ]}
                  />
                </View>
              </View>
            );
          }
          if (key === 'address') {
            return (
              <Address
                address={address}
                setAddress={setAddress}
                error={error}
                key={key}
              />
            );
          }
          if (key === 'currency') {
            return (
              <View key={key}>
                <Text style={globalStyles.inputLabel}>
                  {english ? 'Currency' : 'Devise'}
                </Text>
                <Dropdown
                  onFocus={() => {
                    setError({ ...error, currency: false });
                    setInputValue({ ...inputValue, currency: '' });
                  }}
                  style={[
                    globalStyles.input,
                    error[key as keyof ILogin] ? globalStyles.inputError : {},
                  ]}
                  data={currencyData}
                  labelField="label"
                  valueField="value"
                  placeholder={t('selectCurrency', english)}
                  value={inputValue.currency}
                  onChange={item => {
                    setInputValue({ ...inputValue, currency: item.value });
                    setError({ ...error, currency: false });
                  }}
                  placeholderStyle={{
                    color: globalStyles.inputPlaceholder.color,
                  }}
                  selectedTextStyle={{ color: '#000' }}
                  containerStyle={{ borderRadius: 5 }}
                  dropdownPosition="bottom"
                />
              </View>
            );
          }
          return (
            <View key={key} style={{}}>
              <Text style={globalStyles.inputLabel}>
                {/* {key.charAt(0).toUpperCase() + key.slice(1)} */}
                {t(
                  key === 'N°SIREN'
                    ? 'siren'
                    : key === 'email'
                      ? 'email'
                      : key == 'password'
                        ? 'password'
                        : 'confirmPassword',
                  english,
                )}
              </Text>
              <View style={{ position: 'relative' }}>
                <TextInput
                  value={inputValue[key as keyof ILogin]}
                  onChangeText={text => {
                    setInputValue({ ...inputValue, [key]: text });
                    setError({ ...error, [key]: false });
                  }}
                  placeholder={key == "name" ? "Nom de la société" : key == "email" ? "E-mail société" : key == "contact" ? "Téléphone société" : key == "N°SIREN" ? "N°- SIREN société" : key == "address" ? "Adresse société" : key == "services" ? "Services" : key == "date" ? "Date" : key == "status" ? "Status" : key == "password" ? "Mot de passe" : key == "confirmPassword" ? "Confirmer le mot de passe" : ""}
                  // placeholder={`${t('enter', english)} ${t(
                  //   key === 'N°SIREN'
                  //     ? 'siren'
                  //     : key === 'email'
                  //       ? 'email'
                  //       : key == 'password'
                  //         ? 'password'
                  //         : 'confirmPassword',
                  //   english,
                  // )}`}
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
                    error[key as keyof ILogin] ? globalStyles.inputError : {},
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
          );
        })}

        <View style={{ paddingHorizontal: 25 }}>
          <GradientButton
            isLoading={isLoading || loading}
            handler={() => submitHandler()}>
            {isLoading || loading ? (
              <ActivityIndicator size="large" color="#FFFFFF" />
            ) : (
              <Text
                style={{
                  color: 'white',
                  textAlign: 'center',
                  fontWeight: '700',
                  fontSize: 18,
                }}>
                {t('signUp', english)}
              </Text>
            )}
          </GradientButton>
        </View>

        <View style={[globalStyles.flex, { marginTop: 20, marginBottom: 120 }]}>
          <Text style={globalStyles.text}>{t('alreadyAccount', english)} </Text>
          <Link screen="Login" params={{}}>
            <Text style={[{ marginLeft: 5 }, globalStyles.text]}>
              {t('login', english)}
            </Text>
          </Link>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView >
  );
};

export default SignUp;
