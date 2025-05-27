import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import FlexTextOpacity from '../../components/InterventionDetails/FlexTextOpacity';
import { globalStyles } from '../../constant/styles';
import { useGlobalContext } from '../../providers/GlobalContextProvider';
import { hexToRGBA } from '../../utils/hexToRGBA';

const Subscription = () => {
  const { themeColors } = useGlobalContext();
  return (
    <SafeAreaView style={{ paddingHorizontal: 20, }}>
      <ScrollView>
        <Text style={[globalStyles.inputLabel]}>Current Plan</Text>
        <View style={{
          width: '100%',
          height: "auto",
          backgroundColor: hexToRGBA(themeColors.primary as string, 0.1),
          padding: 16,
          borderRadius: 10,
        }}>
          <View style={[globalStyles.flex, {
            justifyContent: 'space-between',
          }]}>
            <Text style={{
              fontSize: 18,
              fontWeight: '600',
              color: themeColors.primary as string,
            }}>
              Basic Plan
            </Text>
            <Text style={{
              fontSize: 18,
              fontWeight: '600',
              color: themeColors.white as string,
              backgroundColor: hexToRGBA(themeColors.green as string, 0.6),
              paddingHorizontal: 10,
              borderRadius: 5,
            }}>
              Active
            </Text>
          </View>
          <FlexTextOpacity
            text1="Purchase Date :"
            text2="25 Aug,2024"
            color={hexToRGBA(themeColors.black as string, 0.6)}
          />
          <FlexTextOpacity
            text1="Expiration Date :"
            text2="25 Nov,2024"
            color={hexToRGBA(themeColors.black as string, 0.6)}
          />
          <TouchableOpacity style={{
            flexDirection: 'row',
            marginTop: 10,
          }}>
            <Text style={{
              fontSize: 18,
              fontWeight: '600',
              color: themeColors.white as string,
              backgroundColor: hexToRGBA(themeColors.red as string, 0.6),
              paddingHorizontal: 10,
              paddingVertical: 5,
              borderRadius: 5,
            }}>
              Cancel Request
            </Text>
          </TouchableOpacity>
        </View>
        <Text style={[globalStyles.inputLabel, {
          marginTop: 20,
        }]}>Available Plan</Text>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Subscription

const styles = StyleSheet.create({})