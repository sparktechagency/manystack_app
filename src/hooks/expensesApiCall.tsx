import {NavigationProp, useNavigation} from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import {
  useCreateExpenseMutation,
  useDeleteExpenseMutation,
  useUpdateExpenseMutation,
} from '../redux/Apis/expensesApis';
import {TabsTypes} from '../types/ScreenPropsTypes';
import { useGlobalContext } from '../providers/GlobalContextProvider';

export const createExpenses = () => {
  const {english} = useGlobalContext();
  const navigation = useNavigation<NavigationProp<TabsTypes>>();
  const [create, {isLoading}] = useCreateExpenseMutation();
  const handleCreateExpenses = async (data: any) => {
    try {
      await create(data)
        .unwrap()
        .then(res => {
          Toast.show({
            type: 'success',
            text1: english?'expenses created':'Dépenses créées',
            text2: res.data?.message || english?'Expenses created successfully.' : "Dépenses créées avec succès.",
          });
          navigation.goBack();
        })
        .catch(err => {
          Toast.show({
            type: 'error',
            text1: english?'Failed to create expenses':'Échec de la création des dépenses',
            text2: err.data?.message || english?'Failed to create expenses.' : "Échec de la création des dépenses.",
          });
        });
      return true;
    } catch (err) {
      // throw err;
      return false;
    }
  };

  return {handleCreateExpenses, isLoading};
};

export const updateExpenses = () => {
  const {english} = useGlobalContext();
  const navigation = useNavigation<NavigationProp<TabsTypes>>();
  const [update, {isLoading}] = useUpdateExpenseMutation();
  const handleUpdateExpenses = async (
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
              text1: english?'expenses updated':'Dépenses mises à jour',
              text2: res.data?.message || english?'Expenses updated successfully.' : "Dépenses mises à jour avec succès.",
            });
          action && navigation.goBack();
        })
        .catch(err => {
          Toast.show({
            type: 'error',
            text1: english?'Failed to update expenses':'Échec de la mise à jour des dépenses',
            text2: err.data?.message || english?'Failed to update expenses.' : "Échec de la mise à jour des dépenses.",
          });
        });
      return true;
    } catch (err) {
      // throw err;
      return false;
    }
  };

  return {handleUpdateExpenses, isLoading};
};

export const useDeleteExpenses = () => {
  const {english} = useGlobalContext();
  const [deleteExpenses, {isLoading}] = useDeleteExpenseMutation();
  const handleDeleteExpenses = async (id: string, action: boolean = true) => {
    try {
      await deleteExpenses(id)
        .unwrap()
        .then(res => {
          action &&
            Toast.show({
              type: 'success',
              text1: english?'expenses deleted':'Dépenses supprimées',
              text2: res.data?.message || english?'Expenses deleted successfully.' : "Dépenses supprimées avec succès.",
            });
        })
        .catch(err => {
          Toast.show({
            type: 'error',
            text1: english?'Failed to delete expenses':'Échec de la suppression des dépenses',
            text2: err.data?.message || english?'Failed to delete expenses.' : "Échec de la suppression des dépenses.",
          });
        });
      return true;
    } catch (err) {
      // throw err;
      return false;
    }
  };

  return {handleDeleteExpenses, isLoading};
};
