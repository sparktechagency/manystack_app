import { NavigationProp, useNavigation } from '@react-navigation/native';
import React from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  View
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import CategoryListItem from '../../components/InterventionCategory/CategoryListItem';
import BackButton from '../../components/sheard/BackButton';
import GradientButton from '../../components/sheard/GradientButton';
import { globalStyles } from '../../constant/styles';
import { useGlobalContext } from '../../providers/GlobalContextProvider';
import { useGetCategoriesQuery } from '../../redux/Apis/categoryApis';
import { StackTypes } from '../../types/ScreenPropsTypes';
import { hexToRGBA } from '../../utils/hexToRGBA';
import { t } from '../../utils/translate';

const InterventionCategory = () => {
  const { themeColors, width, height, english } = useGlobalContext();
  const textColor = hexToRGBA(themeColors.black as string, 0.6);
  const navigate = useNavigation<NavigationProp<StackTypes>>();
  const { data, isLoading, isFetching } = useGetCategoriesQuery(undefined);
  const { bottom, top } = useSafeAreaInsets()
  return (
    <View
      style={{
        position: 'relative',
        paddingTop: top,
        paddingBottom: bottom
      }}>
      <BackButton text={t('interventionCategory', english)} />
      <KeyboardAwareScrollView
        style={{
          height: height,
          paddingHorizontal: 20,
          paddingVertical: 20,
        }}
        bottomOffset={62} >

        <Text style={[globalStyles.inputLabel]}>Toutes les catégories</Text>
        <View
          style={[
            globalStyles.flex,
            {
              justifyContent: 'space-between',
              borderBottomWidth: 1,
              borderBottomColor: textColor,
              paddingBottom: 5,
            },
          ]}>
          <Text
            style={{
              fontSize: 16,
              fontWeight: '600',
              color: textColor,
              width: width * 0.4,
            }}>
            Nom
          </Text>
          <Text
            style={{
              fontSize: 16,
              fontWeight: '600',
              color: textColor,
            }}>
            Prix
          </Text>
          <Text
            style={{
              fontSize: 16,
              fontWeight: '600',
              color: textColor,
            }}>
            Actes
          </Text>
        </View>
        {isLoading || isFetching ? (
          <ActivityIndicator
            color={themeColors.primary as string}
            size="large"
          />
        ) : (
          data?.categories?.map((item: any) => (
            <CategoryListItem
              key={item._id}
              title={item.name}
              price={item.price}
              id={item._id}
            />
          ))
        )}
      </KeyboardAwareScrollView>
      <View
        style={{
          paddingHorizontal: 25,
          position: 'absolute',
          bottom: 100,
          width: width,
          paddingVertical: 16,
        }}>
        <GradientButton
          handler={() => navigate.navigate('CreateInterventionCategory')}>
          <Text
            style={{
              color: 'white',
              textAlign: 'center',
              fontWeight: 700,
              fontSize: 18,
            }}>
            Ajouter un nouveau
          </Text>
        </GradientButton>
      </View>
    </View>
  );
};

export default InterventionCategory;

const styles = StyleSheet.create({});
