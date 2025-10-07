import Toast from 'react-native-toast-message';
import { useForgetPasswordMutation } from '../redux/Apis/authApis';
import { useDeleteAccountMutation } from '../redux/Apis/userApis';
import { useGlobalContext } from '../providers/GlobalContextProvider';

export const useForgetPassword = () => {
  const { english } = useGlobalContext();
  const [forgetPassword, { isLoading }] = useForgetPasswordMutation();
  const forgetPasswordHandler = (data: any, handler?: () => void) => {
    forgetPassword(data)
      .unwrap()
      .then((res: any) => {
        Toast.show({
          type: 'success',
          text1: english ? 'verification code sent' : "Code de vérification envoyé",
          text2: res?.message || english ? 'Verification code sent successfully.' : "Code de vérification envoyé avec succès.",
        });

        handler?.();
      })
      .catch(err => {
        Toast.show({
          type: 'error',
          text1: english ? 'Failed to send verification code' : "Échec d'envoi du code de vérification",
          text2: err?.data?.message || english ? 'Failed to send verification code.' : "Échec d'envoi du code de vérification.",
        });
      });
  };
  return { forgetPasswordHandler, isLoading };
};

export const useDeleteAccount = () => {
  const { english } = useGlobalContext();
  const [deleteAcc, { isLoading }] = useDeleteAccountMutation()
  const deleteAccount = (handler?: () => void) => {
    deleteAcc(undefined).then((res: any) => {
      Toast.show({
        type: 'success',
        text1: english ? 'account delete successfully' : "Compte supprimé avec succès",
        text2: res?.message || english ? 'account delete successfully' : "Compte supprimé avec succès",
      });

      handler?.();
    })
      .catch(err => {
        Toast.show({
          type: 'error',
          text1: english ? 'Failed to delete account' : "Échec de la suppression du compte",
          text2: err?.data?.message || english ? 'Failed to delete account.' : "Échec de la suppression du compte.",
        });
      });
  }
  return { deleteAccount, isLoading }
}