import DateTimePicker from '@react-native-community/datetimepicker';
import React from 'react';
import {
  Image,
  ImageSourcePropType,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import CountryPicker from 'react-native-country-picker-modal';
import {Dropdown} from 'react-native-element-dropdown';
import {SafeAreaView} from 'react-native-safe-area-context';
import Address from '../../components/sheard/Address';
import GradientButton from '../../components/sheard/GradientButton';
import {Colors} from '../../constant/colors';
import {genderData, paymentStatus} from '../../constant/data';
import {Calender} from '../../constant/images';
import {globalStyles} from '../../constant/styles';
import {useGlobalContext} from '../../providers/GlobalContextProvider';
import {IAddress, IInvoiceForm, IInvoiceService} from '../../types/loginType';
import {hexToRGBA} from '../../utils/hexToRGBA';
import InvoiceService from './InvoiceService';
import {generateRandom} from '../../utils/generateRandom';
const InvoiceCreateUpdateForm = () => {
  const [serviceDate, setServiceDate] = React.useState<Date | undefined>();
  const [passShow, setPassShow] = React.useState(true);
  const [cPassShow, setCPassShow] = React.useState(true);
  const [countryCode, setCountryCode] = React.useState('BD');
  const [callingCode, setCallingCode] = React.useState('880');
  const [showPicker, setShowPicker] = React.useState(false);
  const {width, themeColors} = useGlobalContext();

  const [address, setAddress] = React.useState<IAddress>({
    streetName: '',
    city: '',
    streetNo: '',
    country: '',
    postalCode: '',
  });
  const [service, setService] = React.useState<IInvoiceService[]>([
    {
      id: generateRandom(),
      service: '',
      quantity: '',
      price: '',
    },
  ]);

  const [error, setError] = React.useState({
    name: false,
    email: false,
    contact: false,
    gender: false,
    'N°SIREN': false,
    address: false,
    services: false,
    date: false,
    status: false,
    streetName: false,
    city: false,
    streetNo: false,
    country: false,
    postalCode: false,
    service: false,
    quantity: false,
    price: false,
  });

  const [inputValue, setInputValue] = React.useState<IInvoiceForm>({
    name: 'shaharul',
    email: 'siyamoffice0273@gmail',
    contact: '01700000000',
    gender: 'male',
    'N°SIREN': '123456789',
    address: 'Dhaka',
    services: 'web development',
    date: '01/01/2023',
    status: 'paid',
  });

  const submitHandler = () => {
    type Combined = IInvoiceForm & IAddress;
    const combinedInputValue: Combined = {
      ...inputValue,
      ...address,
    };
    Object.keys(combinedInputValue).forEach(key => {
      if (combinedInputValue[key as keyof IInvoiceForm] === '') {
        setError(prev => ({...prev, [key]: true}));
      } else {
        setError(prev => ({...prev, [key]: false}));
      }
    });
  };
  const formatDate = (date?: Date) => {
    if (!date) return '00/00/000';
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const onFromChange = (event: any, selectedDate?: Date) => {
    setShowPicker(Platform.OS === 'ios');
    if (selectedDate) {
      setServiceDate(selectedDate);
      setInputValue({...inputValue, date: formatDate(selectedDate)});
    }
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
          if (key === 'gender') {
            return (
              <View key={key}>
                <Text style={globalStyles.inputLabel}>Gender</Text>
                <Dropdown
                  style={[
                    globalStyles.input,
                    error[key as keyof IInvoiceForm]
                      ? globalStyles.inputError
                      : {},
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
          if (key === 'status') {
            return (
              <View key={key}>
                <Text style={globalStyles.inputLabel}>Status</Text>
                <Dropdown
                  style={[
                    globalStyles.input,
                    error[key as keyof IInvoiceForm]
                      ? globalStyles.inputError
                      : {},
                  ]}
                  data={paymentStatus}
                  labelField="label"
                  valueField="value"
                  placeholder="Select Status"
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
          if (key === 'services') {
            return (
              <InvoiceService
                service={service}
                setService={setService}
                error={error}
                setError={setError}
                key={key}
              />
            );
          }
          if (key === 'date') {
            return (
              <View>
                <Text
                  style={[
                    {
                      fontSize: 14,
                      marginBottom: 6,
                      color: showPicker
                        ? hexToRGBA(themeColors.primary as string, 1)
                        : hexToRGBA(themeColors.black as string, 0.6),
                    },
                  ]}>
                  Date
                </Text>
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={() => setShowPicker(true)}>
                  <View
                    style={[
                      globalStyles.input,
                      {
                        flexDirection: 'row',
                        alignItems: 'center',
                        gap: 10,
                      },
                      error[key as keyof IInvoiceForm]
                        ? globalStyles.inputError
                        : {},
                      {
                        borderColor: showPicker
                          ? hexToRGBA(themeColors.primary as string, 1)
                          : hexToRGBA(themeColors.black as string, 0.3),
                      },
                    ]}>
                    <Image
                      source={Calender as ImageSourcePropType}
                      style={{
                        height: 20,
                        width: 20,
                      }}
                    />
                    <Text
                      style={[
                        {
                          flex: 1,
                          fontSize: 14,
                          paddingVertical: 6,
                        },
                        {
                          color: showPicker
                            ? hexToRGBA(themeColors.primary as string, 1)
                            : hexToRGBA(themeColors.black as string, 0.6),
                        },
                      ]}>
                      {formatDate(serviceDate)}
                    </Text>
                  </View>
                </TouchableOpacity>
                {showPicker && (
                  <DateTimePicker
                    value={serviceDate || new Date()}
                    mode="date"
                    display="default"
                    onChange={onFromChange}
                    // maximumDate={toDate}
                  />
                )}
              </View>
            );
          }
          return (
            <View key={key} style={{}}>
              <Text style={globalStyles.inputLabel}>
                {key.charAt(0).toUpperCase() + key.slice(1)}
              </Text>
              <View style={{position: 'relative'}}>
                <TextInput
                  value={inputValue[key as keyof IInvoiceForm]}
                  onChangeText={text => {
                    setInputValue({...inputValue, [key]: text});
                    setError({...error, [key]: false});
                  }}
                  placeholder={`Enter your ${key}`}
                  placeholderTextColor={globalStyles.inputPlaceholder.color}
                  style={[
                    globalStyles.input,
                    error[key as keyof IInvoiceForm]
                      ? globalStyles.inputError
                      : {},
                  ]}
                />
              </View>
            </View>
          );
        })}

        <View style={{paddingHorizontal: 25, marginBottom: 120}}>
          <GradientButton handler={() => submitHandler()}>
            <Text
              style={{
                color: 'white',
                textAlign: 'center',
                fontWeight: '700',
                fontSize: 18,
              }}>
              Submit
            </Text>
          </GradientButton>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default InvoiceCreateUpdateForm;
