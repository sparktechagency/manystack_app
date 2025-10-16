import Toast from 'react-native-toast-message';
import {
  useCreateCategoryMutation,
  useDeleteCategoryMutation,
  useUpdateCategoryMutation,
} from '../redux/Apis/categoryApis';
import { useGlobalContext } from '../providers/GlobalContextProvider';

export const useCreateCategory = () => {
  const {english}=useGlobalContext()
  const [createCategory, {isLoading, error, data}] =
    useCreateCategoryMutation();

  const handleCreateCategory = async (data: any) => {
    try {
      await createCategory(data)
        .unwrap()
        .then(res => {
          Toast.show({
            type: 'success',
            text1: english?'category created':'Catégorie créée',
            text2: res.data?.message || english?'Category created successfully.' : "Catégorie créée avec succès.",
          });
        })
        .catch(err => {
          Toast.show({
            type: 'error',
            text1: english?'Failed to create category':'Échec de la création de la catégorie',
            text2: err.data?.message || english?'Failed to create category.' : "Échec de la création de la catégorie.",
          });
        });
      return true;
    } catch (err) {
      // throw err;
      return false;
    }
  };

  return {handleCreateCategory, isLoading, error, data};
};
export const useUpdateCategory = () => {
  const {english}=useGlobalContext()
  const [updateCategory, {isLoading, error, data}] =
    useUpdateCategoryMutation();

  const handleUpdateCategory = async (data: any, id: string) => {
    try {
      await updateCategory({data, id})
        .unwrap()
        .then(res => {
          Toast.show({
            type: 'success',
            text1: english?'category updated':'Catégorie mise à jour',
            text2: res.data?.message || english?'Category updated successfully.' : "Catégorie mise à jour avec succès.",
          });
        })
        .catch(err => {
          Toast.show({
            type: 'error',
            text1: english?'Failed to update category':'Échec de la mise à jour de la catégorie',
            text2: err.data?.message || english?'Failed to update category.' : "Échec de la mise à jour de la catégorie.",
          });
        });
      return true;
    } catch (err) {
      // throw err;
      return false;
    }
  };

  return {handleUpdateCategory, isLoading, error, data};
};

export const useDeleteCategory = () => {
  const {english}=useGlobalContext()
  const [deleteCategory, {isLoading, error, data}] =
    useDeleteCategoryMutation();

  const handleDeleteCategory = async (id: string) => {
    try {
      await deleteCategory(id)
        .unwrap()
        .then(res => {
          Toast.show({
            type: 'success',
            text1: english?'category deleted':'Catégorie supprimée',
            text2: res.data?.message || english?'Category deleted successfully.' : "Catégorie supprimée avec succès.",
          });
        })
        .catch(err => {
          Toast.show({
            type: 'error',
            text1: english?'Failed to delete category':'Échec de la suppression de la catégorie',
            text2: err.data?.message || english?'Failed to delete category.' : "Échec de la suppression de la catégorie.",
          });
        });
      return true;
    } catch (err) {
      // throw err;
      return false;
    }
  };

  return {handleDeleteCategory, isLoading, error, data};
};
