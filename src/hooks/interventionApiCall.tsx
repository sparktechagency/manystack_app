import { NavigationProp, useNavigation } from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import { useCreateInterventionMutation, useUpdateInterventionMutation } from '../redux/Apis/interventionApis';
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
          Toast.show({
            type: 'error',
            text1: 'Failed to create intervention',
            text2: err.data?.message || 'Failed to create intervention.',
          })
        });
      return true;
    } catch (err) {
      // throw err;
      return false;
    }
  }

  return { handleCreateIntervention, isLoading };
}

export const updateIntervention = () => {
  const navigation = useNavigation<NavigationProp<TabsTypes>>()
  const [update, { isLoading }] = useUpdateInterventionMutation();
  const handleUpdateIntervention = async (data: any, id: string, action: boolean = true) => {
    try {
      await update({ data, id }).unwrap()
        .then((res) => {
          action && Toast.show({
            type: 'success',
            text1: 'intervention updated',
            text2: res.data?.message || 'Intervention updated successfully.',
          })
          action && navigation.goBack()
        }).catch((err) => {
          Toast.show({
            type: 'error',
            text1: 'Failed to update intervention',
            text2: err.data?.message || 'Failed to update intervention.',
          })
        });
      return true;
    } catch (err) {
      // throw err;
      return false;
    }
  }

  return { handleUpdateIntervention, isLoading };
}