import React from 'react';
import { ActivityIndicator, StyleProp, StyleSheet, TouchableOpacity, View, ViewStyle } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Colors } from '../../constant/colors';
import { hexToRGBA } from '../../utils/hexToRGBA';

const GradientButton = ({
  children,
  handler,
  isLoading,
  style
}: {
  children: React.ReactNode;
  handler?: () => void;
  isLoading?: boolean
  style?: StyleProp<ViewStyle>
}) => {
  return (
    !isLoading ?
      <TouchableOpacity
        style={[{ borderRadius: 10, overflow: 'hidden', width: '100%' }, style]}
        disabled={isLoading}
        activeOpacity={0.8}
        onPress={() => {
          handler && handler();
        }}>
        <LinearGradient
          colors={[
            hexToRGBA(Colors.light.primary as string, 1),
            hexToRGBA(Colors.light.primary as string, 0.5),
          ]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={{ borderRadius: 10, boxSizing: "border-box", height: 60, minWidth: 60, width: '100%', justifyContent: "center", flexDirection: "row", alignItems: "center" }}>
          {children}
        </LinearGradient>
      </TouchableOpacity>
      : <View style={{ justifyContent: 'center', alignItems: 'center', borderWidth: 1, height: 60, borderColor: Colors.light.primary as string, borderRadius: 10, padding: 10 }}>
        <ActivityIndicator size="small" color={Colors.light.primary as string} />
      </View>
  );
};

export default GradientButton;

const styles = StyleSheet.create({});
