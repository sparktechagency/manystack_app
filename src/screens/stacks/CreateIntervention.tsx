import React from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import InterventionCreateUpdateForm from '../../components/Intervention/InterventionCreateUpdateForm';

const CreateIntervention = () => {
  const insets = useSafeAreaInsets();
  return (
    <SafeAreaView>
      <KeyboardAwareScrollView bottomOffset={62}>
        <InterventionCreateUpdateForm />
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default CreateIntervention;
