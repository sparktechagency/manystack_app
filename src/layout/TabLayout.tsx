import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import {StyleSheet} from 'react-native';
import Home from '../screens/main/Home';
import DrawerLayout from './DrawerLayout';
const Tab = createBottomTabNavigator();
const TabLayout = () => {
  return (
    <Tab.Navigator initialRouteName="Home">
      <Tab.Screen options={{headerShown: false}} name="Home" component={Home} />
      <Tab.Screen
        options={{headerShown: false}}
        name="Drawer"
        component={DrawerLayout}
      />
    </Tab.Navigator>
  );
};

export default TabLayout;

const styles = StyleSheet.create({});
