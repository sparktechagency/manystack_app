import React from 'react';
import {
  ActivityIndicator,
  Image,
  ImageSourcePropType,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Toast from 'react-native-toast-message';
import { Close, DeleteIcon } from '../../constant/images';
import { useGlobalContext } from '../../providers/GlobalContextProvider';
import { useDeleteImageMutation } from '../../redux/Apis/interventionApis';
import { generateImageUrl } from '../../utils/baseUrls';
import { hexToRGBA } from '../../utils/hexToRGBA';
interface IImageCard {
  item: {
    url: string;
    createdAt: string;
    _id: string;
    location: string;
  };
  id: string;
}
const ImageCard = ({ item, id }: IImageCard) => {
  const { width, height, themeColors } = useGlobalContext();
  const [modalVisible, setModalVisible] = React.useState(false);
  const [deleteImage, { isLoading }] = useDeleteImageMutation()
  const handleDeleteImage = () => {
    deleteImage({ id: id, data: { imageUrl: item.url } }).unwrap().then((res: any) => {
      Toast.show({
        type: 'success',
        text1: 'Image deleted successfully',
        text2: res?.message,
      })
    }).catch((error) => {
      Toast.show({
        type: 'error',
        text1: 'Image deleted failed',
        text2: error.data.message,
      })
    })
  }
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <TouchableOpacity
        activeOpacity={0.6}
        onPress={() => setModalVisible(true)}>
        <Image
          source={{ uri: generateImageUrl(item.url) }}
          style={{
            width: (width - 60) / 2,
            height: 200,
            resizeMode: 'contain',
            borderRadius: 6,
            backgroundColor: hexToRGBA(themeColors.primary as string, 0.05),
          }}
        />
      </TouchableOpacity>
      <View style={{ position: 'absolute', bottom: 10, left: 10, backgroundColor: 'rgba(255, 255, 255, 0.5)', width: "100%" }}>
        <Text style={{ color: themeColors.black as string, fontSize: 12 }}>{item.location}</Text>
        <Text style={{ color: themeColors.black as string, fontSize: 12 }}>{item.createdAt?.split('T')[0]}</Text>
      </View>
      <TouchableOpacity onPress={handleDeleteImage} style={{ position: 'absolute', top: 10, right: 10 }}>
        {
          isLoading ? <ActivityIndicator size={"small"} color={themeColors.primary as string} /> : <Image
            source={DeleteIcon as ImageSourcePropType}
            style={[
              {
                tintColor: themeColors.red as string,
                width: 20,
                height: 20,
              },
            ]}
          />
        }

      </TouchableOpacity>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          }}>
          <Image
            source={{ uri: generateImageUrl(item.url) }}
            style={{
              width: '100%',
              height: '100%',
              resizeMode: 'contain',
            }}
          />

          <TouchableOpacity
            onPress={() => setModalVisible(false)}
            style={{ position: 'absolute', top: 20, right: 20 }}>
            <Image
              source={Close as ImageSourcePropType}
              style={[
                {
                  tintColor: themeColors.red as string,
                  width: 20,
                  height: 20,
                },
              ]}
            />
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

export default ImageCard;

const styles = StyleSheet.create({});
