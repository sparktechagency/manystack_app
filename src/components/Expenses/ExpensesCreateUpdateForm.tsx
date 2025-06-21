import { useRoute } from '@react-navigation/native';
import React from 'react';
import {
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
import { createExpenses, updateExpenses } from '../../hooks/expensesApiCall';
import { useGlobalContext } from '../../providers/GlobalContextProvider';
import { useGetCategoriesQuery } from '../../redux/Apis/categoryApis';
import { ICreateExpenses } from '../../types/DataTypes';
import { IExpensesError } from '../../types/ErrorTypes';
import { getLocation } from '../../utils/getLocations';
import { hexToRGBA } from '../../utils/hexToRGBA';
import GradientButton from '../sheard/GradientButton';
import ImageUpload from '../sheard/ImageUpload';
import SingleSelectDropDown from '../sheard/SingleSelectDropDown';

const ExpensesCreateUpdateForm = () => {
  const { themeColors, setImages, images } = useGlobalContext();
  const { data } = useGetCategoriesQuery(undefined)
  const { params }: any = useRoute()
  const { handleCreateExpenses, isLoading } = createExpenses()
  const { handleUpdateExpenses, isLoading: updating } = updateExpenses()

  const [error, setError] = React.useState<IExpensesError>({
    'Expense Name': false,
    category: false,
    price: false,
    note: false,
    status: false,
  });

  const [inputValue, setInputValue] = React.useState<ICreateExpenses>({
    'Expense Name': params?.params?.name,
    category: params?.params?.category,
    price: params?.params?.price,
    note: params?.params?.note,
    status: params?.params?.status?.toLowerCase(),
  });

  const submitHandler = async () => {
    let invalid = false;
    Object.keys(inputValue).forEach(key => {
      if (inputValue[key as keyof ICreateExpenses] === '') {
        setError(prev => ({ ...prev, [key]: true }));
        invalid = true;
      } else {
        setError(prev => ({ ...prev, [key]: false }));
      }
    });
    if (invalid) return;
    // const data = {
    //   expenseName: inputValue['Expense Name'],
    //   expenseCategory: inputValue.category,
    //   price: inputValue.price,
    //   note: inputValue.note,
    //   latitude: 0,
    //   longitude: 0
    // };
    const location: any = await getLocation();
    if (Object.values(location as any).some(value => value === undefined)) {
      return Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Please enable location',
      })
    }
    const formData = new FormData();
    formData.append('expenseName', inputValue['Expense Name']);
    formData.append('expenseCategory', inputValue.category);
    formData.append('price', inputValue.price);
    formData.append('note', inputValue.note);
    formData.append('latitude', location?.latitude);
    formData.append('longitude', location?.longitude);
    images.forEach((image) => {
      formData.append('images', image);
    })
    params?.params?.id ? await handleUpdateExpenses(formData, params?.params?.id) : await handleCreateExpenses(formData)
  }
  return (
    <SafeAreaView>
      <ScrollView
        style={{
          width: '100%',
          height: '100%',
          paddingHorizontal: 20,
          paddingVertical: 20,
        }}>
        {Object.keys(inputValue).map((key, index, arr) => {
          if (key === 'status') {
            return (
              <View key={key}>
                <Text style={globalStyles.inputLabel}>Status</Text>
                <SingleSelectDropDown
                  name={key}
                  data={paymentStatus}
                  value={inputValue[key as keyof ICreateExpenses]}
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
                <Text style={globalStyles.inputLabel}>Select Category</Text>
                <SingleSelectDropDown
                  name={key}
                  data={data?.categories?.map((item: any) => ({
                    label: item.name,
                    value: item.name,
                  }))}
                  value={inputValue[key as keyof ICreateExpenses]}
                  inputValue={inputValue}
                  setInputValue={setInputValue}
                  setError={setError}
                  error={error}
                />
              </View>
            );
          }
          return (
            <View key={key} style={{}}>
              <Text style={globalStyles.inputLabel}>
                {key.charAt(0).toUpperCase() + key.slice(1)}
              </Text>
              <View style={{ position: 'relative' }}>
                <TextInput
                  value={inputValue[key as keyof ICreateExpenses]}
                  onChangeText={text => {
                    setInputValue({ ...inputValue, [key]: text });
                    setError({ ...error, [key]: false });
                  }}
                  keyboardType={key === 'price' ? 'numeric' : 'default'}
                  placeholder={`Enter your ${key}`}
                  placeholderTextColor={globalStyles.inputPlaceholder.color}
                  style={[
                    globalStyles.input,
                    error[key as keyof ICreateExpenses]
                      ? globalStyles.inputError
                      : {},
                  ]}
                />
              </View>
            </View>
          );
        })}

        <ImageUpload images={images} setImages={setImages} maxNumber={5}>
          <Text style={[globalStyles.inputLabel]}>Add Image</Text>
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
                Select image
              </Text>
            </View>
          </View>
        </ImageUpload>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
          {images?.length > 0 && (
            images.map((image, index) => (
              <View key={image.uri} style={{ position: 'relative', width: 100, height: 100, }} >
                <Image
                  source={{ uri: image?.uri }}
                  style={{
                    marginTop: 6,
                    width: 100,
                    height: 100,
                    resizeMode: 'contain',
                  }}
                />
                <TouchableOpacity onPress={() => {
                  setImages(prev => prev.filter((item, i) => item.uri !== image.uri))
                }} style={{ position: 'absolute', top: 8, right: 8, backgroundColor: "red", borderRadius: 10, padding: 3 }}>
                  <Image
                    source={DeleteIcon as ImageSourcePropType}
                    style={{
                      width: 20,
                      height: 20,
                      tintColor: "white"
                    }}
                  />
                </TouchableOpacity>
              </View>
            ))
          )}
        </View>
        <View style={{ paddingHorizontal: 25, marginTop: 20, marginBottom: 150 }}>
          <GradientButton handler={() => submitHandler()}>
            <Text
              style={{
                color: 'white',
                textAlign: 'center',
                fontWeight: '700',
                fontSize: 18,
              }}>
              Save
            </Text>
          </GradientButton>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ExpensesCreateUpdateForm;

const styles = StyleSheet.create({});
