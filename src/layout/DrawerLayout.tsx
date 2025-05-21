import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import StackLayout from './StackLayout';
import Profile from '../screens/drawer/Profile';

const Drawer = createDrawerNavigator();

const DrawerLayout = () => {
  return (
    <Drawer.Navigator initialRouteName="MainStack">
      <Drawer.Screen name="MainStack" component={StackLayout} options={{ headerShown: false }} />
      <Drawer.Screen name="Profile" component={Profile} />
    </Drawer.Navigator>
  );
};

export default DrawerLayout;
