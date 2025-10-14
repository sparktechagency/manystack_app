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
  const {setImages,english} = useGlobalContext();
  const navigation = useNavigation<NavigationProp<TabsTypes>>();
  const [create, {isLoading}] = useCreateInterventionMutation();
  const handleCreateIntervention = async (data: any) => {
    try {
      await create(data)
        .unwrap()
        .then(res => {
          Toast.show({
            type: 'success',
            text1: english?'intervention created':'intervention créée',
            text2: res.data?.message || 'Intervention created successfully.',
          });
          navigation.goBack();
          setImages([]);
        })
        .catch(err => {
          Toast.show({
            type: 'error',
            text1: english?'Failed to create intervention':'Échec de la création de l’intervention',
            text2: err.data?.message || english?'Failed to create intervention':'Échec de la création de l’intervention.',
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
  const {setImages,english} = useGlobalContext();
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
              text1: english?'intervention updated':'intervention mise à jour',
              text2: res.data?.message || english?'Intervention updated successfully':'Intervention mise à jour avec succès.',
            });
          action && navigation.goBack();
          action && setImages([]);
        })
        .catch(err => {
          Toast.show({
            type: 'error',
            text1: english?'Failed to update intervention':'Échec de la mise à jour de l’intervention',
            text2: err.data?.message || english?'Failed to update intervention':'Échec de la mise à jour de l’intervention.',
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
  const {english} = useGlobalContext();
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
              text1: english?'intervention deleted':'intervention supprimée',
              text2: res.data?.message || english?'Intervention deleted successfully':'Intervention supprimée avec succès.',
            });
        })
        .catch(err => {
          Toast.show({
            type: 'error',
            text1: english?'Failed to delete intervention':'Échec de la suppression de l’intervention',
            text2: err.data?.message || english?'Failed to delete intervention':'Échec de la suppression de l’intervention.',
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
