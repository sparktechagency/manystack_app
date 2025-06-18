
import Toast from 'react-native-toast-message';
import { useCreateCategoryMutation, useDeleteCategoryMutation, useUpdateCategoryMutation } from '../redux/Apis/categoryApis';

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
      // throw err;
      return false;
    }
  };

  return { handleCreateCategory, isLoading, error, data };
};
export const useUpdateCategory = () => {
  const [updateCategory, { isLoading, error, data }] = useUpdateCategoryMutation();

  const handleUpdateCategory = async (data: any, id: string) => {
    try {
      await updateCategory({ data, id }).unwrap()
        .then((res) => {
          Toast.show({
            type: 'success',
            text1: 'category updated',
            text2: res.data?.message || 'Category updated successfully.',
          })
        }).catch((err) => {
          Toast.show({
            type: 'error',
            text1: 'Failed to update category',
            text2: err.data?.message || 'Failed to update category.',
          })
        });
      return true;
    } catch (err) {
      // throw err;
      return false;
    }
  };

  return { handleUpdateCategory, isLoading, error, data };
};

export const useDeleteCategory = () => {
  const [deleteCategory, { isLoading, error, data }] = useDeleteCategoryMutation();

  const handleDeleteCategory = async (id: string) => {
    try {
      await deleteCategory(id).unwrap()
        .then((res) => {
          Toast.show({
            type: 'success',
            text1: 'category deleted',
            text2: res.data?.message || 'Category deleted successfully.',
          })
        }).catch((err) => {
          Toast.show({
            type: 'error',
            text1: 'Failed to delete category',
            text2: err.data?.message || 'Failed to delete category.',
          })
        });
      return true;
    } catch (err) {
      // throw err;
      return false;
    }
  };

  return { handleDeleteCategory, isLoading, error, data };

};