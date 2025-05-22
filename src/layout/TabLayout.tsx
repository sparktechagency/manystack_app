import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { View } from 'react-native';
import Tabbar from '../components/Tabber/Tabbar';
import Expanses from '../screens/main/Expanses';
import Home from '../screens/main/Home';
import InterVention from '../screens/main/InterVention';
import Invoice from '../screens/main/Invoice';

const Tab = createBottomTabNavigator();

const TabLayout = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      tabBar={props => <Tabbar {...props} />}
      screenOptions={{ headerShown: false }}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Expanses" component={Expanses} />
      <Tab.Screen name="InterVention" component={InterVention} />
      <Tab.Screen name="Invoice" component={Invoice} />
      <Tab.Screen name="Drawer" component={() => <View></View>} />
    </Tab.Navigator>
  );
};

export default TabLayout;
