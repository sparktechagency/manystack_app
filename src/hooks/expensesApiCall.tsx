import { NavigationProp, useNavigation } from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import { useCreateExpenseMutation, useDeleteExpenseMutation, useUpdateExpenseMutation } from '../redux/Apis/expensesApis';
import { TabsTypes } from '../types/ScreenPropsTypes';

export const createExpenses = () => {
  const navigation = useNavigation<NavigationProp<TabsTypes>>()
  const [create, { isLoading }] = useCreateExpenseMutation();
  const handleCreateExpenses = async (data: any) => {
    try {
      await create(data).unwrap()
        .then((res) => {
          Toast.show({
            type: 'success',
            text1: 'expenses created',
            text2: res.data?.message || 'Expenses created successfully.',
          })
          navigation.goBack()
        }).catch((err) => {
          Toast.show({
            type: 'error',
            text1: 'Failed to create expenses',
            text2: err.data?.message || 'Failed to create expenses.',
          })
        });
      return true;
    } catch (err) {
      // throw err;
      return false;
    }
  }

  return { handleCreateExpenses, isLoading };
}

export const updateExpenses = () => {
  const navigation = useNavigation<NavigationProp<TabsTypes>>()
  const [update, { isLoading }] = useUpdateExpenseMutation();
  const handleUpdateExpenses = async (data: any, id: string, action: boolean = true) => {
    try {
      await update({ data, id }).unwrap()
        .then((res) => {
          action && Toast.show({
            type: 'success',
            text1: 'expenses updated',
            text2: res.data?.message || 'Expenses updated successfully.',
          })
          action && navigation.goBack()
        }).catch((err) => {
          Toast.show({
            type: 'error',
            text1: 'Failed to update expenses',
            text2: err.data?.message || 'Failed to update expenses.',
          })
        });
      return true;
    } catch (err) {
      // throw err;
      return false;
    }
  }

  return { handleUpdateExpenses, isLoading };
}

export const useDeleteExpenses = () => {
  const [deleteExpenses, { isLoading }] = useDeleteExpenseMutation();
  const handleDeleteExpenses = async (id: string, action: boolean = true) => {
    try {
      await deleteExpenses(id).unwrap()
        .then((res) => {
          action && Toast.show({
            type: 'success',
            text1: 'expenses deleted',
            text2: res.data?.message || 'Expenses deleted successfully.',
          })
        }).catch((err) => {
          Toast.show({
            type: 'error',
            text1: 'Failed to delete expenses',
            text2: err.data?.message || 'Failed to delete expenses.',
          })
        });
      return true;
    } catch (err) {
      // throw err;
      return false;
    }
  }

  return { handleDeleteExpenses, isLoading };
}