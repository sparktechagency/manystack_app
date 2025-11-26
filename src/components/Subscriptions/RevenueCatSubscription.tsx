import { useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Linking, Platform, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import Purchases, { PurchasesOffering, PurchasesPackage } from 'react-native-purchases';
import RNRestart from 'react-native-restart';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useGetProfileQuery } from '../../redux/Apis/userApis';
import BackButton from '../sheard/BackButton';

const RevenueCatSubscription = () => {
  const { top, bottom } = useSafeAreaInsets();
  const [offerings, setOfferings] = useState<PurchasesOffering | null>(null);
  const [loading, setLoading] = useState(true);
  const [processingPackageId, setProcessingPackageId] = useState<string | null>(null);
  const [activeProductIds, setActiveProductIds] = useState<string[]>([]);
  const { params }: any = useRoute();
  const { data } = useGetProfileQuery(undefined);
  useEffect(() => {
    const apiKey = Platform.OS === 'ios'
      ? 'appl_tHakSyAztiXzbzeqtARsyrRdgpp'
      : 'goog_yTkIkCOSSUxCAjntXwSjguTpAWP';

    Purchases.configure({ apiKey, appUserID: data?.data?._id });

    const fetchData = async () => {
      try {
        const data = await Purchases.getOfferings();
        if (data.current) {
          setOfferings(data.current);
        }

        const customerInfo = await Purchases.getCustomerInfo();
        const activeSubs = customerInfo.activeSubscriptions || [];
        setActiveProductIds(activeSubs as string[]);
      } catch (error) {
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handlePurchase = async (pack: PurchasesPackage) => {
    try {
      setProcessingPackageId(pack.identifier);
      const result = await Purchases.purchasePackage(pack);

      if (result && result.customerInfo) {
        await RNRestart.restart();
      }
    } catch (error) {
    } finally {
      setProcessingPackageId(null);
    }
  };

  const openSubscriptionManagement = (productId: string) => {
    if (Platform.OS === 'android') {
      Linking.openURL(
        `https://play.google.com/store/account/subscriptions?sku=${productId}&package=${'com.shaharulsiyam.fibrepro'}`,
      );
    } else {
      Linking.openURL('https://apps.apple.com/account/subscriptions');
    }
  };

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator />
      </View>
    );
  }

  if (!offerings || !offerings.availablePackages.length) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingTop: top, paddingBottom: bottom }}>
        <Text>No subscriptions available.</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, paddingTop: top, paddingBottom: bottom }}>
      <ScrollView contentContainerStyle={{ paddingHorizontal: 16, paddingTop: 16 }}>
        {
          params?.params?.show && <BackButton text={'Souscription'} />
        }
        {offerings.availablePackages.map(pack => {
          const isActive = activeProductIds.includes(pack.product.identifier);

          return (
            <View
              key={pack.identifier}
              style={{
                marginTop: 16,
                padding: 16,
                borderRadius: 12,
                borderWidth: 1,
                borderColor: '#e5e5e5',
              }}>
              <Text style={{ fontSize: 16, fontWeight: '600', marginBottom: 4 }}>
                {pack.product.priceString}
              </Text>
              <Text style={{ marginBottom: 4 }}>{pack.product.description}</Text>

              {isActive ? (
                <>
                  <Text style={{ marginBottom: 8 }}>Forfait actuel</Text>
                  <TouchableOpacity
                    onPress={() => openSubscriptionManagement(pack.product.identifier)}
                    style={{
                      backgroundColor: '#4b5563',
                      paddingVertical: 10,
                      borderRadius: 9999,
                      alignItems: 'center',
                    }}>
                    <Text style={{ color: '#ffffff', fontWeight: '600' }}>
                      Gérer / Annuler la souscription
                    </Text>
                  </TouchableOpacity>
                </>
              ) : (
                <TouchableOpacity
                  disabled={processingPackageId === pack.identifier}
                  onPress={() => handlePurchase(pack)}
                  style={{
                    backgroundColor: '#2563eb',
                    paddingVertical: 10,
                    borderRadius: 9999,
                    alignItems: 'center',
                  }}>
                  <Text style={{ color: '#ffffff', fontWeight: '600' }}>
                    {processingPackageId === pack.identifier ? 'Processing...' : 'Souscrire'}
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default RevenueCatSubscription;
