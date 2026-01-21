import React from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import RenderHTML from 'react-native-render-html';
import { SafeAreaView } from 'react-native-safe-area-context';
import BackButton from '../../components/sheard/BackButton';
import { useGlobalContext } from '../../providers/GlobalContextProvider';
import { useTermsAndConditionsQuery } from '../../redux/Apis/settingApis';
import { t } from '../../utils/translate';

const TermsAndConditions = () => {
  const { width, english } = useGlobalContext();
  const { data } = useTermsAndConditionsQuery(undefined);
  return (
    <SafeAreaView>
      <BackButton text={t('termsAndConditions', english)} />
      <ScrollView style={{ paddingHorizontal: 20, marginTop: 8 }}>
        <RenderHTML
          contentWidth={width}
          source={{
            html: data?.data?.content || '<p>Terms and Conditions</p>',
          }}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default TermsAndConditions;
