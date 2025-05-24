import React, { useState } from 'react';
import { Image, ImageSourcePropType, StyleSheet, Switch, Text, TouchableOpacity, View } from 'react-native';
import { DeleteIcon, Edit, eye, logo } from '../../constant/images';
import { useGlobalContext } from '../../providers/GlobalContextProvider';
import { IIntervention } from '../../types/DataTypes';
import { hexToRGBA } from '../../utils/hexToRGBA';

const InterventionsCards = ({ item }: { item: IIntervention }) => {
  const { themeColors } = useGlobalContext()
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  return (
    <View style={[styles.card, { backgroundColor: themeColors.white as string }]}>
      <View>
        <View style={styles.headerRow}>
          <Text style={[styles.invoiceId, {
            color: themeColors.primary as string
          }]}>{item.invoice_id}</Text>
          <View style={[styles.statusBadge, {
            backgroundColor: item.status === 'Unpaid' ? hexToRGBA(themeColors.yellow as string, 0.4) : hexToRGBA(themeColors.green as string, 0.4)
          }]}>
            <Text style={[styles.statusText, {
              color: hexToRGBA(themeColors.black as string, 0.6)
            }]}>{item.status}</Text>
          </View>
        </View>
        <Text style={[styles.date, {
          color: hexToRGBA(themeColors.black as string, 0.7)
        }]}>{item.date}</Text>
        <Text style={[styles.service, {
          color: hexToRGBA(themeColors.black as string, 0.7)
        }]}>{item.service}</Text>
        <Text style={[styles.amount, { color: themeColors.primary as string }]}>${item.amount.toFixed(2)}</Text>
        <Text style={[styles.description, {
          color: hexToRGBA(themeColors.black as string, 0.7)
        }]} numberOfLines={1}>
          {item.description?.slice(0, 35)}{item.description?.length > 35 ? '...' : ''}
        </Text>

        <View style={styles.actions}>
          <TouchableOpacity>
            <Image
              source={eye as ImageSourcePropType}
              style={[styles.icon, {
                tintColor: themeColors.primary as string
              }]}
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <Image
              source={Edit as ImageSourcePropType}
              style={[styles.icon, {
                tintColor: themeColors.primary as string
              }]}
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <Image
              source={DeleteIcon as ImageSourcePropType}
              style={[styles.icon, {
                tintColor: themeColors.red as string
              }]}
            />
          </TouchableOpacity>
          <Switch
            trackColor={{ false: hexToRGBA(themeColors.black as string, 0.2), true: hexToRGBA(themeColors.primary as string, 0.2) }}
            thumbColor={isEnabled ? themeColors.primary as string : themeColors.white as string}
            ios_backgroundColor={hexToRGBA(themeColors.black as string, 0.2)}
            onValueChange={toggleSwitch}
            value={isEnabled}
          />
        </View>
      </View>
      <View style={[styles.imageContainer, {
        backgroundColor: hexToRGBA(themeColors.primary as string, 0.1)
      }]}>
        {item.images && item.images.length > 0 ? (
          <>
            <Image
              source={{ uri: item.images[0] }}
              style={styles.image}
              resizeMode="cover"
            />
            {item.images.length > 1 && (
              <View style={styles.imageOverlay}>
                <Text style={styles.imageOverlayText}>+{item.images.length - 1} image</Text>
              </View>
            )}
          </>
        ) : <Image
          source={logo as ImageSourcePropType}
          style={styles.image}
          resizeMode="cover"
        />}
      </View>

    </View>
  );
};

export default InterventionsCards;

const styles = StyleSheet.create({
  card: {
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
    flexDirection: "row",
    justifyContent: "space-between",
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
    width: '60%',
  },
  icon: {
    width: 20,
    height: 20
  },

});
