import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRoute } from '@react-navigation/native';
import React, { useEffect, useMemo, useState } from "react";
import {
  Linking,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useIAP } from "react-native-iap";
import RNRestart from 'react-native-restart';
import { useGlobalContext } from '../../providers/GlobalContextProvider';
import BackButton from "../sheard/BackButton";
import GradientButton from "../sheard/GradientButton";
import { SafeAreaInsetsContext, useSafeAreaInsets } from 'react-native-safe-area-context';
export default function SubscriptionsIAP() {
  const {top,bottom}=useSafeAreaInsets()
  const { params }: any = useRoute();
  const { setShowSubscription } = useGlobalContext()
  const [planId, setPlanId] = useState("")
  const {
    connected,
    subscriptions,
    fetchProducts,
    requestPurchase,
    currentPurchase,
    finishTransaction,
    activeSubscriptions,
    getActiveSubscriptions,

  } = useIAP({
    onPurchaseSuccess: async (purchase) => {
      try {
        await finishTransaction({ purchase, isConsumable: false });

        await sendPurchaseToBackend(purchase);
        await RNRestart.restart();
      } catch (e) {
      }
    },
    onPurchaseError: (error) => {
    },
  });

  const productIds = ["fibre_pro_subscriptions"];

  useEffect(() => {
    if (connected) {
      fetchProducts({ skus: productIds, type: "subs" });
      getActiveSubscriptions();
    }
  }, [connected]);

  useEffect(() => {
    if (currentPurchase) {
      const completePurchase = async () => {
        try {
          console.log('Purchase completed:', currentPurchase.id)

          await finishTransaction({
            purchase: currentPurchase,
            isConsumable: false,
          })
        } catch (error) {
          console.error('Failed to complete purchase:', error)
        }
      }
      completePurchase()
    }
  }, [currentPurchase])

  const handlePurchase = async (productId: string, offerToken: string, basePlanId: string) => {
    try {
      await AsyncStorage.setItem("planId", basePlanId)
      await requestPurchase({
        request: {
          ios: {
            sku: productId,
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
      console.error("Purchase failed:", error);
    }
  };

  const sendPurchaseToBackend = async (purchase: any) => {
    try {
      await AsyncStorage.setItem("isActive", "true")
      // await fetch("https://your-api.com/subscription/validate", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify({
      //     productId: purchase.productId,
      //     transactionId: purchase.transactionId,
      //     purchaseToken: purchase.purchaseToken, // Android
      //     receipt: purchase.transactionReceipt, // iOS
      //   }),
      // });
    } catch (e) {
      console.error("Failed to send purchase to backend:", e);
    }
  };

  const openSubscriptionManagement = (productId: string) => {
    if (Platform.OS === "android") {
      Linking.openURL(
        `https://play.google.com/store/account/subscriptions?sku=${productId}&package=${"com.shaharulsiyam.fibrepro"}`
      );
    } else {
      Linking.openURL("https://apps.apple.com/account/subscriptions");
    }
  };
  useEffect(() => {
    const getSub = async () => {
      const planId = await AsyncStorage.getItem("planId")
      if (planId) {
        setPlanId(planId)
      }
      if (activeSubscriptions.length > 0) {
        setShowSubscription(false)
        // await AsyncStorage.setItem("isActive", "true")
      }
    }
    getSub()
  }, [activeSubscriptions])
  const renderSubscriptions = useMemo(() => {
    return (
      <>
        {subscriptions.map((product: any) => (
          <View key={product.id} style={styles.product}>
            <>
              {activeSubscriptions?.length > 0 ? (
                <>
                  <Text style={[styles.title, { marginBottom: 8 }]}>Forfait actuel
                  </Text>
                  {product?.subscriptionOfferDetailsAndroid?.filter((item: any) => item?.basePlanId == planId)?.map((item: any) => (
                    <View
                      key={item?.basePlanId}
                      style={styles.planCard}
                    >
                      <Text>
                        {item?.basePlanId === "monthly"
                          ? "Forfait mensuel"
                          : "Forfait trimestriel"}
                      </Text>
                      <View style={styles.priceRow}>
                        <Text style={styles.priceText}>
                          {item?.pricingPhases?.[0]?.formattedPrice} /
                        </Text>
                        <Text>
                          {item?.basePlanId === "monthly"
                            ? "Mensuel"
                            : "Trimestriel"}
                        </Text>
                      </View>
                      <Text style={{ marginBottom: 6 }}>
                        Annuler à tout moment
                      </Text>
                      <GradientButton
                        handler={async () => {
                          await AsyncStorage.removeItem("isActive")
                          openSubscriptionManagement(product.id)
                        }}
                      >
                        <Text style={styles.manageButton}>
                          Gérer / Annuler la souscription
                        </Text>
                      </GradientButton>
                    </View>
                  ))}
                </>
              ) : (
                <>
                  <Text style={[styles.title, { marginVertical: 8 }]}>
                    Plans disponibles
                  </Text>
                  {product?.subscriptionOfferDetailsAndroid?.map((item: any) => (
                    <View
                      key={item?.basePlanId}
                      style={styles.planCard}
                    >
                      <Text>
                        {item?.basePlanId === "monthly"
                          ? "Forfait mensuel"
                          : "Forfait trimestriel"}
                      </Text>
                      <View style={styles.priceRow}>
                        <Text style={styles.priceText}>
                          {item?.pricingPhases?.[0]?.formattedPrice} /
                        </Text>
                        <Text>
                          {item?.basePlanId === "monthly"
                            ? "Mensuel"
                            : "Trimestriel"}
                        </Text>
                      </View>
                      <Text style={{ marginBottom: 6 }}>
                        Annuler à tout moment
                      </Text>
                      <GradientButton
                        handler={() => handlePurchase(product?.id, item?.offerToken, item?.basePlanId)}
                      >
                        <Text style={styles.subscribeButton}>
                          {item?.pricingPhases?.[0]?.formattedPrice}
                        </Text>
                      </GradientButton>
                    </View>
                  ))}
                </>
              )}
            </>


          </View>
        ))}
      </>
    );
  }, [subscriptions, activeSubscriptions]);
  return (
    <View
    style={{
      paddingTop:top,
      paddingBottom:bottom
    }}
    >
      <ScrollView>
        {
          params?.params?.show && <BackButton text="Subscription" />
        }
        {renderSubscriptions}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  status: { fontSize: 16, marginBottom: 20 },
  product: {
    padding: 15,
    marginVertical: 5,
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
  },
  title: { fontSize: 16, fontWeight: "bold" },
  noPlan: { textAlign: "center", paddingVertical: 10 },
  activePlan: {
    textAlign: "center",
    paddingVertical: 10,
    fontWeight: "600",
    color: "green",
  },
  planCard: {
    padding: 8,
    borderRadius: 6,
    borderColor: "#000000",
    borderWidth: 1,
    marginBottom: 8,
  },
  priceRow: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "flex-end",
  },
  priceText: {
    color: "blue",
    fontSize: 18,
    marginVertical: 6,
    marginRight: 4,
  },
  subscribeButton: {
    textAlign: "center",
    fontSize: 16,
    color: "#FFFFFF",
  },
  manageButton: {
    textAlign: "center",
    fontSize: 16,
    color: "#FFFFFF",
  },
});
const RenderDynamic = ({ data }: { data: any }) => {
  if (data === null || data === undefined) return <Text>—</Text>;

  // primitive values
  if (typeof data === "string" || typeof data === "number" || typeof data === "boolean") {
    return <Text>{String(data)}</Text>;
  }

  // array
  if (Array.isArray(data)) {
    return (
      <Text>
        {data.map((item, index) => {
          if (typeof item === "object") {
            return (
              <Text key={index}>
                {index > 0 ? ", " : ""}
                {renderToString(item)}
              </Text>
            );
          }
          return (index > 0 ? ", " : "") + String(item);
        })}
      </Text>
    );
  }

  // object
  if (typeof data === "object") {
    return (
      <View style={{ marginLeft: 8 }}>
        {Object.entries(data).map(([key, value], index) => (
          <View key={index} style={{ flexDirection: "row", flexWrap: "wrap" }}>
            <Text style={{ fontWeight: "bold" }}>{key}: </Text>
            <RenderDynamic data={value} />
          </View>
        ))}
      </View>
    );
  }

  return <Text>Unsupported</Text>;
};

// helper for array joining when nested object
const renderToString = (obj: any): string => {
  if (obj === null || obj === undefined) return "—";
  if (typeof obj !== "object") return String(obj);
  if (Array.isArray(obj)) return obj.map(renderToString).join(", ");
  return Object.entries(obj)
    .map(([k, v]) => `${k}: ${renderToString(v)}`)
    .join(", ");
};
