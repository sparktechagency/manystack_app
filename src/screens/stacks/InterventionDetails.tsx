import React from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import FlexTextOpacity from '../../components/InterventionDetails/FlexTextOpacity';
import ImageCard from '../../components/InterventionDetails/ImageCard';
import GradientButton from '../../components/sheard/GradientButton';
import {intervention} from '../../constant/data';
import {useGlobalContext} from '../../providers/GlobalContextProvider';
import {IIntervention} from '../../types/DataTypes';
import {hexToRGBA} from '../../utils/hexToRGBA';

const InterventionDetails = () => {
  const {width, height, themeColors} = useGlobalContext();
  const data = intervention?.[0] as IIntervention;
  return (
    <View
      style={{
        position: 'relative',
        height: height,
        paddingHorizontal: 16,
      }}>
      <Text
        style={{
          fontSize: 16,
          fontWeight: 600,
          color: themeColors.primary as string,
        }}>
        INT-20250507-001
      </Text>

      <FlexTextOpacity text1="Date :" text2={data.date} />
      <FlexTextOpacity text1="Category :" text2={data.service} />
      <FlexTextOpacity
        text1="Price :"
        text2={`$${data.amount}`}
        color={themeColors.primary as string}
      />
      <FlexTextOpacity text1="Note :" text2={data.description} />
      <FlatList
        data={[
          1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
        ]}
        numColumns={2}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item}) => (
          <ImageCard key={item} item={item?.toString()} />
        )}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          gap: 15,
          paddingVertical: 0,
          paddingHorizontal: 0,
          paddingBottom: 170,
          marginTop: 20,
        }}
      />
      <View
        style={{
          paddingHorizontal: 25,
          position: 'absolute',
          bottom: 56,
          width: width,
          paddingVertical: 16,
          backgroundColor: hexToRGBA(themeColors.white as string, 0.9),
        }}>
        <GradientButton handler={() => {}}>
          <Text
            style={{
              color: 'white',
              textAlign: 'center',
              fontWeight: 700,
              fontSize: 18,
            }}>
            Export PDF
          </Text>
        </GradientButton>
      </View>
    </View>
  );
};

export default InterventionDetails;

const styles = StyleSheet.create({});
