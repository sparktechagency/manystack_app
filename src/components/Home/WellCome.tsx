import React from 'react';
import { Image, ImageSourcePropType, StyleSheet, Text, View } from 'react-native';
import { Colors } from '../../constant/colors';
import { logo, Profile } from '../../constant/images';
import { globalStyles } from '../../constant/styles';
import { useGlobalContext } from '../../providers/GlobalContextProvider';
import { hexToRGBA } from '../../utils/hexToRGBA';
import { t } from '../../utils/translate';

const WellCome = () => {
  const { english } = useGlobalContext();
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
            {t('welcome_back', english)}
          </Text>
          <Text style={[globalStyles.inputLabel]}>Many Stake</Text>
        </View>
      </View>
      <Image
        source={Profile as ImageSourcePropType}
        style={{ width: 50, height: 50 }}
      />
    </View>
  );
};

export default WellCome;

const styles = StyleSheet.create({});
