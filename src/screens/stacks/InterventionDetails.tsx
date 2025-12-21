import {
  useRoute
} from '@react-navigation/native';
import React from 'react';
import { ActivityIndicator, FlatList, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import FlexTextOpacity from '../../components/InterventionDetails/FlexTextOpacity';
import ImageCard from '../../components/InterventionDetails/ImageCard';
import BackButton from '../../components/sheard/BackButton';
import GradientButton from '../../components/sheard/GradientButton';
import { useGlobalContext } from '../../providers/GlobalContextProvider';
import { useGetInterventionByIdQuery } from '../../redux/Apis/interventionApis';
import { downloadButton } from '../../utils/DownloadPdf';
import { t } from '../../utils/translate';

const InterventionDetails = () => {
  const { width, height, themeColors, currency, english } = useGlobalContext();
  const { params }: any = useRoute();
  const { data, isLoading, isFetching } = useGetInterventionByIdQuery(params?.params?.id);
  const insets = useSafeAreaInsets();
  return (
    <View
      style={{
        position: 'relative',
        height: height,
        paddingHorizontal: 16,
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
      }}>
      <BackButton text={t('details', english)} />
      {
        (isLoading || isFetching) ? <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <ActivityIndicator size="large" color="blue" />
        </View> : <>
          <Text
            style={{
              marginTop: 20,
              fontSize: 16,
              fontWeight: 600,
              color: themeColors.primary as string,
            }}>
            {data?.intervention?.interventionId}
          </Text>

          <FlexTextOpacity
            text1="Date :"
            text2={data?.intervention?.createdAt?.split('T')[0]}
          />
          <FlexTextOpacity
            text1="Catégorie :"
            text2={data?.intervention?.category?.name}
          />
          <FlexTextOpacity
            text1="Prix :"
            text2={`${currency}${data?.intervention?.price}`}
            color={themeColors.primary as string}
          />
          <FlexTextOpacity text1="Note :" text2={data?.intervention?.note} />
          <FlatList
            data={data?.intervention?.images ?? []}
            numColumns={2}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <ImageCard key={item} item={item} id={data?.intervention?._id} />
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
              bottom: 100,
              width: width,
              paddingVertical: 16,
              // backgroundColor: hexToRGBA(themeColors.white as string, 0.9),
            }}>
            <GradientButton
              handler={() => {
                downloadButton(
                  `api/intervention/download-pdf/${data?.intervention?._id}`,
                  'Intervention',
                );
              }}>
              <Text
                style={{
                  color: 'white',
                  textAlign: 'center',
                  fontWeight: 700,
                  fontSize: 18,
                }}>
                Exporter un PDF
              </Text>
            </GradientButton>
          </View>
        </>
      }

    </View>
  );
};

export default InterventionDetails;
