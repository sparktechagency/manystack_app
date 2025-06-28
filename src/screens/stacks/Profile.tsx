import React from 'react';
import CountryPicker from 'react-native-country-picker-modal';

import { NavigationProp, ParamListBase, useNavigation } from '@react-navigation/native';
import { ActivityIndicator, ScrollView, Text, TextInput, View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { SafeAreaView } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';
import Address from '../../components/sheard/Address';
import GradientButton from '../../components/sheard/GradientButton';
import { Colors } from '../../constant/colors';
import { genderData } from '../../constant/data';
import { globalStyles } from '../../constant/styles';
import { useUpdateProfile } from '../../hooks/userApiCalls';
import { useGlobalContext } from '../../providers/GlobalContextProvider';
import { IAddress, ILogin, IUpdateProfile } from '../../types/loginType';
import { hexToRGBA } from '../../utils/hexToRGBA';

const Profile = () => {
  const navigation = useNavigation<NavigationProp<ParamListBase>>();
  const [countryCode, setCountryCode] = React.useState('BD');
  const { width, user } = useGlobalContext();
  const [address, setAddress] = React.useState<IAddress>({
    streetName: user?.address?.streetName || '',
    city: user?.address?.city || '',
    streetNo: user?.address?.streetNo || '',
    country: user?.address?.country || '',
    postalCode: user?.address?.postalCode || '',
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
  const [inputValue, setInputValue] = React.useState<IUpdateProfile>({
    'first name': user?.firstName as string,
    'last name': user?.lastName as string,
    email: user?.email as string,
    contact: user?.contact as string,
    gender: user?.gender as string,
    'N°SIREN': user?.nSiren as string,
    address: "address",
  });
  const { updateProfileHandler, isLoading } = useUpdateProfile();
  const submitHandler = () => {
    let invalid = false;
    type Combined = IUpdateProfile & IAddress;
    const combinedInputValue: Combined = {
      ...inputValue,
      ...address,
    };
    Object.keys(combinedInputValue).forEach(key => {
      if (combinedInputValue[key as keyof Combined] === '') {
        setError(prev => ({ ...prev, [key]: true }));
        invalid = true;
      } else {
        setError(prev => ({ ...prev, [key]: false }));
      }
    });
    if (invalid) return Toast.show({
      type: 'error',
      text1: 'Please fill all the fields',
    });
    const data = {
      "firstName": inputValue['first name'],
      "lastName": inputValue['last name'],
      "contact": inputValue.contact,
      "siren": inputValue['N°SIREN'],
      "address": {
        "streetNo": address.streetNo,
        "streetName": address.streetName,
        "city": address.city,
        "postalCode": address.postalCode,
        "country": address.country
      },
      "gender": inputValue.gender
    }
    updateProfileHandler(data, () => {
      navigation.goBack()
    })

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
                <View style={{ flex: 1, marginRight: 10 }}>
                  <Text style={globalStyles.inputLabel}>First Name</Text>
                  <View style={{ position: 'relative' }}>
                    <TextInput
                      value={inputValue['first name']}
                      onChangeText={text => {
                        setInputValue({ ...inputValue, ['first name']: text });
                        setError({ ...error, ['first name']: false });
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

                <View style={{ flex: 1, marginLeft: 10 }}>
                  <Text style={globalStyles.inputLabel}>Last Name</Text>
                  <View style={{ position: 'relative' }}>
                    <TextInput
                      value={inputValue['last name']}
                      onChangeText={text => {
                        setInputValue({ ...inputValue, ['last name']: text });
                        setError({ ...error, ['last name']: false });
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
                <Text style={globalStyles.inputLabel}>Contact</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <CountryPicker
                    countryCode={countryCode as any}
                    withFlag
                    withCallingCode
                    withFilter
                    withCallingCodeButton
                    onSelect={country => {
                      setCountryCode(country.cca2);
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
              <View style={{ position: 'relative' }}>
                <TextInput
                  value={inputValue[key as keyof IUpdateProfile]}
                  onChangeText={text => {
                    setInputValue({ ...inputValue, [key]: text });
                    setError({ ...error, [key]: false });
                  }}
                  placeholder={`Enter your ${key}`}
                  placeholderTextColor={globalStyles.inputPlaceholder.color}
                  style={[
                    globalStyles.input,
                    error[key as keyof IUpdateProfile]
                      ? globalStyles.inputError
                      : {},
                  ]}
                />
              </View>
            </View>
          );
        })}

        <View style={{ paddingHorizontal: 25, marginBottom: 120 }}>
          <GradientButton handler={submitHandler}>
            {
              isLoading ? (
                <ActivityIndicator color="white" size="small" />
              ) : (
                <Text
                  style={{
                    color: 'white',
                    textAlign: 'center',
                    fontWeight: '700',
                    fontSize: 18,
                  }}>
                  Save Changes
                </Text>
              )
            }
          </GradientButton>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;
