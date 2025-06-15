import {NavigationProp, useNavigation} from '@react-navigation/native';
import React from 'react';
import {
  Image,
  ImageSourcePropType,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {DrawerIcons} from '../../constant/images';
import {globalStyles} from '../../constant/styles';
import {useGlobalContext} from '../../providers/GlobalContextProvider';
import {IDrawerLinksProps} from '../../types/PropsType';
import {StackTypes} from '../../types/ScreenPropsTypes';

const DrawerLinks = ({
  title,
  href,
  icon,
  showArrow = true,
}: IDrawerLinksProps) => {
  const {themeColors} = useGlobalContext();
  const navigate = useNavigation<NavigationProp<StackTypes>>();
  return (
    <TouchableOpacity
      onPress={() => navigate.navigate(href as any)}
      style={[
        globalStyles.flex,
        {
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: 6,
          marginVertical: 2,
        },
      ]}>
      <View
        style={[
          globalStyles.flex,
          {
            justifyContent: 'flex-start',
            alignItems: 'center',
            padding: 10,
            gap: 10,
          },
        ]}>
        <Image
          source={icon}
          style={{
            width: 24,
            height: 24,
            tintColor: themeColors.black as string,
          }}
        />
        <Text>{title}</Text>
      </View>
      {showArrow && (
        <Image
          source={DrawerIcons.Arrow as ImageSourcePropType}
          style={{
            width: 16,
            height: 16,
            tintColor: themeColors.black as string,
          }}
        />
      )}
    </TouchableOpacity>
  );
};

export default DrawerLinks;

const styles = StyleSheet.create({});
