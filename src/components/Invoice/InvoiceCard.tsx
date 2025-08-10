import { NavigationProp, useNavigation } from '@react-navigation/native';
import moment from 'moment';
import React from 'react';
import {
  ActivityIndicator,
  Image,
  ImageSourcePropType,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Checkbox, DeleteIcon, DownloadPdf, Edit, eye, Minus } from '../../constant/images';
import { deleteInvoice } from '../../hooks/invoiceApiCall';
import { useGlobalContext } from '../../providers/GlobalContextProvider';
import { IInvoice } from '../../types/DataTypes';
import { StackTypes } from '../../types/ScreenPropsTypes';
import { downloadButton } from '../../utils/DownloadPdf';
import { hexToRGBA } from '../../utils/hexToRGBA';
import { CardStyles } from '../Intervention/InterventionsCards';

const InvoiceCard = ({ item }: { item: IInvoice }) => {
  const navigation = useNavigation<NavigationProp<StackTypes>>();
  const { themeColors, currency } = useGlobalContext();
  const { deleteInvoiceHandler, isLoading } = deleteInvoice();
  return (
    <View
      style={[
        {
          padding: 12,
          borderRadius: 8,
          marginBottom: 10,
          shadowColor: '#000',
          shadowOpacity: 0.1,
          shadowRadius: 10,
          elevation: 5,
        },
        { backgroundColor: themeColors.white as string },
      ]}>
      <View>
        <View style={CardStyles.headerRow}>
          <Text
            style={[
              CardStyles.invoiceId,
              {
                color: themeColors.primary as string,
              },
            ]}>
            {item?.invoiceId}
          </Text>

          <View>
            <Image
              source={item?.status === "Unpaid" ? Minus as ImageSourcePropType : Checkbox as ImageSourcePropType}
              style={{
                height: 20,
                width: 20,
                tintColor: item.status === 'Unpaid'
                  ? hexToRGBA(themeColors.red as string, 0.9)
                  : hexToRGBA(themeColors.green as string, 0.9),
              }}
            />
          </View>
        </View>
        <Text
          style={[
            CardStyles.date,
            {
              color: hexToRGBA(themeColors.black as string, 0.7),
            },
          ]}>
          {moment(item.data).format('YYYY-MM-DD')}
        </Text>
        {/* <Text
          style={[
            CardStyles.service,
            {
              color: hexToRGBA(themeColors.black as string, 0.7),
            },
          ]}>
          {item?.services[0]?.selectedService}
        </Text> */}
        <Text
          style={[CardStyles.amount, { color: themeColors.primary as string }]}>
          {currency}
          {item?.services
            ?.reduce((acc, curr) => acc + curr.price, 0)
            .toFixed(2)}
        </Text>

        <View style={[CardStyles.actions, { width: '30%' }]}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('InvoiceDetails', {
                params: { id: item._id },
              });
            }}>
            <Image
              source={eye as ImageSourcePropType}
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
              downloadButton(`api/invoices/download/${item._id}`, 'invoice')
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
                  id: item._id,
                  address: item.address,
                  service: item.services,
                  name: item.name,
                  email: item.email,
                  phone: item.phone,
                  nSiren: item.nSiren,
                  status: item.status,
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
          <TouchableOpacity onPress={() => deleteInvoiceHandler(item._id)}>
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
      </View>
    </View>
  );
};

export default InvoiceCard;

const styles = StyleSheet.create({});
