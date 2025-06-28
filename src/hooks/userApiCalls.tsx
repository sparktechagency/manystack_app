import Toast from 'react-native-toast-message';
import { useChangePasswordMutation, useUpdateProfileMutation } from '../redux/Apis/userApis';

export const useUpdateProfile = () => {
  const [updateProfile, { isLoading }] = useUpdateProfileMutation();
  const updateProfileHandler = (data: any, handler?: () => void) => {
    updateProfile(data).unwrap().then((res) => {
      Toast.show({
        type: 'success',
        text1: 'Profile updated',
        text2: res.data?.message || 'Profile updated successfully.',
      })
      handler?.()
    }).catch((err) => {
      Toast.show({
        type: 'error',
        text1: 'Failed to update profile',
        text2: err.data?.message || 'Failed to update profile.',
      })
    })
  }
  return { updateProfileHandler, isLoading }
}
export const useChangePassword = () => {
  const [changePassword, { isLoading }] = useChangePasswordMutation();
  const changePasswordHandler = (data: any, handler?: () => void) => {
    changePassword(data).unwrap().then((res: any) => {
      Toast.show({
        type: 'success',
        text1: 'Password changed',
        text2: res?.message || 'Password changed successfully.',
      })
      handler?.()
    }).catch((err) => {
      Toast.show({
        type: 'error',
        text1: 'Failed to change password',
        text2: err?.message || 'Failed to change password.',
      })
    })
  }
  return { changePasswordHandler, isLoading }
}