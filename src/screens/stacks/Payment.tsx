import { NavigationProp, ParamListBase, useNavigation, useRoute } from '@react-navigation/native';
import React, { useState } from 'react';
import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { WebView } from 'react-native-webview';
import GradientButton from '../../components/sheard/GradientButton';
import { useGetMySubscriptionQuery } from '../../redux/Apis/subscriptionApis';

const Payment = () => {
  const { params }: any = useRoute();
  const [url] = useState(params?.params?.url); // keep original URL
  const [paymentStatus, setPaymentStatus] = useState<
    'pending' | 'success' | 'cancel' | 'error'
  >('pending');

  const handleWebViewError = (syntheticEvent: any) => {
    const { nativeEvent } = syntheticEvent;
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
    const { refetch } = useGetMySubscriptionQuery(undefined)
    const navigate = useNavigation<NavigationProp<ParamListBase>>();
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
      refetch()
      return (
        <SafeAreaView
          style={{
            flex: 1,
            backgroundColor: '#f8f9fa',
            justifyContent: 'center',
            alignItems: 'center',
            paddingHorizontal: 20,
          }}
        >

          <Text
            style={{
              fontSize: 22,
              fontWeight: 'bold',
              color: '#1e1e1e',
              textAlign: 'center',
              marginBottom: 20,
            }}
          >
            {message}
          </Text>

          <GradientButton handler={() => navigate.navigate('Tabs', { screen: 'Home' })}>
            <View style={{ paddingHorizontal: 10, paddingVertical: 12 }}>
              <Text style={{ color: 'white', fontSize: 16, fontWeight: '600' }}>Go to Home</Text>
            </View>
          </GradientButton>
        </SafeAreaView>
      )
    }

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
