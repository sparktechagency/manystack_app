import { Link, NavigationProp, useNavigation } from '@react-navigation/native';
import React from 'react';
import {
  Image,
  ImageSourcePropType,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import GradientButton from '../../components/sheard/GradientButton';
import { eye, eyeSlash, logo } from '../../constant/images';
import { globalStyles } from '../../constant/styles';
import { useGlobalContext } from '../../providers/GlobalContextProvider';
import { useLoginMutation } from '../../redux/Apis/authApis';
import { ILogin } from '../../types/loginType';
import { StackTypes } from '../../types/ScreenPropsTypes';
import { t } from '../../utils/translate';

const Login = () => {
  const { english } = useGlobalContext();
  const navigate = useNavigation<NavigationProp<StackTypes>>();
  const [] = useLoginMutation();
  const [passShow, setPassShow] = React.useState(true);

  const [error, setError] = React.useState({
    email: false,
    password: false,
  });

  const [inputValue, setInputValue] = React.useState<ILogin>({
    email: 'siyamoffice0273@gmail.com',
    password: '123456',
  });

  const submitHandler = () => {
    Object.keys(inputValue).forEach(key => {
      if (inputValue[key as keyof ILogin] === '') {
        setError(prev => ({ ...prev, [key]: true }));
      } else {
        setError(prev => ({ ...prev, [key]: false }));
      }
    });
    if (inputValue.email !== '' && inputValue.password !== '') {
      navigate.navigate('Tabs');
    }
  };
  return (
    <SafeAreaView
      style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <View style={{ marginTop: -60 }}>
        <Image source={logo as ImageSourcePropType} height={100} width={100} />
      </View>
      {/* form */}
      <View style={{ width: '100%', paddingHorizontal: 20 }}>
        {Object.keys(inputValue).map((key, index) => (
          <View key={index}>
            <Text style={[globalStyles.inputLabel]}>
              {english
                ? key.charAt(0).toUpperCase() + key.slice(1)
                : key == 'email'
                  ? 'Email'
                  : 'Mot de passe'}
            </Text>
            <View style={{ position: 'relative' }}>
              <TextInput
                value={inputValue[key as keyof ILogin]}
                onChangeText={text => {
                  setInputValue({ ...inputValue, [key]: text });
                  setError({ ...error, [key]: false });
                }}
                placeholder={`${t('enter', english)} ${t(key as any, english)}`}
                secureTextEntry={key === 'password' ? passShow : false}
                placeholderTextColor={globalStyles.inputPlaceholder.color}
                style={[
                  globalStyles.input,
                  error[key as keyof ILogin] ? globalStyles.inputError : {},
                ]}
              />
              {key === 'password' && (
                <TouchableOpacity
                  style={[
                    {
                      position: 'absolute',
                      right: 10,
                      top: 15,
                    },
                  ]}
                  onPress={() => setPassShow(!passShow)}>
                  <Image
                    source={
                      passShow
                        ? (eye as ImageSourcePropType)
                        : (eyeSlash as ImageSourcePropType)
                    }
                    style={{ width: 20, height: 20 }}
                  />
                </TouchableOpacity>
              )}
            </View>
          </View>
        ))}

        <Link
          style={{ textAlign: 'right', marginBottom: 20 }}
          screen="Forget"
          params={{}}>
          <Text>{english ? 'Forgot password?' : 'Mot de passe oublié'}?</Text>
        </Link>

        <View
          style={{
            paddingHorizontal: 25,
          }}>
          <GradientButton handler={() => submitHandler()}>
            <Text
              style={{
                color: 'white',
                textAlign: 'center',
                fontWeight: 700,
                fontSize: 18,
              }}>
              {english ? 'Login' : 'Connexion'}
            </Text>
          </GradientButton>
        </View>

        <View style={[globalStyles.flex, { marginTop: 20 }]}>
          <Text style={globalStyles.text}>
            {english ? "Don't have an account" : "Vous n'avez pas de compte"}?{' '}
          </Text>
          <Link screen="SignUp" params={{}}>
            <Text style={[{ marginLeft: 5 }, globalStyles.text]}>
              {' '}
              {english ? 'Sign Up' : 'Inscrivez-vous'}
            </Text>
          </Link>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Login;

const styles = StyleSheet.create({});
