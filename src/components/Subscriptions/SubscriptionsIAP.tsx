import React, { useEffect } from 'react'
import { Button, StyleSheet, Text, View } from 'react-native'
import { useIAP } from 'react-native-iap'

export default function SubscriptionsIAP() {
  const {
    connected,
    subscriptions,
    fetchSubscriptions,
    requestSubscription,
    currentPurchase,
    finishTransaction,
  } = useIAP() as any

  const productIds = ['fibre_pro_subscriptions']

  useEffect(() => {
    if (connected) {
      fetchSubscriptions({ skus: productIds })
    }
  }, [connected])

  useEffect(() => {
    if (currentPurchase) {
      const completePurchase = async () => {
        try {
          console.log('Purchase completed:', currentPurchase.id)
          await finishTransaction({ purchase: currentPurchase })
        } catch (error) {
          console.error('Failed to complete purchase:', error)
        }
      }
      completePurchase()
    }
  }, [currentPurchase])

  const handlePurchase = async (productId: string) => {
    try {
      await requestSubscription({ sku: productId })
    } catch (error) {
      console.error('Purchase failed:', error)
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.status}>
        Store: {connected ? 'Connected ✅' : 'Connecting...'}
      </Text>

      {subscriptions.map((product: any) => (
        <View key={product.productId} style={styles.product}>
          <Text style={styles.title}>{product.title}</Text>
          <Text style={styles.price}>{product.localizedPrice}</Text>
          <Button title="Subscribe" onPress={() => handlePurchase(product.productId)} />
        </View>
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  container: { padding: 20 },
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
