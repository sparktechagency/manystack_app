import { NavigationProp, useNavigation } from '@react-navigation/native';
import moment from 'moment';
import React from 'react';
import {
  Image,
  ImageSourcePropType,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { DeleteIcon, DownloadPdf, Edit, eye } from '../../constant/images';
import { useGlobalContext } from '../../providers/GlobalContextProvider';
import { IInvoice } from '../../types/DataTypes';
import { StackTypes } from '../../types/ScreenPropsTypes';
import { hexToRGBA } from '../../utils/hexToRGBA';
import { CardStyles } from '../Intervention/InterventionsCards';

const InvoiceCard = ({ item }: { item: IInvoice }) => {
  const navigation = useNavigation<NavigationProp<StackTypes>>();
  const { themeColors } = useGlobalContext();
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

          <View
            style={[
              CardStyles.statusBadge,
              {
                backgroundColor:
                  item.status === 'Unpaid'
                    ? hexToRGBA(themeColors.yellow as string, 0.4)
                    : hexToRGBA(themeColors.green as string, 0.4),
              },
            ]}>
            <Text
              style={[
                CardStyles.statusText,
                {
                  color: hexToRGBA(themeColors.black as string, 0.6),
                },
              ]}>
              {item.status}
            </Text>
          </View>
        </View>
        <Text
          style={[
            CardStyles.date,
            {
              color: hexToRGBA(themeColors.black as string, 0.7),
            },
          ]}>
          {moment(item.createdAt).format('YYYY-MM-DD')}
        </Text>
        <Text
          style={[
            CardStyles.service,
            {
              color: hexToRGBA(themeColors.black as string, 0.7),
            },
          ]}>
          {item?.services?.selectedService}
        </Text>
        <Text
          style={[CardStyles.amount, { color: themeColors.primary as string }]}>
          ${item?.services?.price?.toFixed(2)}
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
          <TouchableOpacity>
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
                params: { id: item._id },
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
          <TouchableOpacity>
            <Image
              source={DeleteIcon as ImageSourcePropType}
              style={[
                CardStyles.icon,
                {
                  tintColor: themeColors.red as string,
                },
              ]}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default InvoiceCard;

const styles = StyleSheet.create({});
