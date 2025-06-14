import React from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';
import GradientButton from '../../components/sheard/GradientButton';
import {useGlobalContext} from '../../providers/GlobalContextProvider';

const Support = () => {
  const {height, width} = useGlobalContext();
  return (
    <View
      style={[
        styles.container,
        {
          height,
        },
      ]}>
      <Text style={styles.label}>Subject</Text>
      <TextInput
        style={styles.textArea}
        multiline={true}
        placeholder="Write here......."
        placeholderTextColor="#999"
      />
      <View
        style={{
          paddingHorizontal: 25,
          position: 'absolute',
          bottom: 100,
          width: width,
          paddingVertical: 16,
        }}>
        <GradientButton handler={() => {}}>
          <Text
            style={{
              color: 'white',
              textAlign: 'center',
              fontWeight: 700,
              fontSize: 18,
            }}>
            Submit
          </Text>
        </GradientButton>
      </View>
    </View>
  );
};

export default Support;

const styles = StyleSheet.create({
  container: {
    padding: 16,
    position: 'relative',
  },
  label: {
    fontSize: 14,
    marginBottom: 6,
  },
  textArea: {
    height: 220,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
    textAlignVertical: 'top',
    backgroundColor: '#fafafa',
    color: '#000000',
  },
});
