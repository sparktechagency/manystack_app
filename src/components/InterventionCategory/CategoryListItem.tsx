import { NavigationProp, useNavigation } from '@react-navigation/native';
import React from 'react';
import {
  Image,
  ImageSourcePropType,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { DeleteIcon, Edit } from '../../constant/images';
import { globalStyles } from '../../constant/styles';
import { useGlobalContext } from '../../providers/GlobalContextProvider';
import { ICategoryListItem } from '../../types/PropsType';
import { StackTypes } from '../../types/ScreenPropsTypes';
import { hexToRGBA } from '../../utils/hexToRGBA';
import { CardStyles } from '../Intervention/InterventionsCards';

const CategoryListItem = ({ title, price, id }: ICategoryListItem) => {
  const navigation = useNavigation<NavigationProp<StackTypes>>();
  const { themeColors, width, height } = useGlobalContext();
  const textColor = hexToRGBA(themeColors.black as string, 0.6);
  return (
    <View
      style={[
        globalStyles.flex,
        {
          justifyContent: 'space-between',
          marginVertical: 5,
        },
      ]}>
      <Text
        style={{
          fontSize: 14,
          color: textColor,
          width: width * 0.4,
        }}>
        {title}
      </Text>
      <Text
        style={{
          fontSize: 14,
          color: textColor,
        }}>
        {price}
      </Text>
      <View
        style={[
          globalStyles.flex,
          {
            gap: 5,
          },
        ]}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('UpdateInterventionCategory', {
              params: { id: id, name: title, price: price },
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
  );
};

export default CategoryListItem;

const styles = StyleSheet.create({});
