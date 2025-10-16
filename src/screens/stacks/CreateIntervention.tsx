import React from 'react';
import { SafeAreaView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import InterventionCreateUpdateForm from '../../components/Intervention/InterventionCreateUpdateForm';

const CreateIntervention = () => {
  const insets = useSafeAreaInsets();
  return (
    <SafeAreaView>
      <InterventionCreateUpdateForm />
    </SafeAreaView>
  );
};

export default CreateIntervention;
