import Toast from 'react-native-toast-message';
import { useCreateInterventionMutation } from '../redux/Apis/interventionApis';

export const createIntervention = () => {
  const [create, { isLoading }] = useCreateInterventionMutation();
  const handleCreateIntervention = async (data: any) => {
    try {
      await create(data).unwrap()
        .then((res) => {
          Toast.show({
            type: 'success',
            text1: 'intervention created',
            text2: res.data?.message || 'Intervention created successfully.',
          })
        }).catch((err) => {
          console.log(err);
          Toast.show({
            type: 'error',
            text1: 'Failed to create intervention',
            text2: err.data?.message || 'Failed to create intervention.',
          })
        });
      return true;
    } catch (err) {
      console.log(err)
      // throw err;
      return false;
    }
  }

  return { handleCreateIntervention, isLoading };
}