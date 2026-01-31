import {
  NavigationProp,
  ParamListBase,
  useNavigation,
} from '@react-navigation/native';
import moment from 'moment';
import React from 'react';
import {
  ActivityIndicator,
  Image,
  ImageSourcePropType,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';
import Toast from 'react-native-toast-message';
import { DeleteIcon, Edit, eye, logo } from '../../constant/images';
import {
  updateIntervention,
  useDeleteIntervention,
} from '../../hooks/interventionApiCall';
import { useGlobalContext } from '../../providers/GlobalContextProvider';
import { IIntervention } from '../../types/DataTypes';
import { generateImageUrl } from '../../utils/baseUrls';
import { hexToRGBA } from '../../utils/hexToRGBA';

const InterventionsCards = ({ item }: { item: IIntervention }) => {
  // const { handleDeleteIntervention } = deleteIntervention()
  const { handleUpdateIntervention, isLoading: updating } = updateIntervention();
  const { handleDeleteIntervention, isLoading: deleting } =
    useDeleteIntervention();
  const navigation = useNavigation<NavigationProp<ParamListBase>>();
  const { themeColors, currency } = useGlobalContext();
  const { width } = useWindowDimensions()
  const toggleSwitch = async () => {
    const data = new FormData();
    data.append('status', item.status === 'PAID' ? 'UNPAID' : 'PAID');
    const res = await handleUpdateIntervention(data, item._id, false);
    if (res) {
      Toast.show({
        type: 'success',
        text1: item.status === 'PAID' ? 'Unpaid' : 'Paid',
        text2:
          item.status === 'PAID'
            ? 'Intervention marked as Unpaid.'
            : 'Intervention marked as Paid.',
      });
    }
  };

  return (
    <View
      style={[CardStyles.card, { backgroundColor: themeColors.white as string, }]}>
      <View
        style={{
          backgroundColor: item.status === 'UNPAID'
            ? hexToRGBA('#FFD599', 0.8)
            : hexToRGBA('#11EB4259', 0.8),
          padding: 5,
          borderRadius: 5,
          position: 'absolute',
          right: 5,
          top: 5,
          zIndex: 1,
        }}
      >
        <Text style={{
          color: '#111',
          fontSize: 10,
          fontWeight: 'bold',
        }}>{item.status}</Text>
        {/* <Image
              source={item?.status === "UNPAID" ? Minus as ImageSourcePropType : Checkbox as ImageSourcePropType}
              style={{
                height: 20,
                width: 20,
                tintColor: item.status === 'UNPAID'
                  ? hexToRGBA(themeColors.red as string, 0.9)
                  : hexToRGBA(themeColors.green as string, 0.9),
              }}
            /> */}
      </View>
      <View style={{
        width: "60%",
      }}>
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

          ¥
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
          {item?.category?.name}
        </Text>
        <Text
          style={[CardStyles.amount, { color: themeColors.primary as string }]}>
          {currency}
          {item.price.toFixed(2)}
        </Text>
        <Text
          style={[
            CardStyles.description,
            {
              color: hexToRGBA(themeColors.black as string, 0.7),
            },
          ]}
          numberOfLines={1}>
          {item?.note}
        </Text>

        <View style={CardStyles.actions}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('InterventionDetails', {
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
            onPress={() => {
              navigation.navigate('UpdateIntervention', {
                params: {
                  id: item._id,
                  category: item.category._id,
                  price: item.price?.toString(),
                  note: item.note,
                  status: item.status,
                  interventionId: item.interventionId,
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
          <TouchableOpacity onPress={() => handleDeleteIntervention(item._id)}>
            {deleting ? (
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
          {updating ? (
            <View style={{
              width: 65,
              height: 30,
              borderRadius: 15,
              backgroundColor: '#bbb2b2ff' as string,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
              <ActivityIndicator size="small" color={themeColors.primary as string} />
            </View>
          ) : (
            <Switch
              trackColor={{
                false: hexToRGBA(themeColors.black as string, 0.2),
                true: hexToRGBA(themeColors.primary as string, 0.2),
              }}
              thumbColor={
                item.status === 'PAID'
                  ? (themeColors.primary as string)
                  : (themeColors.white as string)
              }
              ios_backgroundColor={hexToRGBA(themeColors.black as string, 0.2)}
              onValueChange={toggleSwitch}
              value={item.status === 'PAID'}
            />
          )}
        </View>
      </View>
      <View
        style={[
          CardStyles.imageContainer,
          {
            backgroundColor: hexToRGBA(themeColors.primary as string, 0.1),
            width: width / 3,
            height: width / 3,
          },
        ]}>
        {item.images && item.images.length > 0 ? (
          <>
            <Image
              source={{ uri: generateImageUrl(item?.images[0]?.url as string) }}
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
    borderWidth: 1,
    borderColor: "#ccc",
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
    height: '100%',
    borderRadius: 10,
    width: '40%',
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
    backgroundColor: '#1111117a',
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
