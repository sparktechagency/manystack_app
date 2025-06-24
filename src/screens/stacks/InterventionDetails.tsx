import { NavigationProp, useNavigation, useRoute } from '@react-navigation/native';
import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import FlexTextOpacity from '../../components/InterventionDetails/FlexTextOpacity';
import ImageCard from '../../components/InterventionDetails/ImageCard';
import GradientButton from '../../components/sheard/GradientButton';
import { useGlobalContext } from '../../providers/GlobalContextProvider';
import { useGetInterventionByIdQuery } from '../../redux/Apis/interventionApis';
import { StackTypes } from '../../types/ScreenPropsTypes';
import { hexToRGBA } from '../../utils/hexToRGBA';

const InterventionDetails = () => {
  const { width, height, themeColors } = useGlobalContext();
  const navigation = useNavigation<NavigationProp<StackTypes>>()
  const { params }: any = useRoute()
  const { data } = useGetInterventionByIdQuery(params?.params?.id)
  console.log(data)
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
        {data?.intervention?.interventionId}
      </Text>

      <FlexTextOpacity text1="Date :" text2={data?.intervention?.createdAt?.split('T')[0]} />
      <FlexTextOpacity text1="Category :" text2={data?.intervention?.category?.name} />
      <FlexTextOpacity
        text1="Price :"
        text2={`$${data?.intervention?.price}`}
        color={themeColors.primary as string}
      />
      <FlexTextOpacity text1="Note :" text2={data?.intervention?.note} />
      <FlatList
        data={data?.intervention?.images ?? []}
        numColumns={2}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <ImageCard key={item} item={item} />
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
        <GradientButton handler={() => { }}>
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
