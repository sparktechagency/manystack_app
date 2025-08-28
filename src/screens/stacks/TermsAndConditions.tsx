import React from 'react';
import { StyleSheet, View } from 'react-native';
import RenderHTML from 'react-native-render-html';
import BackButton from '../../components/sheard/BackButton';
import { useGlobalContext } from '../../providers/GlobalContextProvider';
import { useTermsAndConditionsQuery } from '../../redux/Apis/settingApis';
import { t } from '../../utils/translate';

const TermsAndConditions = () => {
  const { width, english } = useGlobalContext();
  const { data } = useTermsAndConditionsQuery(undefined);
  return (
    <>
      <BackButton text={t('termsAndConditions', english)} />
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

export default TermsAndConditions;

const styles = StyleSheet.create({});
