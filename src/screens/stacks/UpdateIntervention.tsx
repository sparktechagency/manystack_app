import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';
import { SafeAreaView } from 'react-native-safe-area-context';
import InterventionCreateUpdateForm from '../../components/Intervention/InterventionCreateUpdateForm';

const UpdateIntervention = () => {
  return (
    <SafeAreaView>
      <KeyboardAwareScrollView bottomOffset={62}>
        <InterventionCreateUpdateForm />
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default UpdateIntervention;
