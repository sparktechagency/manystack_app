import { NavigationProp, useNavigation } from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import { useCreateInterventionMutation } from '../redux/Apis/interventionApis';
import { TabsTypes } from '../types/ScreenPropsTypes';

export const createIntervention = () => {
  const navigation = useNavigation<NavigationProp<TabsTypes>>()
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
          navigation.goBack()
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