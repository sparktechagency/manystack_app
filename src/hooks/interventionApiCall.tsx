import {NavigationProp, useNavigation} from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import {useGlobalContext} from '../providers/GlobalContextProvider';
import {
  useCreateInterventionMutation,
  useDeleteInterventionMutation,
  useUpdateInterventionMutation,
} from '../redux/Apis/interventionApis';
import {TabsTypes} from '../types/ScreenPropsTypes';

export const createIntervention = () => {
  const {setImages} = useGlobalContext();
  const navigation = useNavigation<NavigationProp<TabsTypes>>();
  const [create, {isLoading}] = useCreateInterventionMutation();
  const handleCreateIntervention = async (data: any) => {
    try {
      await create(data)
        .unwrap()
        .then(res => {
          Toast.show({
            type: 'success',
            text1: 'intervention created',
            text2: res.data?.message || 'Intervention created successfully.',
          });
          navigation.goBack();
          setImages([]);
        })
        .catch(err => {
          Toast.show({
            type: 'error',
            text1: 'Failed to create intervention',
            text2: err.data?.message || 'Failed to create intervention.',
          });
        });
      return true;
    } catch (err) {
      // throw err;
      return false;
    }
  };

  return {handleCreateIntervention, isLoading};
};

export const updateIntervention = () => {
  const {setImages} = useGlobalContext();
  const navigation = useNavigation<NavigationProp<TabsTypes>>();
  const [update, {isLoading}] = useUpdateInterventionMutation();
  const handleUpdateIntervention = async (
    data: any,
    id: string,
    action: boolean = true,
  ) => {
    try {
      await update({data, id})
        .unwrap()
        .then(res => {
          action &&
            Toast.show({
              type: 'success',
              text1: 'intervention updated',
              text2: res.data?.message || 'Intervention updated successfully.',
            });
          action && navigation.goBack();
          action && setImages([]);
        })
        .catch(err => {
          Toast.show({
            type: 'error',
            text1: 'Failed to update intervention',
            text2: err.data?.message || 'Failed to update intervention.',
          });
        });
      return true;
    } catch (err) {
      // throw err;
      return false;
    }
  };

  return {handleUpdateIntervention, isLoading};
};

export const useDeleteIntervention = () => {
  const [deleteIntervention, {isLoading}] = useDeleteInterventionMutation();
  const handleDeleteIntervention = async (
    id: string,
    action: boolean = true,
  ) => {
    try {
      await deleteIntervention(id)
        .unwrap()
        .then(res => {
          action &&
            Toast.show({
              type: 'success',
              text1: 'intervention deleted',
              text2: res.data?.message || 'Intervention deleted successfully.',
            });
        })
        .catch(err => {
          Toast.show({
            type: 'error',
            text1: 'Failed to delete intervention',
            text2: err.data?.message || 'Failed to delete intervention.',
          });
        });
      return true;
    } catch (err) {
      // throw err;
      return false;
    }
  };

  return {handleDeleteIntervention, isLoading};
};
