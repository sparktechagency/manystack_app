import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {globalStyles} from '../../constant/styles';
import {useGlobalContext} from '../../providers/GlobalContextProvider';
import {hexToRGBA} from '../../utils/hexToRGBA';

const Highlights = () => {
  const {width, themeColors} = useGlobalContext();
  const data = [
    {count: '10', title: 'Total Intervention'},
    {count: '$3.2k', title: 'Total Price'},
  ];
  return (
    <View>
      <Text style={[globalStyles.inputLabel, {fontSize: 20, fontWeight: 700}]}>
        Today Highlights
      </Text>
      <View
        style={[
          globalStyles.flex,
          {
            justifyContent: 'space-between',
            marginVertical: 10,
            gap: 20,
            paddingVertical: 10,
          },
        ]}>
        {data?.map((item: {count: string; title: string}) => (
          <View
            style={{
              boxShadow:
                'rgba(14, 30, 37, 0.12) 0px 1px 0px 0px, rgba(14, 30, 37, 0.2) 0px 1px 20px 0px',
              width: (width - 60) / 2,
              borderRadius: 4,
              padding: 20,
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}
            key={item.title}>
            <Text
              style={{
                fontSize: 32,
                color: themeColors.primary as string,
                fontWeight: 700,
                lineHeight: 48,
              }}>
              {item.count}
            </Text>
            <Text
              style={{
                fontSize: 16,
                color: hexToRGBA(themeColors.black as string, 0.5),
              }}>
              {item.title}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
};

export default Highlights;

const styles = StyleSheet.create({});
