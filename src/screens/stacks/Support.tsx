import React from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import GradientButton from '../../components/sheard/GradientButton';
import { useGlobalContext } from '../../providers/GlobalContextProvider';
import { t } from '../../utils/translate';

const Support = () => {
  const { height, width, english } = useGlobalContext();
  const [subject, setSubject] = React.useState('');
  const [message, setMessage] = React.useState('');
  return (
    <View
      style={[
        styles.container,
        {
          height,
        },
      ]}>
      <Text style={styles.label}>{t('subject', english)}</Text>
      <TextInput
        style={[styles.textArea, {
          height: 45,
        }]}
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
          paddingHorizontal: 25,
          position: 'absolute',
          bottom: 100,
          width: width,
          paddingVertical: 16,
        }}>
        <GradientButton handler={() => { }}>
          <Text
            style={{
              color: 'white',
              textAlign: 'center',
              fontWeight: 700,
              fontSize: 18,
            }}>
            {t('submit', english)}
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
