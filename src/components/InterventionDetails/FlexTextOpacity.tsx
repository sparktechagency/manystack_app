import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { globalStyles } from '../../constant/styles';
import { useGlobalContext } from '../../providers/GlobalContextProvider';
import { hexToRGBA } from '../../utils/hexToRGBA';

const FlexTextOpacity = ({
  text1,
  text2,
  color,
}: {
  text1: string;
  text2: string;
  color?: string;
}) => {
  const { themeColors } = useGlobalContext();
  return (
    <View>
      <View
        style={[
          globalStyles.flex,
          {
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: 10,
          },
        ]}>
        <Text
          style={{
            color: hexToRGBA(themeColors.black as string, 0.6),
            fontSize: 16,
          }}>
          {text1}
        </Text>
        <Text
          style={{
            color: color ? color : hexToRGBA(themeColors.black as string, 0.6),
            fontSize: 16,
          }}>
          {text2}
        </Text>
      </View>
    </View>
  );
};

export default FlexTextOpacity;

const styles = StyleSheet.create({});
