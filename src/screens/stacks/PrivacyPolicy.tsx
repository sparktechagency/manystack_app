import React from 'react';
import {StyleSheet, View} from 'react-native';
import RenderHtml from 'react-native-render-html';
import {useGlobalContext} from '../../providers/GlobalContextProvider';
import {usePrivacyPolicyQuery} from '../../redux/Apis/settingApis';
const PrivacyPolicy = () => {
  const {width} = useGlobalContext();
  const {data, isLoading} = usePrivacyPolicyQuery(undefined);
  console.log(data?.data?.content);
  return (
    <View style={{paddingHorizontal: 20}}>
      <RenderHtml
        contentWidth={width}
        source={{
          html: data?.data?.content || '<p>Privacy Policy</p>',
        }}
      />
    </View>
  );
};

export default PrivacyPolicy;

const styles = StyleSheet.create({});
