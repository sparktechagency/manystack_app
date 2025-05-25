import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import InterventionCreateUpdateForm from '../../components/Intervention/InterventionCreateUpdateForm';

const CreateIntervention = () => {
  return (
    <SafeAreaView>
      <InterventionCreateUpdateForm />
    </SafeAreaView>
  );
};

export default CreateIntervention;
