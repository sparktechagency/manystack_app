import React from 'react';
import { Image, ImageSourcePropType, Text, View } from 'react-native';
import { globalStyles } from '../../constant/styles';
import { useGlobalContext } from '../../providers/GlobalContextProvider';
import { hexToRGBA } from '../../utils/hexToRGBA';

const ProfitCard = ({
  title,
  count,
  percentage,
  image,
}: {
  title: string;
  count: string;
  percentage: string;
  image?: ImageSourcePropType;
}) => {
  const { themeColors } = useGlobalContext();
  return (
    <View
      style={[
        globalStyles.flex,
        {
          justifyContent: 'space-between',
          backgroundColor: hexToRGBA(themeColors.black as string, 0.04),
          padding: 20,
          borderWidth: 0.5,
          borderColor: '#ccc',
          paddingVertical: 30,
          borderRadius: 10,
          position: 'relative',
          overflow: 'hidden',
        },
      ]}>
      {image && <Image
        source={image}
        style={{
          position: 'absolute',
          top: 20,
          right: 0,
          width: 150,
          height: 70
        }} resizeMode="contain" />}
      <View>
        <Text
          style={[
            globalStyles.inputLabel,
            { fontSize: 18, color: themeColors.black as string, fontWeight: 700 },
          ]}>
          {title}
        </Text>
        <View
          style={[
            globalStyles.flex,
            { justifyContent: 'flex-start', gap: 5, marginTop: 5 },
          ]}>
          <Text
            style={[globalStyles.inputLabel, { fontSize: 20, fontWeight: 400 }]}>
            {count}
          </Text>
          <Text
            style={[
              globalStyles.inputLabel,
              {
                fontSize: 14,
                fontWeight: 400,
                color: themeColors.primary as string,
                marginTop: -6,
              },
            ]}>
            {percentage}
          </Text>
        </View>
      </View>
      {/* <Image
        source={icon ? icon : (Profit as ImageSourcePropType)}
        style={{width: 100, height: 40}}
      /> */}
    </View>
  );
};

export default ProfitCard;

