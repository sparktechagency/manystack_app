import {Link} from '@react-navigation/native';
import React from 'react';
import CountryPicker from 'react-native-country-picker-modal';

import {
  Dimensions,
  Image,
  ImageSourcePropType,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';
import {SafeAreaView} from 'react-native-safe-area-context';
import Address from '../../components/sheard/Address';
import GradientButton from '../../components/sheard/GradientButton';
import {Colors} from '../../constant/colors';
import {eye, eyeSlash} from '../../constant/images';
import {globalStyles} from '../../constant/styles';
import {IAddress, ILogin, ISignUp} from '../../types/loginType';
import {hexToRGBA} from '../../utils/hexToRGBA';
import {genderData} from '../../constant/data';
const SignUp = () => {
  const [passShow, setPassShow] = React.useState(true);
  const [cPassShow, setCPassShow] = React.useState(true);
  const [countryCode, setCountryCode] = React.useState('BD');
  const [callingCode, setCallingCode] = React.useState('880');
  const {width} = Dimensions.get('window');

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
  });

  const [inputValue, setInputValue] = React.useState<ISignUp>({
    'first name': 'shaharul',
    'last name': 'siyam',
    email: 'siyamoffice0273@gmail',
    contact: '01700000000',
    gender: 'male',
    'N°SIREN': '123456789',
    address: 'Dhaka',
    password: '123456',
    confirmPassword: '123456',
  });

  const submitHandler = () => {
    type Combined = ISignUp & IAddress;
    const combinedInputValue: Combined = {
      ...inputValue,
      ...address,
    };
    Object.keys(combinedInputValue).forEach(key => {
      if (combinedInputValue[key as keyof ISignUp] === '') {
        setError(prev => ({...prev, [key]: true}));
      } else {
        setError(prev => ({...prev, [key]: false}));
      }
    });
  };

  return (
    <SafeAreaView>
      <ScrollView
        style={{
          width: '100%',
          height: '100%',
          paddingHorizontal: 20,
          paddingVertical: 20,
        }}>
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
                <View style={{flex: 1, marginRight: 10}}>
                  <Text style={globalStyles.inputLabel}>First Name</Text>
                  <View style={{position: 'relative'}}>
                    <TextInput
                      value={inputValue['first name']}
                      onChangeText={text => {
                        setInputValue({...inputValue, ['first name']: text});
                        setError({...error, ['first name']: false});
                      }}
                      placeholder="Enter your first name"
                      placeholderTextColor={globalStyles.inputPlaceholder.color}
                      style={[
                        globalStyles.input,
                        error['first name'] ? globalStyles.inputError : {},
                      ]}
                    />
                  </View>
                </View>

                <View style={{flex: 1, marginLeft: 10}}>
                  <Text style={globalStyles.inputLabel}>Last Name</Text>
                  <View style={{position: 'relative'}}>
                    <TextInput
                      value={inputValue['last name']}
                      onChangeText={text => {
                        setInputValue({...inputValue, ['last name']: text});
                        setError({...error, ['last name']: false});
                      }}
                      placeholder="Enter your last name"
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
                <Text style={globalStyles.inputLabel}>Gender</Text>
                <Dropdown
                  style={[
                    globalStyles.input,
                    error[key as keyof ILogin] ? globalStyles.inputError : {},
                  ]}
                  data={genderData}
                  labelField="label"
                  valueField="value"
                  placeholder="Select Gender"
                  value={inputValue.gender}
                  onChange={item => {
                    setInputValue({...inputValue, gender: item.value});
                    setError({...error, gender: false});
                  }}
                  placeholderStyle={{
                    color: globalStyles.inputPlaceholder.color,
                  }}
                  selectedTextStyle={{color: '#000'}}
                  containerStyle={{borderRadius: 5}}
                  dropdownPosition="auto"
                />
              </View>
            );
          }
          if (key === 'contact') {
            return (
              <View key={key}>
                <Text style={globalStyles.inputLabel}>Contact</Text>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
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
                      setInputValue({...inputValue, contact: text});
                      setError({...error, contact: false});
                    }}
                    placeholder="Enter your contact number"
                    keyboardType="phone-pad"
                    placeholderTextColor={globalStyles.inputPlaceholder.color}
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

          return (
            <View key={key} style={{}}>
              <Text style={globalStyles.inputLabel}>
                {key.charAt(0).toUpperCase() + key.slice(1)}
              </Text>
              <View style={{position: 'relative'}}>
                <TextInput
                  value={inputValue[key as keyof ILogin]}
                  onChangeText={text => {
                    setInputValue({...inputValue, [key]: text});
                    setError({...error, [key]: false});
                  }}
                  placeholder={`Enter your ${key}`}
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
                    style={{position: 'absolute', right: 10, top: 15}}
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
                      style={{width: 20, height: 20}}
                    />
                  </TouchableOpacity>
                )}
              </View>
            </View>
          );
        })}

        <View style={{paddingHorizontal: 25}}>
          <GradientButton handler={() => submitHandler()}>
            <Text
              style={{
                color: 'white',
                textAlign: 'center',
                fontWeight: '700',
                fontSize: 18,
              }}>
              Sign Up
            </Text>
          </GradientButton>
        </View>

        <View style={[globalStyles.flex, {marginTop: 20, marginBottom: 120}]}>
          <Text style={globalStyles.text}>Already have an account? </Text>
          <Link screen="Login" params={{}}>
            <Text style={[{marginLeft: 5}, globalStyles.text]}>Login</Text>
          </Link>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUp;
