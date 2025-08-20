import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';
import InterventionCategoryFrom from '../../components/InterventionCategory/InterventionCategoryFrom';

const UpdateInterventionCategory = () => {
  return (
    <SafeAreaView>
      <KeyboardAwareScrollView bottomOffset={62}>
        <InterventionCategoryFrom />
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default UpdateInterventionCategory;

const styles = StyleSheet.create({});
