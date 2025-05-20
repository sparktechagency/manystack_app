import { createDrawerNavigator } from '@react-navigation/drawer'
import React from 'react'
import { StyleSheet } from 'react-native'
import Profile from '../screens/drawer/Profile'
const Drawer = createDrawerNavigator()
const DrawerLayout = () => {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Profile" component={Profile} />
    </Drawer.Navigator>
  )
}

export default DrawerLayout

const styles = StyleSheet.create({})