import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useGlobalContext} from '../../providers/GlobalContextProvider';
import {ISubscriptionProps} from '../../types/PropsType';
import {hexToRGBA} from '../../utils/hexToRGBA';

const SubscriptionCard = ({
  item,
  selected,
  setSelected,
}: ISubscriptionProps) => {
  const {themeColors} = useGlobalContext();
  return (
    <TouchableOpacity onPress={() => setSelected(item?._id)}>
      <View
        style={{
          backgroundColor: selected
            ? hexToRGBA(themeColors.primary as string, 0.07)
            : 'transparent',
          borderRadius: 10,
          padding: 16,
          marginBottom: 16,
          borderWidth: 1,
          borderColor: selected
            ? (themeColors.primary as string)
            : hexToRGBA(themeColors.black as string, 0.4),
        }}>
        <Text
          style={{
            fontSize: 18,
            fontWeight: '600',
            color: hexToRGBA(themeColors.black as string, 0.6),
          }}>
          {item.name}
        </Text>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center',
            gap: 1,
          }}>
          <Text
            style={{
              fontSize: 22,
              fontWeight: 700,
              color: hexToRGBA(themeColors.primary as string, 1),
            }}>
            ${item.price}
          </Text>
          <Text
            style={{
              fontSize: 26,
              fontWeight: 800,
              color: hexToRGBA(themeColors.black as string, 0.6),
            }}>
            /
          </Text>
          <Text
            style={{
              fontSize: 14,
              marginTop: 8,
              color: hexToRGBA(themeColors.black as string, 0.6),
            }}>
            {item?.validity}
          </Text>
        </View>
        <Text
          style={{
            fontSize: 16,
            marginTop: 8,
            color: hexToRGBA(themeColors.black as string, 0.6),
          }}>
          {item?.features?.join(', ')}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default SubscriptionCard;

const styles = StyleSheet.create({});
