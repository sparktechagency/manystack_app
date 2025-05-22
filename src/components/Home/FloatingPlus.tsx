import { NavigationProp, useNavigation } from '@react-navigation/native';
import React, { useRef, useState } from 'react';
import {
  Animated,
  Easing,
  Image,
  ImageSourcePropType,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Close, Plus } from '../../constant/images';
import { useGlobalContext } from '../../providers/GlobalContextProvider';
import { StackTypes } from '../../types/ScreenPropsTypes';

const FloatingPlus = () => {
  const [open, setOpen] = useState(false);
  const { themeColors } = useGlobalContext();
  const anim1 = useRef(new Animated.Value(0)).current;
  const anim2 = useRef(new Animated.Value(0)).current;

  const navigation = useNavigation<NavigationProp<StackTypes>>();

  const toggleButtons = () => {
    if (open) {
      setOpen(false);
      Animated.parallel([
        Animated.timing(anim1, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
          easing: Easing.out(Easing.ease),
        }),
        Animated.timing(anim2, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
          easing: Easing.out(Easing.ease),
        }),
      ]).start();
    } else {
      setOpen(true);
      Animated.parallel([
        Animated.timing(anim1, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
          easing: Easing.out(Easing.ease),
        }),
        Animated.timing(anim2, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
          easing: Easing.out(Easing.ease),
        }),
      ]).start();
    }
  };

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.floatingButton,
          {
            opacity: anim1,
            transform: [
              {
                translateY: anim1.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, -70],
                }),
              },
              { scale: anim1 },
            ],
          },
        ]}
      >
        <TouchableOpacity
          onPress={() => {
            toggleButtons();
            navigation.navigate('CreateIntervention')
          }}
          style={[styles.pillButton, { backgroundColor: themeColors.white as string, borderColor: themeColors.primary as string, borderWidth: 1 }]}>
          <Text style={[styles.pillButtonText, { color: themeColors.primary as string }]}>Create Intervention</Text>
          <View style={[styles.iconCircle, { backgroundColor: themeColors.primary as string, }]}>
            <Image source={Plus as ImageSourcePropType} style={[styles.icon, { tintColor: themeColors.white as string }]} />
          </View>
        </TouchableOpacity>
      </Animated.View>

      <Animated.View
        style={[
          styles.floatingButton,
          {
            opacity: anim2,
            transform: [
              {
                translateY: anim2.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, -140],
                }),
              },
              { scale: anim2 },
            ],
          },
        ]}
      >
        <TouchableOpacity style={[styles.pillButton, { backgroundColor: themeColors.white as string, borderColor: themeColors.primary as string, borderWidth: 1 }]}>
          <Text style={[styles.pillButtonText, { color: themeColors.primary as string }]}>Take Image</Text>
          <View style={[styles.iconCircle, { backgroundColor: themeColors.primary as string, }]}>
            <Image source={Plus as ImageSourcePropType} style={[styles.icon, { tintColor: themeColors.white as string }]} />
          </View>
        </TouchableOpacity>
      </Animated.View>

      <TouchableOpacity
        style={[styles.mainButton, { backgroundColor: themeColors.primary as string }]}
        onPress={toggleButtons}
        activeOpacity={0.8}
      >
        <Image
          source={open ? Close as ImageSourcePropType : Plus as ImageSourcePropType}
          tintColor="white"
          style={{ width: 20, height: 20 }}
        />
      </TouchableOpacity>
    </View>
  );
};

export default FloatingPlus;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 4,
    right: 4,
    alignItems: 'flex-end',
  },
  floatingButton: {
    position: 'absolute',
    right: 0,
  },
  pillButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 5,
    paddingLeft: 20,
    paddingVertical: 3,
    borderRadius: 25,
    width: 250,
    justifyContent: 'space-between',
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  pillButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  iconCircle: {
    borderRadius: 30,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    width: 16,
    height: 16,

  },
  mainButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#E91E63',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
});
