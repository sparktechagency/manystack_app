import React from 'react';
import { StyleSheet, View } from 'react-native';
import RenderHTML from 'react-native-render-html';
import BackButton from '../../components/sheard/BackButton';
import { useGlobalContext } from '../../providers/GlobalContextProvider';
import { usePrivacyPolicyQuery } from '../../redux/Apis/settingApis';
import { t } from '../../utils/translate';
const PrivacyPolicy = () => {
  const { width, english } = useGlobalContext();
  const { data, isLoading } = usePrivacyPolicyQuery(undefined);
  return (
    <>
      <BackButton text={t('PrivacyPolicy', english)} />
      <View style={{ paddingHorizontal: 20, marginTop: 8 }}>
        <RenderHTML
          contentWidth={width}
          source={{
            html: data?.data?.content || '<p>Privacy Policy</p>',
          }}
        />
      </View></>
  );
};

export default PrivacyPolicy;

const styles = StyleSheet.create({});
