import { DrawerContentScrollView } from '@react-navigation/drawer';
import React, { useEffect } from 'react';
import { ImageSourcePropType, StyleSheet } from 'react-native';
import { DrawerLinksData } from '../../constant/data';
import { DrawerIcons } from '../../constant/images';
import { useGlobalContext } from '../../providers/GlobalContextProvider';
import NameImage from '../Profile/NameImage';
import DrawerLinks from './DrawerLinks';

const DrawerContent = (props: any) => {
  const { showSubscription } = useGlobalContext();
  useEffect(() => {
    if (showSubscription) {
      if (!DrawerLinksData?.find((item: any) => item.name === 'subscription')) {
        DrawerLinksData.push({ name: 'subscription', href: 'Subscription', icon: DrawerIcons.Crown })
      }
    } else {
      DrawerLinksData.pop()
    }
  }, [showSubscription]);
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
