import Toast from 'react-native-toast-message';
import {
  useCancelSubscriptionMutation,
  useSubscriptionPaymentMutation,
} from '../redux/Apis/subscriptionApis';
import { useGlobalContext } from '../providers/GlobalContextProvider';

export const useSubscriptionPayment = () => {
  const {english} = useGlobalContext();
  const [subscriptionPayment, {isLoading}] = useSubscriptionPaymentMutation();
  const handleSubscriptionPayment = async (
    data: any,
    handler?: (arg: string) => void,
  ) => {
    try {
      await subscriptionPayment(data)
        .unwrap()
        .then(res => {
          Toast.show({
            type: 'success',
            text1: english?'Subscription payment':'Paiement de la souscription',
            text2: res?.message || english?'Subscription payment successfully.' : "Paiement de la souscription avec succès.",
          });
          handler?.(res?.url);
        })
        .catch(err => {
          Toast.show({
            type: 'error',
            text1: english?'Failed to subscription payment':'Échec du paiement de la souscription',
            text2: err?.data?.message || english?'Failed to subscription payment.' : "Échec du paiement de la souscription.",
          });
        });
      return true;
    } catch (err) {
      // throw err;
      return false;
    }
  };

  return {handleSubscriptionPayment, isLoading};
};

export const useCancelSubscription = () => {
  const {english} = useGlobalContext();
  const [cancelSubscription, {isLoading}] = useCancelSubscriptionMutation();
  const handleCancelSubscription = async () => {
    try {
      await cancelSubscription(undefined)
        .unwrap()
        .then(res => {
          Toast.show({
            type: 'success',
            text1: english?'Subscription canceled':'Souscription annulée',
            text2: res?.message || english?'Subscription canceled successfully.' : "Souscription annulée avec succès.",
          });
        })
        .catch(err => {
          Toast.show({
            type: 'error',
            text1: english?'Failed to cancel subscription':'Échec de l\'annulation de la souscription',
            text2: err?.data?.message || english?'Failed to cancel subscription.' : "Échec de l\'annulation de la souscription.",
          });
        });
      return true;
    } catch (err) {
      // throw err;
      return false;
    }
  };

  return {handleCancelSubscription, isLoading};
};
