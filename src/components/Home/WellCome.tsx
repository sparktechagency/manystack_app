import React from 'react';
import { Image, ImageSourcePropType, StyleSheet, Text, View } from 'react-native';
import { Colors } from '../../constant/colors';
import { logo, Profile } from '../../constant/images';
import { globalStyles } from '../../constant/styles';
import { useGlobalContext } from '../../providers/GlobalContextProvider';
import { generateImageUrl } from '../../utils/baseUrls';
import { hexToRGBA } from '../../utils/hexToRGBA';

const WellCome = () => {
  const { english, user } = useGlobalContext();
  return (
    <View style={[globalStyles.flex, { justifyContent: 'space-between' }]}>
      <View
        style={[globalStyles.flex, { justifyContent: 'flex-start', gap: 10 }]}>
        <Image
          source={logo as ImageSourcePropType}
          style={{ width: 40, height: 40 }}
        />
        <View>
          <Text
            style={[
              globalStyles.text,
              {
                fontSize: 12,
                color: hexToRGBA(Colors.light.black as string, 0.5),
              },
            ]}>
            Bienvenue
          </Text>
          <Text style={[globalStyles.inputLabel]}>Many Stake</Text>
        </View>
      </View>
      <Image
        source={
          user?.profilePicture
            ? { uri: generateImageUrl(user?.profilePicture as string) }
            : (Profile as ImageSourcePropType)
        }
        style={{ width: 50, height: 50, borderRadius: 50 }}
      />
    </View>
  );
};

export default WellCome;

const styles = StyleSheet.create({});
