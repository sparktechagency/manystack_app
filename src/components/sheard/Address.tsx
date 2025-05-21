import React from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { globalStyles } from '../../constant/styles';
import { useGlobalContext } from '../../providers/GlobalContextProvider';

const Address = () => {
  const { width } = useGlobalContext()
  return (
    <View >
      <Text style={globalStyles.inputLabel}>Address</Text>
      <View style={styles.row}>
        <TextInput style={[globalStyles.input, { width: (width - 60) / 3 }]} placeholder="Street no" placeholderTextColor={globalStyles.inputPlaceholder.color} />
        <TextInput style={[globalStyles.input, { width: (width - 60) / 3 }, { marginHorizontal: 10 }]} placeholder="Street name" placeholderTextColor={globalStyles.inputPlaceholder.color} />
        <TextInput style={[globalStyles.input, { width: (width - 60) / 3 }]} placeholder="City" placeholderTextColor={globalStyles.inputPlaceholder.color} />
      </View>

      <View style={styles.row}>
        <TextInput style={[globalStyles.input, { width: (width - 50) / 2 }, { marginRight: 10 }]} placeholder="Postal code" placeholderTextColor={globalStyles.inputPlaceholder.color} />
        <TextInput style={[globalStyles.input, { width: (width - 50) / 2 }]} placeholderTextColor={globalStyles.inputPlaceholder.color} placeholder="Country" />
      </View>
    </View>
  );
};

export default Address;

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    // marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginRight: 8,
    fontSize: 16,
    backgroundColor: 'white',
  },
  smallInput: {
    flex: 1,
    maxWidth: 80,
  },
});
