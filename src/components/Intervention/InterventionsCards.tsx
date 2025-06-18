import { NavigationProp, useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import {
  Image,
  ImageSourcePropType,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { DeleteIcon, Edit, eye, logo } from '../../constant/images';
import { useGlobalContext } from '../../providers/GlobalContextProvider';
import { IIntervention } from '../../types/DataTypes';
import { StackTypes } from '../../types/ScreenPropsTypes';
import { hexToRGBA } from '../../utils/hexToRGBA';

const InterventionsCards = ({ item }: { item: IIntervention }) => {
  const navigation = useNavigation<NavigationProp<StackTypes>>();
  const { themeColors } = useGlobalContext();
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  return (
    <View
      style={[CardStyles.card, { backgroundColor: themeColors.white as string }]}>
      <View>
        <View style={CardStyles.headerRow}>
          <Text
            style={[
              CardStyles.invoiceId,
              {
                color: themeColors.primary as string,
              },
            ]}>
            {item.interventionId}
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
          {item.date}
        </Text>
        <Text
          style={[
            CardStyles.service,
            {
              color: hexToRGBA(themeColors.black as string, 0.7),
            },
          ]}>
          {item.service}
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
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('InterventionDetails', {
                params: { id: item.interventionId },
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
            onPress={() => {
              navigation.navigate('UpdateIntervention', {
                params: { id: item.interventionId },
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
          <Switch
            trackColor={{
              false: hexToRGBA(themeColors.black as string, 0.2),
              true: hexToRGBA(themeColors.primary as string, 0.2),
            }}
            thumbColor={
              isEnabled
                ? (themeColors.primary as string)
                : (themeColors.white as string)
            }
            ios_backgroundColor={hexToRGBA(themeColors.black as string, 0.2)}
            onValueChange={toggleSwitch}
            value={isEnabled}
          />
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
              source={{ uri: item.images[0] }}
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

export default InterventionsCards;

export const CardStyles = StyleSheet.create({
  card: {
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  invoiceId: {
    fontWeight: '600',
    fontSize: 16,
  },
  statusBadge: {
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 6,
  },
  statusText: {
    fontWeight: '600',
  },
  date: {
    marginTop: 6,
    fontSize: 14,
  },
  service: {
    marginTop: 6,
    fontSize: 15,
  },
  amount: {
    marginTop: 6,
    fontSize: 16,
  },
  description: {
    marginTop: 4,
    fontSize: 14,
  },
  imageContainer: {
    marginTop: 10,
    width: 110,
    height: 130,
    borderRadius: 10,
    overflow: 'hidden',
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  imageOverlay: {
    position: 'absolute',
    bottom: 6,
    right: 6,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  imageOverlayText: {
    color: 'white',
    fontSize: 14,
  },
  actions: {
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '40%',
    gap: 5,
  },
  icon: {
    width: 20,
    height: 20,
  },
});
