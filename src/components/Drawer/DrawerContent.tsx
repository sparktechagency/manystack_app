import { DrawerContentScrollView } from '@react-navigation/drawer';
import React from 'react';
import { ImageSourcePropType, StyleSheet } from 'react-native';
import { DrawerLinksData } from '../../constant/data';
import { DrawerIcons } from '../../constant/images';
import NameImage from '../Profile/NameImage';
import DrawerLinks from './DrawerLinks';

const DrawerContent = (props: any) => {
  return (
    <DrawerContentScrollView {...props}>
      <NameImage />
      {DrawerLinksData.map((item, index) => (
        <DrawerLinks
          key={item.name}
          title={item.name}
          href={item.href}
          icon={item.icon as ImageSourcePropType}
        />
      ))}
      <DrawerLinks
        showArrow={false}
        key={'Logout'}
        title={'logout'}
        href={'Login'}
        icon={DrawerIcons.LogOut as ImageSourcePropType}
      />
    </DrawerContentScrollView>
  );
};

export default DrawerContent;

const styles = StyleSheet.create({});
