import {
  NavigationProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import moment from 'moment';
import React from 'react';
import {
  ActivityIndicator,
  Image,
  ImageSourcePropType,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View
} from 'react-native';
import { Text } from 'react-native-gesture-handler';
import { DeleteIcon, DownloadPdf, Edit, FullLogo } from '../../constant/images';
import { globalStyles } from '../../constant/styles';
import {
  deleteInvoice,
  useMarkPaidUnpaid,
  useUpdateInvoice,
} from '../../hooks/invoiceApiCall';
import { useGlobalContext } from '../../providers/GlobalContextProvider';
import { useGetInvoiceByIdQuery } from '../../redux/Apis/invoiceApis';
import { IInvoice } from '../../types/DataTypes';
import { StackTypes } from '../../types/ScreenPropsTypes';
import { downloadButton } from '../../utils/DownloadPdf';
import { hexToRGBA } from '../../utils/hexToRGBA';
import { t } from '../../utils/translate';
import { CardStyles } from '../Intervention/InterventionsCards';
import FlexTextOpacity from '../InterventionDetails/FlexTextOpacity';
import BackButton from '../sheard/BackButton';
import GradientButton from '../sheard/GradientButton';

const InvoiceDetails = () => {
  const { params }: any = useRoute();
  const navigation = useNavigation<NavigationProp<StackTypes>>();
  const { themeColors, user, height, english } = useGlobalContext();
  const { data } = useGetInvoiceByIdQuery(params?.params?.id);
  const { deleteInvoiceHandler, isLoading } = deleteInvoice();
  const { updateInvoiceHandler, isLoading: updateInvoiceLoading } =
    useUpdateInvoice();
  const { markPaidUnpaidHandler, isLoading: markPaidUnpaidLoading } =
    useMarkPaidUnpaid();
  const invoice = data?.invoice as IInvoice;
  return (
    <SafeAreaView
      style={{
        position: 'relative',
      }}>
      <BackButton text={t('details', english)} />
      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        style={{
          height: height,
          paddingHorizontal: 20,
          paddingVertical: 20,
        }}>
        <View
          style={[
            globalStyles.flex,
            {
              justifyContent: 'space-between',
              alignItems: 'center',
              paddingBottom: 10,
              marginTop: 10,
              borderBottomWidth: 1,
              borderBottomColor: hexToRGBA(themeColors.primary as string, 0.5),
            },
          ]}>
          <Image
            source={FullLogo as ImageSourcePropType}
            style={{
              height: 60,
              width: 60,
              borderRadius: 8,
            }}
          />
          <View>
            <Text
              style={[
                globalStyles.inputLabel,
                { color: themeColors.primary as string, textAlign: 'right' },
              ]}>
              {invoice?.invoiceId}
            </Text>
            <Text
              style={[
                {
                  color: hexToRGBA(themeColors.black as string, 0.6),
                  textAlign: 'right',
                },
              ]}>
              {moment(invoice?.data).format('YYYY-MM-DD')}
            </Text>
          </View>
        </View>

        <Text style={[globalStyles.inputLabel, { marginTop: 20 }]}>
          User Details
        </Text>
        <View
          style={[
            CardStyles.actions,
            { width: 90, marginLeft: 'auto', top: -35 },
          ]}>
          <TouchableOpacity
            onPress={() =>
              downloadButton(`api/invoices/download/${invoice?._id}`, 'invoice')
            }>
            <Image
              source={DownloadPdf as ImageSourcePropType}
              style={[
                CardStyles.icon,
                {
                  tintColor: themeColors.primary as string,
                },
              ]}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('UpdateInvoice', {
                params: {
                  id: invoice?._id,
                  address: invoice?.address,
                  service: invoice?.services,
                  name: invoice?.name,
                  email: invoice?.email,
                  phone: invoice?.phone,
                  nSiren: invoice?.nSiren,
                  status: invoice?.status,
                },
              });
            }}>
            <Image
              source={Edit as ImageSourcePropType}
              style={[
                CardStyles.icon,
                {
                  tintColor: themeColors.primary as string,
                },
              ]}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              deleteInvoiceHandler(invoice?._id, () => navigation.goBack())
            }
            disabled={isLoading}>
            {isLoading ? (
              <ActivityIndicator
                size="small"
                color={themeColors.primary as string}
              />
            ) : (
              <Image
                source={DeleteIcon as ImageSourcePropType}
                style={[
                  CardStyles.icon,
                  {
                    tintColor: themeColors.red as string,
                  },
                ]}
              />
            )}
          </TouchableOpacity>
        </View>
        <FlexTextOpacity
          text1={english ? 'Name :' : 'Nom :'}
          text2={user?.firstName + ' ' + user?.lastName}
        />
        <FlexTextOpacity
          text1={english ? 'Email :' : 'Email :'}
          text2={user?.email + ' '}
        />
        <FlexTextOpacity
          text1={english ? 'Contact :' : 'Contact :'}
          text2={user?.contact + ' '}
        />
        <FlexTextOpacity
          text1={english ? 'Address :' : 'Adresse :'}
          text2={
            user?.address?.streetName +
            ' ' +
            user?.address?.streetNo +
            ' ' +
            user?.address?.city +
            ' ' +
            user?.address?.postalCode +
            ' ' +
            user?.address?.country
          }
        />
        <Text style={[globalStyles.inputLabel, { marginTop: 20 }]}>
          Customer Details
        </Text>
        <FlexTextOpacity
          text1={english ? 'Name :' : 'Nom :'}
          text2={invoice?.name}
        />
        <FlexTextOpacity
          text1={english ? 'Email :' : 'Email :'}
          text2={invoice?.email}
        />
        <FlexTextOpacity
          text1={english ? 'Contact :' : 'Contact :'}
          text2={invoice?.phone}
        />
        <FlexTextOpacity
          text1={english ? 'Address :' : 'Adresse :'}
          text2={
            invoice?.address?.streetNo +
            ' ' +
            invoice?.address?.streetName +
            ' ' +
            invoice?.address?.city +
            ' ' +
            invoice?.address?.postalCode +
            ' ' +
            invoice?.address?.country
          }
        />
        <FlexTextOpacity
          text1={english ? 'Siren no :' : 'N°SIREN :'}
          text2={invoice?.nSiren}
          color={themeColors.primary as string}
        />
        <Text style={[globalStyles.inputLabel, { marginTop: 20 }]}>
          {english ? 'Services' : 'Services'}
        </Text>
        <View
          style={[
            {
              paddingBottom: 10,
              borderBottomWidth: 1,
              borderBottomColor: hexToRGBA(themeColors.primary as string, 0.5),
            },
          ]}>
          <View
            style={[
              globalStyles.flex,
              {
                justifyContent: 'space-between',
                alignItems: 'center',
                backgroundColor: hexToRGBA(themeColors.primary as string, 0.2),
                padding: 20,
                paddingVertical: 16,
                borderRadius: 8,
                marginBottom: 10,
              },
            ]}>
            <Text style={{ color: hexToRGBA(themeColors.black as string, 0.6) }}>
              {' '}
              No
            </Text>
            <Text style={{ color: hexToRGBA(themeColors.black as string, 0.6) }}>
              {' '}
              {english ? 'Name' : 'Nom'}
            </Text>
            <Text style={{ color: hexToRGBA(themeColors.black as string, 0.6) }}>
              {' '}
              {english ? 'Quantity' : 'Quantité'}
            </Text>
            <Text style={{ color: hexToRGBA(themeColors.black as string, 0.6) }}>
              {' '}
              {english ? 'Price' : 'Prix'}
            </Text>
          </View>
          {invoice?.services.map((service, index) => (
            <View
              key={index}
              style={[
                globalStyles.flex,
                {
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: 20,
                  paddingVertical: 16,
                  borderRadius: 8,
                },
              ]}>
              <Text
                style={{ color: hexToRGBA(themeColors.black as string, 0.6) }}>
                {index + 1}
              </Text>
              <Text
                style={{ color: hexToRGBA(themeColors.black as string, 0.6) }}>
                {service.selectedService}
              </Text>
              <Text
                style={{ color: hexToRGBA(themeColors.black as string, 0.6) }}>
                {service.quantity}
              </Text>
              <Text
                style={{ color: hexToRGBA(themeColors.black as string, 0.6) }}>
                ${service.price}
              </Text>
            </View>
          ))}
        </View>
        <FlexTextOpacity
          text1={english ? 'Total :' : 'Total :'}
          text2={invoice?.services
            .reduce((acc, curr) => acc + curr.price * curr.quantity, 0)
            .toFixed(2)}
          color={themeColors.primary as string}
        />
        <FlexTextOpacity
          text1={english ? 'Status :' : 'Status :'}
          text2={invoice?.status}
          color={
            invoice?.status === 'UNPAID'
              ? (themeColors.red as string)
              : (themeColors.green as string)
          }
        />

        <View
          style={{
            paddingHorizontal: 25,
            // position: 'absolute',
            // bottom: 100,
            marginBottom: 100,
            width: '100%',
            paddingVertical: 16,
          }}>
          <GradientButton handler={() => markPaidUnpaidHandler(invoice?._id)}>
            {markPaidUnpaidLoading ? (
              <ActivityIndicator size="small" color="white" />
            ) : (
              <Text
                style={{
                  color: 'white',
                  textAlign: 'center',
                  fontWeight: 700,
                  fontSize: 18,
                }}>
                Mark As{' '}
                {english
                  ? invoice?.status === 'UNPAID'
                    ? 'Paid'
                    : 'Unpaid'
                  : invoice?.status === 'UNPAID'
                    ? 'Payé'
                    : 'Non payé'}
              </Text>
            )}
          </GradientButton>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default InvoiceDetails;

const styles = StyleSheet.create({});
