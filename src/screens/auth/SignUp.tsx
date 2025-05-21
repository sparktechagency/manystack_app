import { Link } from '@react-navigation/native';
import React from 'react';
import {
  Image,
  ImageSourcePropType,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import GradientButton from '../../components/sheard/GradientButton';
import { eye, eyeSlash } from '../../constant/images';
import { globalStyles } from '../../constant/styles';
import { ILogin, ISignUp } from '../../types/loginType';

const SignUp = () => {
  const [passShow, setPassShow] = React.useState(true);

  const [error, setError] = React.useState({
    "first name": false,
    "last name": false,
    email: false,
    contact: false,
    gender: false,
    "N°SIREN": false,
    address: false,
    password: false,
    confirmPassword: false,
  });

  const [inputValue, setInputValue] = React.useState<ISignUp>({
    "first name": 'shaharul',
    "last name": 'siyam',
    email: 'siyamoffice0273@gmail',
    contact: '01700000000',
    gender: 'male',
    "N°SIREN": '123456789',
    address: 'Dhaka',
    password: '123456',
    confirmPassword: '123456',
  });

  const submitHandler = () => {
    Object.keys(inputValue).forEach((key) => {
      if (inputValue[key as keyof ISignUp] === '') {
        setError((prev) => ({ ...prev, [key]: true }));
      } else {
        setError((prev) => ({ ...prev, [key]: false }));
      }
    });
  }

  return (
    <SafeAreaView>

      <ScrollView style={{ width: '100%', height: "100%", paddingHorizontal: 20 }}>
        {Object.keys(inputValue).map((key, index, arr) => {
          if (key === 'last name' && arr[index - 1] === 'first name') {
            return null;
          }
          if (key === 'first name' && arr[index + 1] === 'last name') {
            return (
              <View
                key={`${key}-${arr[index + 1]}`}
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}
              >
                <View style={{ flex: 1, marginRight: 10 }}>
                  <Text style={globalStyles.inputLabel}>First Name</Text>
                  <View style={{ position: 'relative' }}>
                    <TextInput
                      value={inputValue['first name']}
                      onChangeText={text => {
                        setInputValue({ ...inputValue, ['first name']: text });
                        setError({ ...error, ['first name']: false });
                      }}
                      placeholder="Enter your first name"
                      placeholderTextColor={globalStyles.inputPlaceholder.color}
                      style={[
                        globalStyles.input,
                        error['first name'] ? globalStyles.inputError : {},
                      ]}
                    />
                  </View>
                </View>

                <View style={{ flex: 1, marginLeft: 10 }}>
                  <Text style={globalStyles.inputLabel}>Last Name</Text>
                  <View style={{ position: 'relative' }}>
                    <TextInput
                      value={inputValue['last name']}
                      onChangeText={text => {
                        setInputValue({ ...inputValue, ['last name']: text });
                        setError({ ...error, ['last name']: false });
                      }}
                      placeholder="Enter your last name"
                      placeholderTextColor={globalStyles.inputPlaceholder.color}
                      style={[
                        globalStyles.input,
                        error['last name'] ? globalStyles.inputError : {},
                      ]}
                    />
                  </View>
                </View>
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
                  value={inputValue[key as keyof ILogin]}
                  onChangeText={text => {
                    setInputValue({ ...inputValue, [key]: text });
                    setError({ ...error, [key]: false });
                  }}
                  placeholder={`Enter your ${key}`}
                  secureTextEntry={key === 'password' ? passShow : false}
                  placeholderTextColor={globalStyles.inputPlaceholder.color}
                  style={[
                    globalStyles.input,
                    error[key as keyof ILogin] ? globalStyles.inputError : {},
                  ]}
                />
                {key === 'password' && (
                  <TouchableOpacity
                    style={{ position: 'absolute', right: 10, top: 15 }}
                    onPress={() => setPassShow(!passShow)}
                  >
                    <Image
                      source={passShow ? eye as ImageSourcePropType : eyeSlash as ImageSourcePropType}
                      style={{ width: 20, height: 20 }}
                    />
                  </TouchableOpacity>
                )}
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
              Login
            </Text>
          </GradientButton>
        </View>

        <View style={[globalStyles.flex, { marginTop: 20, marginBottom: 100 }]}>
          <Text style={globalStyles.text}>Don't have an account? </Text>
          <Link screen="Register" params={{}}>
            <Text style={[{ marginLeft: 5 }, globalStyles.text]}> Sign up now</Text>
          </Link>
        </View>
      </ScrollView>

    </SafeAreaView>
  );
};

export default SignUp;

const styles = StyleSheet.create({});
