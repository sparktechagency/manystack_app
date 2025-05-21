import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { StyleSheet } from 'react-native';
import Expanses from '../screens/main/Expanses';
import Home from '../screens/main/Home';
import InterVention from '../screens/main/InterVention';
import Invoice from '../screens/main/Invoice';
import DrawerLayout from './DrawerLayout';
const Tab = createBottomTabNavigator();
const TabLayout = () => {
  return (
    <Tab.Navigator initialRouteName="Home">
      <Tab.Screen options={{ headerShown: false }} name="Home" component={Home} />
      <Tab.Screen options={{ headerShown: false }} name="Expanses" component={Expanses} />
      <Tab.Screen options={{ headerShown: false }} name="InterVention" component={InterVention} />
      <Tab.Screen options={{ headerShown: false }} name="Invoice" component={Invoice} />
      <Tab.Screen
        options={{ headerShown: false }}
        name="Drawer"
        component={DrawerLayout}
      />
    </Tab.Navigator>
  );
};

export default TabLayout;

const styles = StyleSheet.create({});
