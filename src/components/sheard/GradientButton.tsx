import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Colors } from '../../constant/colors';
import { hexToRGBA } from '../../utils/hexToRGBA';

const GradientButton = ({
  children,
  handler,
  isLoading
}: {
  children: React.ReactNode;
  handler?: () => void;
  isLoading?: boolean
}) => {
  return (
    <TouchableOpacity
      style={{ borderRadius: 10, overflow: 'hidden' }}
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
        style={{ borderRadius: 10, boxSizing: "border-box", height: 60, flex: 1, justifyContent: "center" }}>
        {children}
      </LinearGradient>
    </TouchableOpacity>
  );
};

export default GradientButton;

const styles = StyleSheet.create({});
