import React from 'react';
import {
  Alert,
  PermissionsAndroid,
  Platform,
  TouchableOpacity,
} from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import { IImage } from '../../providers/GlobalContextProvider';
import { IImageUploadProps } from '../../types/PropsType';

export const requestCameraPermission = async () => {
  if (Platform.OS !== 'android') return true;

  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.CAMERA,
      {
        title: 'Camera Permission',
        message: 'App needs access to your camera',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );
    return granted === PermissionsAndroid.RESULTS.GRANTED;
  } catch (err) {
    console.warn(err);
    return false;
  }
};
const ImageUpload = ({
  images,
  setImages,
  maxNumber,
  children,
}: IImageUploadProps) => {
  const requestStoragePermission = async () => {
    if (Platform.OS !== 'android') return true;

    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        {
          title: 'Storage Permission',
          message: 'App needs access to your storage to select images',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    } catch (err) {
      console.warn(err);
      return false;
    }
  };
  const pickImage = async () => {

    try {
      const result = await launchImageLibrary({
        mediaType: 'photo',
        includeBase64: true,
      });
      if (result.didCancel) {
        return Alert.alert('Cancelled', 'Image selection was cancelled');
      }

      if (result.assets && result.assets.length > 0) {
        const newImage: IImage = {
          uri: result.assets[0].uri ?? '',
          name: result.assets[0].fileName ?? 'random.jpg',
          type: result.assets[0].type ?? 'image/jpeg',
          mimeType: result?.assets[0].type ?? 'image/jpeg',
        };
        setImages([...images, newImage]);
      } else {
        Alert.alert('Error', 'No image selected');
      }
    } catch (error: any) {
      console.log(error)
      if (error.code !== 'E_PICKER_CANCELLED') {
        Alert.alert('Error', 'Failed to pick image');
      }
    }
  };

  return <TouchableOpacity onPress={pickImage}>{children}</TouchableOpacity>;
};

export default ImageUpload;
