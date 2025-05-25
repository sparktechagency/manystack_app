import React from 'react';
import { Image, ImageSourcePropType, Modal, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Close, DeleteIcon, logo } from '../../constant/images';
import { useGlobalContext } from '../../providers/GlobalContextProvider';
import { hexToRGBA } from '../../utils/hexToRGBA';

const ImageCard = ({ item }: { item: string }) => {
  const { width, height, themeColors } = useGlobalContext();
  const [modalVisible, setModalVisible] = React.useState(false);
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <TouchableOpacity activeOpacity={0.6}
        onPress={() => setModalVisible(true)}
      >
        <Image
          source={logo as ImageSourcePropType}
          style={{
            width: (width - 60) / 2,
            height: 200,
            resizeMode: 'contain',
            borderRadius: 6,
            backgroundColor: hexToRGBA(themeColors.primary as string, 0.05),
          }}
        />
      </TouchableOpacity>

      <TouchableOpacity style={{ position: 'absolute', top: 10, right: 10 }}>
        <Image
          source={DeleteIcon as ImageSourcePropType}
          style={[
            {
              tintColor: themeColors.red as string,
              width: 20,
              height: 20,
            },
          ]}
        />
      </TouchableOpacity>
      <Modal
        animationType='fade'
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          }}>
          <Image
            source={logo as ImageSourcePropType}
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
