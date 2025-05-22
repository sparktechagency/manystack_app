import React from 'react';
import { Alert, TouchableOpacity } from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import { IImageUploadProps } from '../../types/PropsType';

const ImageUpload = ({ images, setImages, maxNumber, children }: IImageUploadProps) => {

  const pickImage = async () => {
    try {
      const result = await ImagePicker.openPicker({
        width: 300,
        height: 300,
        cropping: false,
      });
      setImages([result.path]);
    } catch (error: any) {
      if (error.code !== 'E_PICKER_CANCELLED') {
        Alert.alert('Error', 'Failed to pick image');
      }
    }
  };


  return (
    <TouchableOpacity onPress={pickImage}>
      {children}
    </TouchableOpacity>
  );
};

export default ImageUpload;


