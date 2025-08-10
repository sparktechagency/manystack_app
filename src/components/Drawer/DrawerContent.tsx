import { DrawerContentScrollView } from '@react-navigation/drawer';
import React, { useEffect, useState } from 'react';
import { ImageSourcePropType, Modal, StyleSheet } from 'react-native';
import { DrawerLinksData } from '../../constant/data';
import { DeleteIcon, DrawerIcons } from '../../constant/images';
import { useGlobalContext } from '../../providers/GlobalContextProvider';
import NameImage from '../Profile/NameImage';
import AccountDeleteModal from './AccountDeleteModal';
import DrawerLinks from './DrawerLinks';

const DrawerContent = (props: any) => {
  const { showSubscription } = useGlobalContext();
  const [isDeleteOpen, setIsDeleteOpen] = useState(false)
  useEffect(() => {
    if (showSubscription) {
      if (!DrawerLinksData?.find((item: any) => item.name === 'subscription')) {
        DrawerLinksData.push({
          name: 'subscription',
          href: 'Subscription',
          icon: DrawerIcons.Crown,
        });
      }
    } else {
      DrawerLinksData.pop();
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
      <DrawerLinks
        showArrow={false}
        key={'Delete'}
        title={'Delete Account'}
        href={'Delete'}
        icon={DeleteIcon as ImageSourcePropType}
        setIsDeleteOpen={setIsDeleteOpen}
      />
      <Modal
        animationType="fade"
        transparent={true}
        visible={isDeleteOpen}
        onRequestClose={() => {
          setIsDeleteOpen(!isDeleteOpen);
        }}
      >
        <AccountDeleteModal setIsDeleteOpen={setIsDeleteOpen} />
      </Modal>
    </DrawerContentScrollView>
  );
};

export default DrawerContent;

const styles = StyleSheet.create({});
