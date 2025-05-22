import { Link } from '@react-navigation/native';
import React from 'react';
import {
  Dimensions,
  ScrollView,
  Text,
  TextInput,
  View
} from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { SafeAreaView } from 'react-native-safe-area-context';
import GradientButton from '../../components/sheard/GradientButton';
import { globalStyles } from '../../constant/styles';
import { ICreateInterVention } from '../../types/DataTypes';

const CreateIntervention = () => {
  const { width } = Dimensions.get('window')

  const [error, setError] = React.useState({
    interventionId: false,
    category: false,
    price: false,
    note: false,
    status: false,
  });

  const [inputValue, setInputValue] = React.useState<ICreateInterVention>({
    interventionId: '',
    category: '',
    price: '',
    note: '',
    status: '',
  });

  const submitHandler = () => {

    Object.keys(inputValue).forEach((key) => {
      if (inputValue[key as keyof ICreateInterVention] === '') {
        setError((prev) => ({ ...prev, [key]: true }));
      } else {
        setError((prev) => ({ ...prev, [key]: false }));
      }
    });

  }

  return (
    <SafeAreaView>
      <ScrollView style={{ width: '100%', height: "100%", paddingHorizontal: 20, paddingVertical: 20 }}>
        {Object.keys(inputValue).map((key, index, arr) => {
          if (key === 'status') {
            const genderData = [
              { label: 'Male', value: 'male' },
              { label: 'Female', value: 'female' },
              { label: 'Others', value: 'others' },
            ];

            return (
              <View key={key} >
                <Text style={globalStyles.inputLabel}>Gender</Text>
                <Dropdown
                  style={[
                    globalStyles.input,
                    error[key as keyof ICreateInterVention] ? globalStyles.inputError : {},
                  ]}
                  data={genderData}
                  labelField="label"
                  valueField="value"
                  placeholder="Select Gender"
                  value={inputValue.status}
                  onChange={item => {
                    setInputValue({ ...inputValue, status: item.value });
                    setError({ ...error, status: false });
                  }}
                  placeholderStyle={{ color: globalStyles.inputPlaceholder.color }}
                  selectedTextStyle={{ color: '#000' }}
                  containerStyle={{ borderRadius: 5 }}
                  dropdownPosition="auto"
                />
              </View>
            );
          }
          return (
            <View key={key} style={{}}>
              <Text style={globalStyles.inputLabel}>
                {key.charAt(0).toUpperCase() + key.slice(1)}
              </Text>
              <View style={{ position: 'relative' }}>
                <TextInput
                  value={inputValue[key as keyof ICreateInterVention]}
                  onChangeText={text => {
                    setInputValue({ ...inputValue, [key]: text });
                    setError({ ...error, [key]: false });
                  }}
                  placeholder={`Enter your ${key}`}
                  placeholderTextColor={globalStyles.inputPlaceholder.color}
                  style={[
                    globalStyles.input,
                    error[key as keyof ICreateInterVention] ? globalStyles.inputError : {},
                  ]}
                />
              </View>
            </View>
          );
        })}

        <View style={{ paddingHorizontal: 25 }}>
          <GradientButton handler={() => submitHandler()}>
            <Text
              style={{
                color: 'white',
                textAlign: 'center',
                fontWeight: '700',
                fontSize: 18,
              }}
            >
              Sign Up
            </Text>
          </GradientButton>
        </View>

        <View style={[globalStyles.flex, { marginTop: 20, marginBottom: 120 }]}>
          <Text style={globalStyles.text}>Already have an account? </Text>
          <Link screen="Login" params={{}}>
            <Text style={[{ marginLeft: 5 }, globalStyles.text]}>Login</Text>
          </Link>
        </View>
      </ScrollView>

    </SafeAreaView>
  );
};


export default CreateIntervention
