import Toast from 'react-native-toast-message';
import {
  useChangePasswordMutation,
  useUpdateProfileMutation,
  useUploadLogoMutation,
} from '../redux/Apis/userApis';
import { useGlobalContext } from '../providers/GlobalContextProvider';

export const useUpdateProfile = () => {
  const {english}=useGlobalContext()
  const [updateProfile, {isLoading}] = useUpdateProfileMutation();
  const updateProfileHandler = (data: any, handler?: () => void) => {
    updateProfile(data)
      .unwrap()
      .then(res => {
        Toast.show({
          type: 'success',
          text1: english?'Profile updated':'Profil mis à jour',
          text2: res.data?.message || english?'Profile updated successfully.' : "Profil mis à jour avec succès.",
        });
        handler?.();
      })
      .catch(err => {
        Toast.show({
          type: 'error',
          text1: english?'Failed to update profile':'Échec de la mise à jour du profil',
          text2: err.data?.message || english?'Failed to update profile.' : "Échec de la mise à jour du profil.",
        });
      });
  };
  return {updateProfileHandler, isLoading};
};
export const useChangePassword = () => {
  const {english}=useGlobalContext()
  const [changePassword, {isLoading}] = useChangePasswordMutation();
  const changePasswordHandler = (data: any, handler?: () => void) => {
    changePassword(data)
      .unwrap()
      .then((res: any) => {
        Toast.show({
          type: 'success',
          text1: english?'Password changed':'Mot de passe modifié',
          text2: res?.message || english?'Password changed successfully.' : "Mot de passe modifié avec succès.",
        });
        handler?.();
      })
      .catch(err => {
        console.log(err);
        Toast.show({
          type: 'error',
          text1: english?'Failed to change password':'Échec de la modification du mot de passe',
          text2: err?.data?.message || english?'Failed to change password.' : "Échec de la modification du mot de passe.",
        });
      });
  };
  return {changePasswordHandler, isLoading};
};
export const useUploadLogo = () => {
  const {english}=useGlobalContext()
  const [uploadLogo, {isLoading}] = useUploadLogoMutation();
  const uploadLogoHandler = (data: any, handler?: () => void) => {
    uploadLogo(data)
      .unwrap()
      .then((res: any) => {
        Toast.show({
          type: 'success',
          text1: english?'Logo uploaded':'Logo téléchargé',
          text2: res?.message || english?'Logo uploaded successfully.' : "Logo téléchargé avec succès.",
        });
        handler?.();
      })
      .catch(err => {
        Toast.show({
          type: 'error',
          text1: english?'Failed to upload logo':'Échec du téléchargement du logo',
          text2: err?.message || english?'Failed to upload logo.' : "Échec du téléchargement du logo.",
        });
      });
  };
  return {uploadLogoHandler, isLoading};
};
