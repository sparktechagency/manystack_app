import Toast from 'react-native-toast-message';
import { useForgetPasswordMutation } from '../redux/Apis/authApis';

export const useForgetPassword = () => {
  const [forgetPassword, { isLoading }] = useForgetPasswordMutation();
  const forgetPasswordHandler = (data: any, handler?: () => void) => {
    forgetPassword(data).then((res: any) => {
      Toast.show({
        type: 'success',
        text1: 'verification code sent',
        text2: res?.message || 'Verification code sent successfully.',
      })
      handler?.()
    }).catch((err) => {
      Toast.show({
        type: 'error',
        text1: 'Failed to send verification code',
        text2: err?.data?.message || 'Failed to send verification code.',
      })
    })
  }
  return { forgetPasswordHandler, isLoading }
}