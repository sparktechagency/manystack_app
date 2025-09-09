import React, { useEffect, useMemo } from 'react'
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native'
import { useIAP, } from 'react-native-iap'
import RNRestart from 'react-native-restart'
import BackButton from '../sheard/BackButton'
import GradientButton from '../sheard/GradientButton'
export default function SubscriptionsIAP() {
  const {
    connected,
    products,
    subscriptions,
    fetchProducts,
    requestPurchase,
    currentPurchase,
    finishTransaction,
    activeSubscriptions,
    getActiveSubscriptions
  } = useIAP({
    onPurchaseSuccess: (purchase) => {
      RNRestart.restart()
      // console.log('Purchase successful:', purchase)
      // handleSuccessfulPurchase(purchase)
    },
    onPurchaseError: (error) => {
      // console.error('Purchase failed:', error)
      // handlePurchaseError(error)
    },
  })

  const productIds = ['fibre_pro_subscriptions',];


  useEffect(() => {
    if (connected) {
      fetchProducts({ skus: productIds, type: 'subs' });
      getActiveSubscriptions()
    }
  }, [connected]);

  useEffect(() => {
    if (currentPurchase) {
      const completePurchase = async () => {
        try {
          console.log('Purchase completed:', currentPurchase.id)
          await finishTransaction({
            purchase: currentPurchase,
            isConsumable: true,
          })
        } catch (error) {
          console.error('Failed to complete purchase:', error)
        }
      }
      completePurchase()
    }
  }, [currentPurchase])
  const handlePurchase = async (productId: string, offerToken: string) => {
    try {
      await requestPurchase({
        request: {
          ios: {
            sku: productId,
            // You may need to provide a subscriptionOfferToken here as well for iOS,
            // depending on your setup.
          },
          android: {
            skus: [productId],
            subscriptionOffers: [
              {
                sku: productId,
                offerToken: offerToken,
              },
            ],
          },
        },
      });
    } catch (error) {
      console.error('Purchase failed:', error);
    }
  };
  useEffect(() => {
    console.log("Products updated:", products)
  }, [products])

  const renderSubscriptions = useMemo(() => {
    console.log(activeSubscriptions)
    return <>
      {subscriptions.map((product: any) => (
        <View key={product.id} style={styles.product}>
          <Text style={[styles.title, { marginBottom: 8 }]}>Current Plan</Text>
          <Text style={{
            textAlign: "center",
            paddingVertical: 10
          }}>no plan</Text>
          <Text style={[styles.title, { marginBottom: 8 }]}>Available Plan</Text>
          {
            product?.subscriptionOfferDetailsAndroid?.map((item: any) => (<View key={item?.basePlanId}
              style={{
                padding: 8,
                borderRadius: 6,
                borderColor: "#00000",
                borderWidth: 1,
                marginBottom: 8
              }}
            >
              <Text>{item?.basePlanId == "monthly" ? "Monthly Plan" : "3-Month Plan"}</Text>
              <View style={{
                flexDirection: "row",
                justifyContent: "flex-start",
                alignItems: "flex-end"
              }}>
                <Text style={{
                  color: 'blue',
                  fontSize: 18,
                  marginVertical: 6
                }}>{item?.pricingPhases?.[0]?.formattedPrice} /</Text>
                <Text>{item?.basePlanId == "monthly" ? "Monthly Plan" : "3-Month Plan"}</Text>
              </View>
              <Text style={{
                marginBottom: 6
              }}>Cancel anytime</Text>
              <GradientButton handler={() => handlePurchase(product?.id, item?.offerToken)}>
                <Text style={{
                  textAlign: "center",
                  fontSize: 16,
                  color: "#FFFFFF"
                }}>
                  {item?.pricingPhases?.[0]?.formattedPrice}
                </Text>
              </GradientButton>
            </View>))
          }

        </View>
      ))}
    </>
  }, [subscriptions])

  return (
    <SafeAreaView>
      <ScrollView>
        <BackButton text='Subscription' />
        {renderSubscriptions}
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  status: { fontSize: 16, marginBottom: 20 },
  product: {
    padding: 15,
    marginVertical: 5,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
  },
  title: { fontSize: 16, fontWeight: 'bold' },
  price: { fontSize: 14, color: '#666', marginVertical: 5 },
})