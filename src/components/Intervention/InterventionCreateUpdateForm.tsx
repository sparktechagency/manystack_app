import { useRoute } from '@react-navigation/native';
import React, { useEffect } from 'react';
import {
  ActivityIndicator,
  Image,
  ImageSourcePropType,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';
import { paymentStatus } from '../../constant/data';
import { Camera, DeleteIcon } from '../../constant/images';
import { globalStyles } from '../../constant/styles';
import { TranslationKey } from '../../constant/translations';
import {
  createIntervention,
  updateIntervention,
} from '../../hooks/interventionApiCall';
import { useGlobalContext } from '../../providers/GlobalContextProvider';
import { useGetCategoriesQuery } from '../../redux/Apis/categoryApis';
import { ICreateInterVention } from '../../types/DataTypes';
import { ICreateInterVentionError } from '../../types/ErrorTypes';
import { getLocation } from '../../utils/getLocations';
import { hexToRGBA } from '../../utils/hexToRGBA';
import { t } from '../../utils/translate';
import GradientButton from '../sheard/GradientButton';
import ImageUpload from '../sheard/ImageUpload';
import SingleSelectDropDown from '../sheard/SingleSelectDropDown';
const InterventionCreateUpdateForm = () => {
  const { data } = useGetCategoriesQuery(undefined);
  const { params }: any = useRoute();
  const { handleCreateIntervention, isLoading } = createIntervention();
  const { handleUpdateIntervention, isLoading: updating } = updateIntervention();
  const { themeColors, setImages, images, english } = useGlobalContext();
  const [error, setError] = React.useState<ICreateInterVentionError>({
    'intervention id': false,
    category: false,
    price: false,
    note: false,
    status: false,
  });

  const [inputValue, setInputValue] = React.useState<ICreateInterVention>({
    'intervention id': params?.params?.interventionId || '',
    category: params?.params?.category || '',
    price: params?.params?.price || '',
    note: params?.params?.note || '',
    status: params?.params?.status?.toLowerCase() || '',
  });

  const submitHandler = async () => {
    let invalid = false;
    Object.keys(inputValue).forEach(key => {
      if (inputValue[key as keyof ICreateInterVention] === '') {
        setError(prev => ({ ...prev, [key]: true }));
        invalid = true;
      } else {
        setError(prev => ({ ...prev, [key]: false }));
      }
    });
    if (invalid) return;
    const formData = new FormData();
    Object.keys(inputValue).forEach(key => {
      formData.append(key, inputValue[key as keyof ICreateInterVention]);
    });
    images.forEach(image => {
      formData.append('images', image);
    });
    formData.append('interventionId', inputValue['intervention id']);
    const location: any = await getLocation();
    if (Object.values(location as any).some(value => value === undefined)) {
      return Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Please enable location',
      });
    }
    formData.append('latitude', location?.latitude);
    formData.append('longitude', location?.longitude);

    params?.params?.id
      ? await handleUpdateIntervention(formData, params?.params?.id)
      : await handleCreateIntervention(formData);
  };
  useEffect(() => {
    if (inputValue['category']) {
      const category = data?.categories?.find(
        (category: any) => category._id === inputValue['category'],
      );
      if (category) {
        setInputValue({
          ...inputValue,
          price: category?.price?.toString() || '0',
        });
      }
    }
  }, [inputValue['category']]);
  return (
    <SafeAreaView>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{
          width: '100%',
          height: '100%',
          paddingHorizontal: 20,
          // paddingVertical: 20,
        }}>
        {Object.keys(inputValue).map((key, index, arr) => {
          if (key === 'status') {
            return (
              <View key={key}>
                <Text style={globalStyles.inputLabel}>
                  {t('status', english)}
                </Text>
                <SingleSelectDropDown
                  placeholder={t('selectStatus', english)}
                  name={key}
                  data={paymentStatus}
                  value={inputValue[key as keyof ICreateInterVention] as string}
                  inputValue={inputValue}
                  setInputValue={setInputValue}
                  setError={setError}
                  error={error}
                />
              </View>
            );
          }
          if (key === 'category') {
            return (
              <View key={key}>
                <Text style={globalStyles.inputLabel}>
                  {t('selectCategory', english)}
                </Text>
                <SingleSelectDropDown
                  placeholder={t('selectCategory', english)}
                  name={key}
                  data={
                    data?.categories?.map((category: any) => ({
                      label: category.name,
                      value: category._id,
                    })) || []
                  }
                  value={inputValue[key as keyof ICreateInterVention] as string}
                  inputValue={inputValue}
                  setInputValue={setInputValue}
                  setError={setError}
                  error={error}
                />
              </View>
            );
          }
          if (key === 'price') {
            <View key={key} style={{}}>
              <Text style={globalStyles.inputLabel}>
                {t(key as TranslationKey, english)}
              </Text>
              <View style={{ position: 'relative' }}>
                <TextInput
                  // editable={false}
                  value={inputValue[key as keyof ICreateInterVention]}
                  keyboardType={'numeric'}
                  placeholder={t(key as TranslationKey, english)}
                  placeholderTextColor={globalStyles.inputPlaceholder.color}
                  style={[
                    globalStyles.input,
                    error[key as keyof ICreateInterVention]
                      ? globalStyles.inputError
                      : {},
                  ]}
                />
              </View>
            </View>;
          }
          return (
            <View key={key} style={{}}>
              <Text style={globalStyles.inputLabel}>
                {t(key as TranslationKey, english)}
              </Text>
              <View style={{ position: 'relative' }}>
                <TextInput
                  value={inputValue[key as keyof ICreateInterVention]}
                  onChangeText={text => {
                    setInputValue({ ...inputValue, [key]: text });
                    setError({ ...error, [key]: false });
                  }}
                  keyboardType={key === 'price' ? 'numeric' : 'default'}
                  placeholder={t(key as TranslationKey, english)}
                  placeholderTextColor={globalStyles.inputPlaceholder.color}
                  style={[
                    globalStyles.input,
                    error[key as keyof ICreateInterVention]
                      ? globalStyles.inputError
                      : {},
                  ]}
                />
              </View>
            </View>
          );
        })}

        <ImageUpload images={images} setImages={setImages} maxNumber={5}>
          <Text style={[globalStyles.inputLabel]}>
            {t('addImage', english)}
          </Text>
          <View
            style={[
              globalStyles.flex,
              {
                justifyContent: 'flex-start',
                gap: 10,
                borderColor: hexToRGBA(themeColors.black as string, 0.2),
                paddingVertical: 14,
                paddingHorizontal: 14,
                borderRadius: 5,
                borderWidth: 1,
              },
            ]}>
            <Image
              source={Camera as ImageSourcePropType}
              style={{ width: 30, height: 30 }}
            />
            <View>
              <Text style={[globalStyles.inputLabel, { fontSize: 16 }]}>
                {t('selectImage', english)}
              </Text>
            </View>
          </View>
        </ImageUpload>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
          {images?.length > 0 &&
            images.map((image, index) => (
              <View
                key={image.uri}
                style={{ position: 'relative', width: 100, height: 100 }}>
                <Image
                  source={{ uri: image?.uri }}
                  style={{
                    marginTop: 6,
                    width: 100,
                    height: 100,
                    resizeMode: 'contain',
                  }}
                />
                <TouchableOpacity
                  onPress={() => {
                    setImages(prev =>
                      prev.filter((item, i) => item.uri !== image.uri),
                    );
                  }}
                  style={{
                    position: 'absolute',
                    top: 8,
                    right: 8,
                    backgroundColor: 'red',
                    borderRadius: 10,
                    padding: 3,
                  }}>
                  <Image
                    source={DeleteIcon as ImageSourcePropType}
                    style={{
                      width: 20,
                      height: 20,
                      tintColor: 'white',
                    }}
                  />
                </TouchableOpacity>
              </View>
            ))}
        </View>
        <View style={{ paddingHorizontal: 25, marginTop: 20, marginBottom: 120 }}>
          <GradientButton handler={() => submitHandler()}>
            {isLoading || updating ? (
              <ActivityIndicator size="small" color="white" />
            ) : (
              <Text
                style={{
                  color: 'white',
                  textAlign: 'center',
                  fontWeight: '700',
                  fontSize: 18,
                }}>
                Save
              </Text>
            )}
          </GradientButton>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default InterventionCreateUpdateForm;

const styles = StyleSheet.create({});
