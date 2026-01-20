import DateTimePicker from '@react-native-community/datetimepicker';
import { useNavigation, useRoute } from '@react-navigation/native';
import moment from 'moment';
import React from 'react';
import {
  Image,
  ImageSourcePropType,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import CountryPicker from 'react-native-country-picker-modal';
import { Dropdown } from 'react-native-element-dropdown';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Address from '../../components/sheard/Address';
import GradientButton from '../../components/sheard/GradientButton';
import { Colors } from '../../constant/colors';
import { paymentStatus } from '../../constant/data';
import { Calender } from '../../constant/images';
import { globalStyles } from '../../constant/styles';
import { TranslationKey } from '../../constant/translations';
import { useCreateInvoice, useUpdateInvoice } from '../../hooks/invoiceApiCall';
import { useGlobalContext } from '../../providers/GlobalContextProvider';
import { IAddress, IInvoiceForm, IInvoiceService } from '../../types/loginType';
import { generateRandom } from '../../utils/generateRandom';
import { hexToRGBA } from '../../utils/hexToRGBA';
import { t } from '../../utils/translate';
import BackButton from '../sheard/BackButton';
import InvoiceService from './InvoiceService';
const InvoiceCreateUpdateForm = () => {
  const { params }: any = useRoute();
  const [serviceDate, setServiceDate] = React.useState<Date | undefined>(new Date(params?.params?.date));
  const [countryCode, setCountryCode] = React.useState('FR');
  const [showPicker, setShowPicker] = React.useState(false);
  const [isSubmitLoading, setIsSubmitLoading] = React.useState(false);
  const { width, themeColors, user, english, height } = useGlobalContext();
  const navigation = useNavigation();
  const { top, bottom } = useSafeAreaInsets();
  const [address, setAddress] = React.useState<IAddress>({
    streetName: params?.params?.address?.streetName,
    city: params?.params?.address?.city,
    streetNo: params?.params?.address?.streetNo,
    country: params?.params?.address?.country,
    postalCode: params?.params?.address?.postalCode,
  });

  const [service, setService] = React.useState<IInvoiceService[]>(
    params?.params?.service.map((item: any) => ({
      id: generateRandom(),
      service: item.selectedService,
      quantity: item.quantity?.toString(),
      price: item.price?.toString(),
    })) || [
      {
        id: generateRandom(),
        service: '',
        quantity: '',
        price: '',
      },
    ],
  );

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
    name: params?.params?.name,
    email: params?.params?.email,
    contact: params?.params?.phone,
    // gender: 'male',
    'N°SIREN': params?.params?.nSiren,
    address: 'Dhaka',
    services: 'web development',
    date: params?.params?.date,
    status: params?.params?.status || "UNPAID",
  });
  const { createInvoiceHandler, isLoading } = useCreateInvoice();
  const { updateInvoiceHandler, isLoading: updateLoading } = useUpdateInvoice();
  const submitHandler = async () => {
    setIsSubmitLoading(true);
    let invalid = false;
    type Combined = IInvoiceForm & IAddress;
    const combinedInputValue: Combined = {
      ...inputValue,
      ...address,
    };
    Object.keys(combinedInputValue).forEach(key => {
      if (combinedInputValue[key as keyof IInvoiceForm] === '') {
        setError(prev => ({ ...prev, [key]: true }));
        invalid = true;
      } else {
        setError(prev => ({ ...prev, [key]: false }));
      }
    });
    if (invalid) {
      setIsSubmitLoading(false);
      return;
    }
    const services = service.map((item: any) => ({
      selectedService: item.service,
      quantity: item.quantity,
      price: item.price,
    }));
    const data = {
      name: inputValue?.name,
      email: inputValue?.email,
      phone: inputValue?.contact,
      nSiren: inputValue['N°SIREN'],
      address: address,
      services: services,
      status: inputValue.status,
      data: moment(inputValue.date).format('YYYY-MM-DD'),
      user: user?._id,
    };
    params?.params?.id
      ? await updateInvoiceHandler(data, params?.params?.id, () => {
        navigation.goBack();
        setIsSubmitLoading(false);
      })
      : await createInvoiceHandler(data, () => {
        navigation.goBack();
        setIsSubmitLoading(false);
      });
    const timer = setTimeout(() => {
      setIsSubmitLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
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
      setInputValue({ ...inputValue, date: formatDate(selectedDate) });
    }
  };

  return (
    <View style={{ paddingTop: top, paddingBottom: bottom, }}>
      <BackButton text={params?.params?.id ? t('updateInvoice', english) : t('createInvoice', english)} />
      <KeyboardAwareScrollView bottomOffset={62}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        style={{
          height: height,
          paddingHorizontal: 20,
          paddingVertical: 20,
        }}
      >
        {Object.keys(inputValue).map((key, index, arr) => {
          // if (key === 'gender') {
          //   return (
          //     <View key={key}>
          //       <Text style={globalStyles.inputLabel}>Gender</Text>
          //       <Dropdown
          //         style={[
          //           globalStyles.input,
          //           error[key as keyof IInvoiceForm]
          //             ? globalStyles.inputError
          //             : {},
          //         ]}
          //         data={genderData}
          //         labelField="label"
          //         valueField="value"
          //         placeholder="Select Gender"
          //         value={inputValue.gender}
          //         onChange={item => {
          //           setInputValue({ ...inputValue, gender: item.value });
          //           setError({ ...error, gender: false });
          //         }}
          //         placeholderStyle={{
          //           color: globalStyles.inputPlaceholder.color,
          //         }}
          //         selectedTextStyle={{ color: '#000' }}
          //         containerStyle={{ borderRadius: 5 }}
          //         dropdownPosition="auto"
          //       />
          //     </View>
          //   );
          // }
          if (key === 'status') {
            return (
              <View key={key}>
                <Text style={globalStyles.inputLabel}>
                  {t(key as TranslationKey, english)}
                </Text>
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
                  placeholder={t('status', english)}
                  value={inputValue.status}
                  onChange={item => {
                    setInputValue({ ...inputValue, status: item.value });
                    setError({ ...error, status: false });
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
                  {t(key as TranslationKey, english)}
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
                    placeholder={`Téléphone société`}
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
                {t(key as TranslationKey, english)}
              </Text>
              <View style={{ position: 'relative' }}>
                <TextInput
                  value={inputValue[key as keyof IInvoiceForm]}
                  onChangeText={text => {
                    setInputValue({ ...inputValue, [key]: text });
                    setError({ ...error, [key]: false });
                  }}
                  placeholder={key == "name" ? "Nom de la société" : key == "email" ? "E-mail société" : key == "contact" ? "Téléphone société" : key == "N°SIREN" ? "N°- SIREN société" : key == "address" ? "Adresse société" : key == "services" ? "Services" : key == "date" ? "Date" : key == "status" ? "Status" : ""}
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

        <View style={{ paddingHorizontal: 25, marginBottom: 140 }}>
          <GradientButton isLoading={isSubmitLoading} handler={() => submitHandler()}>
            <Text
              style={{
                color: 'white',
                textAlign: 'center',
                fontWeight: '700',
                fontSize: 18,
              }}>
              Soumettre
            </Text>
          </GradientButton>
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
};

export default InvoiceCreateUpdateForm;
