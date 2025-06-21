import { NavigationProp, useNavigation } from '@react-navigation/native';
import moment from 'moment';
import React from 'react';
import {
  Image,
  ImageSourcePropType,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { DeleteIcon, DownloadPdf, Edit, logo } from '../../constant/images';
import { useGlobalContext } from '../../providers/GlobalContextProvider';
import { IExpenses } from '../../types/DataTypes';
import { StackTypes } from '../../types/ScreenPropsTypes';
import { hexToRGBA } from '../../utils/hexToRGBA';
import { CardStyles } from '../Intervention/InterventionsCards';

const ExpensesCards = ({ item }: { item: IExpenses }) => {
  const navigation = useNavigation<NavigationProp<StackTypes>>();
  const { themeColors, width } = useGlobalContext();
  return (
    <View
      style={[CardStyles.card, { backgroundColor: themeColors.white as string }]}>
      <View>
        <View style={[CardStyles.headerRow, {
          maxWidth: "70%"
        }]}>
          <Text
            numberOfLines={1}
            style={[
              CardStyles.invoiceId,
              {
                color: themeColors.primary as string,
              },
            ]}>
            {item.expenseName}
          </Text>
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
          {item.expenseCategory}
        </Text>
        <Text
          style={[CardStyles.amount, { color: themeColors.primary as string }]}>
          ${item.price.toFixed(2)}
        </Text>
        <Text
          style={[
            CardStyles.description,
            {
              color: hexToRGBA(themeColors.black as string, 0.7),
            },
          ]}
          numberOfLines={1}>
          {item.note}
        </Text>

        <View style={CardStyles.actions}>
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
              navigation.navigate('UpdateExpenses', {
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
      <View
        style={[
          CardStyles.imageContainer,
          {
            backgroundColor: hexToRGBA(themeColors.primary as string, 0.1),
          },
        ]}>
        {item.images && item.images.length > 0 ? (
          <>
            <Image
              source={{ uri: item?.images[0]?.url }}
              style={CardStyles.image}
              resizeMode="cover"
            />
            {item.images.length > 1 && (
              <View style={CardStyles.imageOverlay}>
                <Text style={CardStyles.imageOverlayText}>
                  +{item.images.length - 1} image
                </Text>
              </View>
            )}
          </>
        ) : (
          <Image
            source={logo as ImageSourcePropType}
            style={CardStyles.image}
            resizeMode="cover"
          />
        )}
      </View>
    </View>
  );
};

export default ExpensesCards;
