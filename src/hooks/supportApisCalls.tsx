import Toast from 'react-native-toast-message';
import {useSupportMutation} from '../redux/Apis/userApis';

export const useSupportCreate = () => {
  const [supportMutation, {data, isLoading, error}] = useSupportMutation();

  const handleSupportCreate = async (data: any, handler?: () => void) => {
    try {
      await supportMutation(data)
        .unwrap()
        .then(res => {
          Toast.show({
            type: 'success',
            text1: 'Support created',
            text2: res?.message || 'Support created successfully.',
          });
          handler?.();
        })
        .catch(err => {
          Toast.show({
            type: 'error',
            text1: 'Failed to create support',
            text2: err.data?.message || 'Failed to create support.',
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
