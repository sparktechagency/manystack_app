import React from 'react';
import { StyleSheet } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { globalStyles } from '../../constant/styles';
import { ICreateInterVention } from '../../types/DataTypes';

const SingleSelectDropDown = ({ error, data, key, value, inputValue, setInputValue, setError }: any) => {
  return (
    <Dropdown
      style={[
        globalStyles.input,
        error[key as keyof ICreateInterVention] ? globalStyles.inputError : {},
      ]}
      data={data}
      labelField="label"
      valueField="value"
      placeholder="Select Gender"
      value={value}
      onChange={item => {
        setInputValue({ ...inputValue, [key]: item.value });
        setError({ ...error, [key]: false });
      }}
      placeholderStyle={{ color: globalStyles.inputPlaceholder.color }}
      selectedTextStyle={{ color: '#000' }}
      containerStyle={{ borderRadius: 5 }}
      dropdownPosition="auto"
    />
  )
}

export default SingleSelectDropDown

const styles = StyleSheet.create({})