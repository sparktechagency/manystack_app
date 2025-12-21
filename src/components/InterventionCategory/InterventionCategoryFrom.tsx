import {
  NavigationProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import React from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';
import { SafeAreaView } from 'react-native-safe-area-context';
import { globalStyles } from '../../constant/styles';
import { TranslationKey } from '../../constant/translations';
import {
  useCreateCategory,
  useUpdateCategory,
} from '../../hooks/categoryApiCall';
import { useGlobalContext } from '../../providers/GlobalContextProvider';
import { IInterventionCategory } from '../../types/DataTypes';
import { StackTypes } from '../../types/ScreenPropsTypes';
import { t } from '../../utils/translate';
import BackButton from '../sheard/BackButton';
import GradientButton from '../sheard/GradientButton';
const InterventionCategoryFrom = () => {
  const navigation = useNavigation<NavigationProp<StackTypes>>();
  const { params }: any = useRoute();
  const { handleCreateCategory, isLoading } = useCreateCategory();
  const { handleUpdateCategory, isLoading: updating } = useUpdateCategory();
  const { height, width, english } = useGlobalContext();
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState({
    'category Name': false,
    'category Price': false,
  });

  const [inputValue, setInputValue] = React.useState<IInterventionCategory>({
    'category Name': params?.params?.name,
    'category Price': params?.params?.price,
  });
  const submitHandler = async () => {
    setLoading(true);
    let invalid = false;
    Object.keys(inputValue).forEach(key => {
      if (inputValue[key as keyof IInterventionCategory] === '') {
        setError(prev => ({ ...prev, [key]: true }));
        invalid = true;
      } else {
        setError(prev => ({ ...prev, [key]: false }));
      }
    });
    if (invalid) {
      setLoading(false);
      return;
    }
    const data = {
      name: inputValue['category Name'],
      price: inputValue['category Price'],
    };
    params?.params?.id
      ? await handleUpdateCategory(data, params?.params?.id)
      : await handleCreateCategory(data);
    navigation.goBack();
    setLoading(false);
  };
  return (
    <SafeAreaView>
      <BackButton text={params?.params?.id ? t('updateInterventionCategory', english) : t('createInterventionCategory', english)} />
      <KeyboardAwareScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        bottomOffset={62} >
        <View style={{
          height: height,
          paddingHorizontal: 20,
          paddingVertical: 20,
        }}>
          <View
            style={{
              width: '100%',
              // paddingHorizontal: 20,
              position: 'relative',
            }}>
            {Object.keys(inputValue).map((key, index) => (
              <View key={index}>
                <Text style={[globalStyles.inputLabel]}>
                  {t(key as TranslationKey, english)}
                </Text>
                <View style={{ position: 'relative' }}>
                  <TextInput
                    value={inputValue[key as keyof IInterventionCategory]}
                    onChangeText={text => {
                      setInputValue({ ...inputValue, [key]: text });
                      setError({ ...error, [key]: false });
                    }}
                    keyboardType={key === 'category Price' ? 'numeric' : 'default'}
                    placeholder={t(key as TranslationKey, english)}
                    placeholderTextColor={globalStyles.inputPlaceholder.color}
                    style={[
                      globalStyles.input,
                      error[key as keyof IInterventionCategory]
                        ? globalStyles.inputError
                        : {},
                    ]}
                  />
                </View>
              </View>
            ))}

          </View>

        </View>
      </KeyboardAwareScrollView>
      <View style={{
        paddingHorizontal: 16,
        marginLeft: 32
      }}>
        <View
          style={{
            // paddingHorizontal: 25,
            position: 'absolute',
            bottom: 100,
            width: "100%",
            paddingVertical: 16,
            // marginLeft: 20
          }}>
          <GradientButton
            isLoading={isLoading || updating || loading}
            handler={submitHandler}>

            <Text
              style={{
                color: 'white',
                textAlign: 'center',
                fontWeight: 700,
                fontSize: 18,
              }}>
              Soumettre
            </Text>

          </GradientButton>
        </View>
      </View>
    </SafeAreaView>
  );
};
export default InterventionCategoryFrom;

const styles = StyleSheet.create({});
