import {createDrawerNavigator} from '@react-navigation/drawer';
import React from 'react';
import DrawerContent from '../components/Drawer/DrawerContent';
import StackLayout from './StackLayout';

const Drawer = createDrawerNavigator();

const DrawerLayout = () => {
  return (
    <Drawer.Navigator
      initialRouteName="MainStack"
      drawerContent={props => <DrawerContent {...props} />}>
      <Drawer.Screen
        name="MainStack"
        component={StackLayout}
        options={{headerShown: false}}
      />
    </Drawer.Navigator>
  );
};

export default DrawerLayout;
