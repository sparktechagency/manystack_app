import React from 'react';
import { StyleSheet, View } from 'react-native';
import RenderHTML from 'react-native-render-html';
import { useGlobalContext } from '../../providers/GlobalContextProvider';
import { useTermsAndConditionsQuery } from '../../redux/Apis/settingApis';

const TermsAndConditions = () => {
  const { width } = useGlobalContext();
  const { data } = useTermsAndConditionsQuery(undefined)
  return (
    <View style={{ paddingHorizontal: 20 }}>
      <RenderHTML
        contentWidth={width}

        source={{
          html: data?.data?.content || "<p>Privacy Policy</p>",
        }}
      />
    </View>
  );
};

export default TermsAndConditions;

const styles = StyleSheet.create({});
