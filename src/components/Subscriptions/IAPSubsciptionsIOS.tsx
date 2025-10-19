import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRoute } from '@react-navigation/native';
import React, { useEffect, useMemo, useState } from "react";
import {
    Linking,
    Platform,
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
import { useSafeAreaInsets } from 'react-native-safe-area-context';


const IAPSubsciptionsIOS = () => {
  const { top, bottom } = useSafeAreaInsets()
    const { params }: any = useRoute();

    // Helper function to format subscription period dynamically
    const formatSubscriptionPeriod = (unit: string, number: string) => {
        const num = parseInt(number, 10);
        
        if (unit === "MONTH") {
            if (num === 1) return "Mensuel";
            if (num === 3) return "Trimestriel";
            if (num === 6) return "Semestriel";
            return `${num} mois`;
        }
        
        if (unit === "YEAR") {
            if (num === 1) return "Annuel";
            return `${num} ans`;
        }
        
        if (unit === "WEEK") {
            if (num === 1) return "Hebdomadaire";
            return `${num} semaines`;
        }
        
        if (unit === "DAY") {
            if (num === 1) return "Quotidien";
            return `${num} jours`;
        }
        
        return "Abonnement";
    };
    const { setShowSubscription } = useGlobalContext()
    const [planId, setPlanId] = useState("")
    const [is_active, setIsactive] = useState(false)
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
                console.log(purchase)
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

    const handlePurchase = async (productId: string) => {
        try {
            await AsyncStorage.setItem("productId", productId)
            await requestPurchase({
                request: {
                    ios: {
                        sku: productId,
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
            const productId = await AsyncStorage.getItem("productId")
            if (productId) {
                setPlanId(productId)
            }
            if (activeSubscriptions.length > 0) {
                setShowSubscription(false)
                // await AsyncStorage.setItem("isActive", "true")
            }
        }
        getSub()
    }, [activeSubscriptions])
    useEffect(() => {
        const isActive = activeSubscriptions?.find(sub => sub.isActive === true);
        if (isActive) {
            setIsactive(true)
        }
    }, [activeSubscriptions])
    const renderSubscriptions = useMemo(() => {
        return (
            <>
                {subscriptions.map((product: any) => (
                    <View key={product.productId} style={styles.product}>
                        <>
                            {is_active && product.productId === planId && (
                                <>
                                    <Text style={[styles.title, { marginBottom: 8 }]}>Forfait actuel
                                    </Text>
                                    <View style={styles.planCard}>
                                        <Text>
                                            {product.title || product.productId}
                                        </Text>
                                        <View style={styles.priceRow}>
                                            <Text style={styles.priceText}>
                                                {product.localizedPrice} /
                                            </Text>
                                            <Text>
                                                {formatSubscriptionPeriod(product.subscriptionPeriodUnitIOS, product.subscriptionPeriodNumberIOS)}
                                            </Text>
                                        </View>
                                        <Text style={{ marginBottom: 6 }}>
                                            Annuler à tout moment
                                        </Text>
                                        <GradientButton
                                            handler={async () => {
                                                await AsyncStorage.removeItem("isActive")
                                                openSubscriptionManagement(product.productId)
                                            }}
                                        >
                                            <Text style={styles.manageButton}>
                                                Gérer / Annuler la souscription
                                            </Text>
                                        </GradientButton>
                                    </View>
                                </>
                            )
                            }
                        </>
                        <>
                            <Text style={[styles.title, { marginVertical: 8 }]}>
                                Plans disponibles
                            </Text>
                            <View style={styles.planCard}>
                                <Text>
                                    {product.title || product.productId}
                                </Text>
                                <Text style={styles.description}>
                                    {product.description}
                                </Text>
                                <View style={styles.priceRow}>
                                    <Text style={styles.priceText}>
                                        {product.localizedPrice} /
                                    </Text>
                                    <Text>
                                        {formatSubscriptionPeriod(product.subscriptionPeriodUnitIOS, product.subscriptionPeriodNumberIOS)}
                                    </Text>
                                </View>
                                <Text style={{ marginBottom: 6 }}>
                                    Annuler à tout moment
                                </Text>
                                <GradientButton
                                    handler={() => handlePurchase(product?.productId)}
                                >
                                    <Text style={styles.subscribeButton}>
                                        S'abonner pour {product.localizedPrice}
                                    </Text>
                                </GradientButton>
                            </View>
                        </>

                    </View>
                ))}
            </>
        );
    }, [subscriptions, activeSubscriptions, is_active, planId]);
    return (
        <View
            style={{
                paddingTop: top,
                paddingBottom: bottom
            }}
        >
            <ScrollView>
                {
                    params?.params?.show && <BackButton text={'Souscription'} />
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
    description: { fontSize: 14, marginVertical: 4, color: "#666" },
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


export default IAPSubsciptionsIOS
