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
import { paymentStatus } from '../../constant/data';
import { Camera, DeleteIcon } from '../../constant/images';
import { globalStyles } from '../../constant/styles';
import { useGlobalContext } from '../../providers/GlobalContextProvider';
import { ICreateInterVention } from '../../types/DataTypes';
import { ICreateInterVentionError } from '../../types/ErrorTypes';
import { getLocation } from '../../utils/getLocations';
import { hexToRGBA } from '../../utils/hexToRGBA';
import GradientButton from '../sheard/GradientButton';
import ImageUpload from '../sheard/ImageUpload';
import SingleSelectDropDown from '../sheard/SingleSelectDropDown';
const InterventionCreateUpdateForm = () => {
  const { themeColors, setImages, images } = useGlobalContext();
  const [error, setError] = React.useState<ICreateInterVentionError>({
    'intervention id': false,
    category: false,
    price: false,
    note: false,
    status: false,
  });

  const [inputValue, setInputValue] = React.useState<ICreateInterVention>({
    'intervention id': '',
    category: '',
    price: '',
    note: '',
    status: '',
  });

  const submitHandler = async () => {
    Object.keys(inputValue).forEach(key => {
      if (inputValue[key as keyof ICreateInterVention] === '') {
        setError(prev => ({ ...prev, [key]: true }));
      } else {
        setError(prev => ({ ...prev, [key]: false }));
      }
    });
    const location = await getLocation();
    console.log('Location:', location);
  };
  return (
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
              <Text style={globalStyles.inputLabel}>Select Category</Text>
              <SingleSelectDropDown
                name={key}
                data={[
                  { label: 'category', value: 'category' },
                  { label: 'category', value: 'category' },
                  { label: 'category', value: 'category' },
                ]}
                value={inputValue[key as keyof ICreateInterVention] as string}
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
                value={inputValue[key as keyof ICreateInterVention]}
                onChangeText={text => {
                  setInputValue({ ...inputValue, [key]: text });
                  setError({ ...error, [key]: false });
                }}
                keyboardType={key === 'price' ? 'numeric' : 'default'}
                placeholder={`Enter your ${key}`}
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
            <View key={image.path} style={{ position: 'relative', width: 100, height: 100, }} >
              <Image
                source={{ uri: image?.path }}
                style={{
                  marginTop: 6,
                  width: 100,
                  height: 100,
                  resizeMode: 'contain',
                }}
              />
              <TouchableOpacity onPress={() => {
                setImages(prev => prev.filter((item, i) => item.path !== image.path))
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
      <View style={{ paddingHorizontal: 25, marginTop: 50 }}>
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
  );
};

export default InterventionCreateUpdateForm;

const styles = StyleSheet.create({});
