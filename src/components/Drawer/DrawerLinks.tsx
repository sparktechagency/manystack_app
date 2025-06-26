import AsyncStorage from '@react-native-async-storage/async-storage';
import { DrawerActions, NavigationProp, ParamListBase, useNavigation } from '@react-navigation/native';
import React from 'react';
import {
  Image,
  ImageSourcePropType,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { DrawerIcons } from '../../constant/images';
import { globalStyles } from '../../constant/styles';
import { useGlobalContext } from '../../providers/GlobalContextProvider';
import { IDrawerLinksProps } from '../../types/PropsType';
import { t } from '../../utils/translate';

const DrawerLinks = ({
  title,
  href,
  icon,
  showArrow = true,
}: IDrawerLinksProps) => {
  const { themeColors, english } = useGlobalContext();
  const navigate = useNavigation<NavigationProp<ParamListBase>>();
  return (
    <TouchableOpacity
      onPress={async () => {
        if (href === 'Login') {
          await AsyncStorage.removeItem('token');
          navigate.reset({
            index: 0,
            routes: [{ name: href as any }],
          });
          navigate.dispatch(DrawerActions.closeDrawer());
        } else {
          navigate.navigate(href as any)
        }
      }}
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
        <Text>{t(title as any, english)}</Text>
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
