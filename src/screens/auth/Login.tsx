import AsyncStorage from '@react-native-async-storage/async-storage';
import { Link, NavigationProp, useNavigation } from '@react-navigation/native';
import React from 'react';
import {
  ActivityIndicator,
  Image,
  ImageSourcePropType,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import RNRestart from 'react-native-restart';
import { SafeAreaView } from 'react-native-safe-area-context';
import SplashScreen from 'react-native-splash-screen';
import Toast from 'react-native-toast-message';
import GradientButton from '../../components/sheard/GradientButton';
import { eye, eyeSlash, logo, Screen } from '../../constant/images';
import { globalStyles } from '../../constant/styles';
import { useGlobalContext } from '../../providers/GlobalContextProvider';
import { useLoginMutation } from '../../redux/Apis/authApis';
import { ILogin } from '../../types/loginType';
import { StackTypes } from '../../types/ScreenPropsTypes';
import { t } from '../../utils/translate';
const Login = () => {
  const { english, user, userLoading, firstLoad, setFirstLoad, width, height, themeColors } = useGlobalContext();
  const navigate = useNavigation<NavigationProp<StackTypes>>();
  const [signIn, { isLoading }] = useLoginMutation();
  const [passShow, setPassShow] = React.useState(true);
  const [error, setError] = React.useState({
    email: false,
    password: false,
  });

  const [inputValue, setInputValue] = React.useState<ILogin>({
    email: '',
    password: '',
  });

  const submitHandler = () => {
    let isInvalid = false;
    Object.keys(inputValue).forEach(key => {
      if (inputValue[key as keyof ILogin] === '') {
        setError(prev => ({ ...prev, [key]: true }));
        isInvalid = true;
      } else {
        setError(prev => ({ ...prev, [key]: false }));
      }
    });
    if (isInvalid) {
      Toast.show({
        type: 'error',
        text1: english ? 'failed to login' : 'échec de la connexion',
        text2: english
          ? 'Please fill all fields'
          : 'Veuillez remplir tous les champs',
      });
    }
    signIn(inputValue)
      .unwrap()
      .then(async (res) => {
        Toast.show({
          type: 'success',
          text1: english ? 'Login successfully' : 'Connexion réussie',
          text2: res.data?.message || (english ? 'Welcome back!' : 'Bienvenue de nouveau!'),
        });
        await Promise.all([
          AsyncStorage.setItem('token', res.token),
          AsyncStorage.setItem('user', JSON.stringify(res.user)),
        ])
        RNRestart.restart();
        navigate.navigate('Tabs');
      }
      )
      .catch(err => {
        Toast.show({
          type: 'error',
          text1: english ? 'Login failed' : 'Échec de la connexion',
          text2: err?.data?.message || (english ? 'An error occurred' : 'Une erreur est survenue'),
        });
      }
      );
    // if (inputValue.email !== '' && inputValue.password !== '') {
    //   navigate.navigate('Tabs');
    // }
  };
  if (userLoading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          height,
          width,
          backgroundColor: themeColors.white as string,
        }}>
        {/* <ActivityIndicator size="large" color={themeColors.primary as string} /> */}
        <Image
          source={Screen as ImageSourcePropType}
          style={{ width: width, height: height }}
        />
      </View>
    )
  }
  if (user?._id && firstLoad) {
    navigate.navigate('Tabs');
    setTimeout(() => {
      SplashScreen.hide();
    }, 1000);
    setFirstLoad(false)
    return
  } else {
    setTimeout(() => {
      SplashScreen.hide();
    }, 1000);
    setFirstLoad(false)
  }
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
            {
              isLoading ? <ActivityIndicator size="small" color="#FFFFFF" /> : <Text
                style={{
                  color: 'white',
                  textAlign: 'center',
                  fontWeight: 700,
                  fontSize: 18,
                }}>
                {english ? 'Login' : 'Connexion'}
              </Text>
            }
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
