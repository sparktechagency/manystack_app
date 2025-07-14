import {useRoute} from '@react-navigation/native';
import React, {useState} from 'react';
import {Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {WebView} from 'react-native-webview';

const Payment = () => {
  const {params}: any = useRoute();
  const [url] = useState(params?.params?.url); // keep original URL
  const [paymentStatus, setPaymentStatus] = useState<
    'pending' | 'success' | 'cancel' | 'error'
  >('pending');

  const handleWebViewError = (syntheticEvent: any) => {
    const {nativeEvent} = syntheticEvent;
    console.error('WebView Error:', nativeEvent);
    // setPaymentStatus('error');
  };

  const handleNavigationChange = (navState: any) => {
    const currentUrl = navState.url;

    if (currentUrl.includes('success')) {
      setPaymentStatus('success');
    } else if (currentUrl.includes('cancel')) {
      setPaymentStatus('cancel');
    }
  };

  const renderContent = () => {
    if (!url || paymentStatus !== 'pending') {
      let message = '';
      switch (paymentStatus) {
        case 'success':
          message = 'Payment Successful!';
          break;
        case 'cancel':
          message = 'Payment Cancelled.';
          break;
        case 'error':
          message = 'Something went wrong. Please try again.';
          break;
        default:
          message = 'No URL provided for payment.';
      }

      return (
        <SafeAreaView
          style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <Text>{message}</Text>
        </SafeAreaView>
      );
    }

    return (
      <WebView
        source={{uri: url}}
        onError={handleWebViewError}
        onNavigationStateChange={handleNavigationChange}
      />
    );
  };

  return <View style={{flex: 1}}>{renderContent()}</View>;
};

export default Payment;
