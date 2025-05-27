import React from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View
} from 'react-native';
import { globalStyles } from '../../constant/styles';
import { useGlobalContext } from '../../providers/GlobalContextProvider';
import { IInterventionCategory } from '../../types/DataTypes';
import GradientButton from '../sheard/GradientButton';
const InterventionCategoryFrom = () => {
  const { height, width } = useGlobalContext()
  const [error, setError] = React.useState({
    'category Name': false,
    'category Price': false,
  });

  const [inputValue, setInputValue] = React.useState<IInterventionCategory>({
    "category Name": 'Intervention Name',
    "category Price": '100',
  });

  const submitHandler = () => {
    Object.keys(inputValue).forEach(key => {
      if (inputValue[key as keyof IInterventionCategory] === '') {
        setError(prev => ({ ...prev, [key]: true }));
      } else {
        setError(prev => ({ ...prev, [key]: false }));
      }
    });
  };
  return (
    <View style={{ width: '100%', height, paddingHorizontal: 20, position: 'relative' }}>
      {Object.keys(inputValue).map((key, index) => (
        <View key={index}>
          <Text style={[globalStyles.inputLabel]}>
            {key.charAt(0).toUpperCase() + key.slice(1)}
          </Text>
          <View style={{ position: 'relative' }}>
            <TextInput
              value={inputValue[key as keyof IInterventionCategory]}
              onChangeText={text => {
                setInputValue({ ...inputValue, [key]: text });
                setError({ ...error, [key]: false });
              }}
              keyboardType={
                key === 'category Price' ? 'numeric' : 'default'}
              placeholder={`Enter your ${key}`}
              placeholderTextColor={globalStyles.inputPlaceholder.color}
              style={[
                globalStyles.input,
                error[key as keyof IInterventionCategory] ? globalStyles.inputError : {},
              ]}
            />
          </View>
        </View>
      ))}
      <View
        style={{
          paddingHorizontal: 25,
          position: 'absolute',
          bottom: 100,
          width: width,
          paddingVertical: 16,
        }}>
        <GradientButton handler={submitHandler}>
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
export default InterventionCategoryFrom

const styles = StyleSheet.create({})