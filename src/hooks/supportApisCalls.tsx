import Toast from 'react-native-toast-message';
import {useSupportMutation} from '../redux/Apis/userApis';
import { useGlobalContext } from '../providers/GlobalContextProvider';

export const useSupportCreate = () => {
  const {english}=useGlobalContext()
  const [supportMutation, {data, isLoading, error}] = useSupportMutation();

  const handleSupportCreate = async (data: any, handler?: () => void) => {
    try {
      await supportMutation(data)
        .unwrap()
        .then(res => {
          Toast.show({
            type: 'success',
            text1: english?'Support created':'Support créé',
            text2: res?.message || english?'Support created successfully.' : "Support créé avec succès.",
          });
          handler?.();
        })
        .catch(err => {
          Toast.show({
            type: 'error',
            text1: english?'Failed to create support':'Échec de la création du support',
            text2: err.data?.message || english?'Failed to create support.' : "Échec de la création du support.",
          });
        });
      return true;
    } catch (err) {
      // throw err;
      return false;
    }
  };

  return {handleSupportCreate, isLoading, error, data};
};
