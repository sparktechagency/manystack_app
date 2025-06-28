import { useRoute } from '@react-navigation/native';
import React, { useState } from 'react';
import { Text, View } from 'react-native';
import { WebView } from 'react-native-webview';

const Payment = () => {
  const { params }: any = useRoute();
  const [url] = useState(params?.params?.url); // keep original URL
  const [paymentStatus, setPaymentStatus] = useState<'pending' | 'success' | 'cancel' | 'error'>('pending');

  const handleWebViewError = (syntheticEvent: any) => {
    const { nativeEvent } = syntheticEvent;
    console.error('WebView Error:', nativeEvent);
    setPaymentStatus('error');
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
    if (!url) return <Text>No URL provided for payment.</Text>;
    if (paymentStatus === 'success') return <Text>Payment Successful!</Text>;
    if (paymentStatus === 'cancel') return <Text>Payment Cancelled.</Text>;
    if (paymentStatus === 'error') return <Text>Something went wrong. Please try again.</Text>;

    return (
      <WebView
        source={{ uri: url }}
        onError={handleWebViewError}
        onNavigationStateChange={handleNavigationChange}
      />
    );
  };

  return <View style={{ flex: 1 }}>{renderContent()}</View>;
};

export default Payment;
