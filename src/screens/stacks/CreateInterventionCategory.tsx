import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';
import InterventionCategoryFrom from '../../components/InterventionCategory/InterventionCategoryFrom';

const CreateInterventionCategory = () => {
  return (
    <SafeAreaView>
      <KeyboardAwareScrollView bottomOffset={62}>
        <InterventionCategoryFrom />
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default CreateInterventionCategory;

const styles = StyleSheet.create({});
