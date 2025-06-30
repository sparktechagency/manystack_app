import React, { useEffect } from 'react';
import { ActivityIndicator, Image, ImageSourcePropType, StyleSheet, Text, View } from 'react-native';
import { Camera, Profile } from '../../constant/images';
import { globalStyles } from '../../constant/styles';
import { useUploadLogo } from '../../hooks/userApiCalls';
import { IImage, useGlobalContext } from '../../providers/GlobalContextProvider';
import { generateImageUrl } from '../../utils/baseUrls';
import { hexToRGBA } from '../../utils/hexToRGBA';
import ImageUpload from '../sheard/ImageUpload';

const NameImage = () => {
  const { themeColors, user } = useGlobalContext();
  const [images, setImages] = React.useState<IImage[]>([]);
  const { uploadLogoHandler, isLoading } = useUploadLogo();
  useEffect(() => {
    if (images.length > 0) {
      const formData = new FormData();
      formData.append('profilePicture', images[0]);
      uploadLogoHandler(formData, () => {
        setImages([]);
      });
    }
  }, [images]);
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <View
        style={{
          position: 'relative',
        }}>
        <Image
          source={user?.profilePicture ? { uri: generateImageUrl(user?.profilePicture as string) } : Profile as ImageSourcePropType}
          style={{
            width: 100,
            height: 100,
            borderRadius: 50,
          }}
        />
        <ImageUpload images={images} setImages={setImages}>
          <View
            style={{
              position: 'absolute',
              bottom: 0,
              right: 0,
              backgroundColor: themeColors.white as string,
              borderWidth: 1,
              borderColor: hexToRGBA(themeColors.black as string, 0.2),
              borderRadius: 50,
              padding: 5,
            }}>
            {
              isLoading ? (
                <ActivityIndicator size="small" color={themeColors.primary as string} />
              ) : (
                <Image
                  source={Camera as ImageSourcePropType}
                  style={{
                    width: 20,
                    height: 20,
                    tintColor: themeColors.primary as string,
                  }}
                />
              )
            }
          </View>
        </ImageUpload>
      </View>
      <Text
        style={[
          globalStyles.inputLabel,
          {
            marginTop: 10,
            fontSize: 20,
          },
        ]}>
        {user?.firstName} {user?.lastName}
      </Text>
    </View>
  );
};

export default NameImage;

const styles = StyleSheet.create({});
