
import Toast from 'react-native-toast-message';
import { useCreateCategoryMutation } from '../redux/Apis/categoryApis';

export const useCreateCategory = () => {
  const [createCategory, { isLoading, error, data }] = useCreateCategoryMutation();

  const handleCreateCategory = async (data: any) => {
    try {
      await createCategory(data).unwrap()
        .then((res) => {
          Toast.show({
            type: 'success',
            text1: 'category created',
            text2: res.data?.message || 'Category created successfully.',
          })
        }).catch((err) => {
          Toast.show({
            type: 'error',
            text1: 'Failed to create category',
            text2: err.data?.message || 'Failed to create category.',
          })
        });
      return true;
    } catch (err) {
      console.error('Failed to create category:', err);
      // throw err;
      return false;
    }
  };

  return { handleCreateCategory, isLoading, error, data };
};
