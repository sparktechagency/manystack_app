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
        style={{ padding: 15, borderRadius: 10 }}>
        {children}
      </LinearGradient>
    </TouchableOpacity>
  );
};

export default GradientButton;

const styles = StyleSheet.create({});
