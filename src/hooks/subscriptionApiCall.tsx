import Toast from 'react-native-toast-message';
import { useSubscriptionPaymentMutation } from '../redux/Apis/subscriptionApis';

export const useSubscriptionPayment = () => {
  const [subscriptionPayment, { isLoading }] = useSubscriptionPaymentMutation();
  const handleSubscriptionPayment = async (data: any, handler?: (arg: string) => void) => {
    try {
      await subscriptionPayment(data).unwrap()
        .then((res) => {
          Toast.show({
            type: 'success',
            text1: 'Subscription payment',
            text2: res?.message || 'Subscription payment successfully.',
          })
          handler?.(res?.url)
        }).catch((err) => {
          Toast.show({
            type: 'error',
            text1: 'Failed to subscription payment',
            text2: err?.data?.message || 'Failed to subscription payment.',
          })
        });
      return true;
    } catch (err) {
      // throw err;
      return false;
    }
  }

  return { handleSubscriptionPayment, isLoading };
}

