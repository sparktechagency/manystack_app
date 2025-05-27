import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import CategoryListItem from '../../components/InterventionCategory/CategoryListItem';
import { InterventionCategoryData } from '../../constant/data';
import { globalStyles } from '../../constant/styles';
import { useGlobalContext } from '../../providers/GlobalContextProvider';
import { hexToRGBA } from '../../utils/hexToRGBA';

const InterventionCategory = () => {
  const { themeColors, width, height } = useGlobalContext();
  const textColor = hexToRGBA(themeColors.black as string, 0.6);
  return (
    <SafeAreaView style={{
      paddingHorizontal: 20,
    }}>
      <ScrollView>
        <Text style={[globalStyles.inputLabel]}>All Category</Text>
        <View style={[globalStyles.flex, {
          justifyContent: 'space-between',
          borderBottomWidth: 1,
          borderBottomColor: textColor,
          paddingBottom: 5,

        }]}>
          <Text style={{
            fontSize: 16,
            fontWeight: '600',
            color: textColor,
            width: width * 0.4,
          }}>
            Name
          </Text>
          <Text style={{
            fontSize: 16,
            fontWeight: '600',
            color: textColor,
          }}>
            Price
          </Text>
          <Text style={{
            fontSize: 16,
            fontWeight: '600',
            color: textColor,
          }}>
            Actions
          </Text>
        </View>
        {
          InterventionCategoryData.map((item) => (
            <CategoryListItem key={item.id}
              title={item.name}
              price={item.price}
              id={item.id}
            />
          ))
        }
      </ScrollView>
    </SafeAreaView>
  )
}

export default InterventionCategory

const styles = StyleSheet.create({})