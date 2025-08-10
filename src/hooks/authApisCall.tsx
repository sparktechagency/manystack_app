import Toast from 'react-native-toast-message';
import { useForgetPasswordMutation } from '../redux/Apis/authApis';
import { useDeleteAccountMutation } from '../redux/Apis/userApis';

export const useForgetPassword = () => {
  const [forgetPassword, { isLoading }] = useForgetPasswordMutation();
  const forgetPasswordHandler = (data: any, handler?: () => void) => {
    forgetPassword(data)
      .unwrap()
      .then((res: any) => {
        Toast.show({
          type: 'success',
          text1: 'verification code sent',
          text2: res?.message || 'Verification code sent successfully.',
        });

        handler?.();
      })
      .catch(err => {
        Toast.show({
          type: 'error',
          text1: 'Failed to send verification code',
          text2: err?.data?.message || 'Failed to send verification code.',
        });
      });
  };
  return { forgetPasswordHandler, isLoading };
};

export const useDeleteAccount = () => {
  const [deleteAcc, { isLoading }] = useDeleteAccountMutation()
  const deleteAccount = (handler?: () => void) => {
    deleteAcc(undefined).then((res: any) => {
      Toast.show({
        type: 'success',
        text1: 'account delete successfully',
        text2: res?.message || 'account delete successfully',
      });

      handler?.();
    })
      .catch(err => {
        Toast.show({
          type: 'error',
          text1: 'Failed to delete account',
          text2: err?.data?.message || 'Failed to delete account',
        });
      });
  }
  return { deleteAccount, isLoading }
}