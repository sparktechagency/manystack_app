import {
  NavigationProp,
  ParamListBase,
  useNavigation,
} from '@react-navigation/native';
import React from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';
import Toast from 'react-native-toast-message';
import BackButton from '../../components/sheard/BackButton';
import GradientButton from '../../components/sheard/GradientButton';
import { useSupportCreate } from '../../hooks/supportApisCalls';
import { useGlobalContext } from '../../providers/GlobalContextProvider';
import { t } from '../../utils/translate';

const Support = () => {
  const { height, width, english } = useGlobalContext();
  const [subject, setSubject] = React.useState('');
  const [message, setMessage] = React.useState('');
  const { handleSupportCreate, isLoading } = useSupportCreate();
  const navigation = useNavigation<NavigationProp<ParamListBase>>();
  const handleSubmit = () => {
    if (!subject || !message) {
      return Toast.show({
        type: 'error',
        text1: 'Subject and message are required',
      });
    }
    handleSupportCreate({ subject, message }, () => navigation.goBack());
  };
  return (
    <>
      <BackButton text={t('contactSupport', english)} />
      <KeyboardAwareScrollView bottomOffset={62} >
        <View style={{
          height: height,
          paddingHorizontal: 20,
          paddingVertical: 20,
        }}>
          <View
            style={[
              styles.container,
              {
                height,
              },
            ]}>
            <Text style={styles.label}>{t('subject', english)}</Text>
            <TextInput
              style={[
                styles.textArea,
                {
                  height: 45,
                },
              ]}
              placeholder={t('subject', english)}
              placeholderTextColor="#999"
              value={subject}
              onChangeText={setSubject}
            />
            <Text style={styles.label}>Message</Text>
            <TextInput
              style={styles.textArea}
              multiline={true}
              placeholder={t('writeHere', english)}
              placeholderTextColor="#999"
              value={message}
              onChangeText={setMessage}
            />
            <View
              style={{
                // paddingHorizontal: 25,
                position: 'absolute',
                bottom: 100,
                width: "100%",
                // paddingVertical: 16,
                flex: 1,
                marginHorizontal: "auto",
              }}>
              <GradientButton handler={handleSubmit}>
                {isLoading ? (
                  <ActivityIndicator size="small" color="white" />
                ) : (
                  <Text
                    style={{
                      color: 'white',
                      textAlign: 'center',
                      fontWeight: 700,
                      fontSize: 18,
                    }}>
                    {t('submit', english)}
                  </Text>
                )}
              </GradientButton>
            </View>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </>
  );
};

export default Support;

const styles = StyleSheet.create({
  container: {
    // padding: 16,
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
