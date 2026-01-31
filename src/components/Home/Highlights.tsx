import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { globalStyles } from '../../constant/styles';
import { useGlobalContext } from '../../providers/GlobalContextProvider';
import { hexToRGBA } from '../../utils/hexToRGBA';
import { t } from '../../utils/translate';

const Highlights = ({
  interventionCount,
  priceCount,
}: {
  interventionCount: string;
  priceCount: string;
}) => {
  const { width, themeColors, english } = useGlobalContext();
  const data = [
    { count: priceCount, title: t('total_price', english) },
    { count: interventionCount, title: t('total_intervention', english) },
  ];
  return (
    <View>
      <Text style={[globalStyles.inputLabel, { fontSize: 20, fontWeight: 700 }]}>
        {t('today_highlights', english)}
      </Text>
      <View
        style={[
          globalStyles.flex,
          {
            justifyContent: 'space-between',
            marginVertical: 10,
            gap: 12,
            paddingVertical: 10,
          },
        ]}>
        {data?.map((item: { count: string; title: string }) => (
          <View
            style={{
              width: (width / 2) - 16,
              borderRadius: 10,
              borderWidth: 1,
              backgroundColor: hexToRGBA(themeColors.black as string, 0.04),
              borderColor: '#ccc',
              padding: 20,
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}
            key={item?.title}>
            <Text
              style={{
                fontSize: 22,
                color: themeColors.primary as string,
                fontWeight: 700,
                lineHeight: 48,
              }}>
              {item?.count}
            </Text>
            <Text
              numberOfLines={1}
              style={{
                fontSize: 16,
                color: hexToRGBA(themeColors.black as string, 0.5),
              }}>
              {item?.title}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
};

export default Highlights;

const styles = StyleSheet.create({});
