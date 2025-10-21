import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRoute } from '@react-navigation/native';
import React, { useEffect, useMemo, useState } from "react";
import {
    Alert,
    Linking,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from "react-native";
import { useIAP, ErrorCode } from "react-native-iap";
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
    const { setShowSubscription } = useGlobalContext();
    const [planId, setPlanId] = useState("");
    const [is_active, setIsactive] = useState(false);

    // Error handler
    const handlePurchaseError = (error: any) => {
        switch (error.code) {
            case ErrorCode.E_USER_CANCELLED:
                // User cancelled - don't show error
                break;
            case ErrorCode.E_BILLING_UNAVAILABLE:
                Alert.alert('Achats non disponibles', 'Les achats ne sont pas autorisés sur cet appareil');
                break;
            case ErrorCode.E_PURCHASE_ERROR:
                Alert.alert('Erreur', 'Informations de paiement invalides');
                break;
            default:
                Alert.alert('Échec de l\'achat', error.message);
        }
    };

    const {
        connected,
        subscriptions,
        fetchProducts,
        requestPurchase,
        finishTransaction,
        activeSubscriptions,
        getActiveSubscriptions,
        validateReceipt
    } = useIAP({
        onPurchaseSuccess: async (purchase) => {
            console.log('Purchase successful:', purchase);
            try {
                // Finish transaction
                await finishTransaction({ purchase, isConsumable: false });
                // Save product ID
                await AsyncStorage.setItem("productId", purchase.productId);
                await AsyncStorage.setItem("isActive", "true");

                // Restart app
                await RNRestart.restart();
            } catch (e) {
                console.error('Error handling purchase:', e);
            }
        },
        onPurchaseError: (error) => {
            console.error('Purchase failed:', error);
            handlePurchaseError(error);
        },
    });

    const productIds = ["fibre_pro_subscriptions","3mois","6mois"];
    useEffect(() => {
        if (connected) {
            fetchProducts({ skus: productIds, type: "subs" });
            getActiveSubscriptions();
        }
    }, [connected]);

    const handlePurchase = async (productId: string) => {
        try {
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
                {subscriptions.map((product: any) => {
                    // Check if current product is the active subscription
                    const isCurrentPlan = is_active && product.productId === planId;

                    return (
                        <View key={product.productId} style={styles.product}>
                            {/* Active Subscription Section */}
                            {isCurrentPlan && (
                                <>
                                    <Text style={[styles.title, { marginBottom: 8 }]}>
                                        Forfait actuel
                                    </Text>
                                    <View style={styles.planCard}>
                                        <Text style={styles.productTitle}>
                                            {product.title || product.productId}
                                        </Text>
                                        {product.description && (
                                            <Text style={styles.description}>
                                                {product.description}
                                            </Text>
                                        )}
                                        <View style={styles.priceRow}>
                                            <Text style={styles.priceText}>
                                                {product.localizedPrice} /
                                            </Text>
                                            <Text>
                                                {formatSubscriptionPeriod(
                                                    product.subscriptionPeriodUnitIOS,
                                                    product.subscriptionPeriodNumberIOS
                                                )}
                                            </Text>
                                        </View>
                                        {product.introductoryPriceSubscriptionPeriodIOS && (
                                            <Text style={styles.trialInfo}>
                                                Essai: {product.introductoryPricePaymentModeIOS === 'FREETRIAL'
                                                    ? 'Gratuit'
                                                    : product.introductoryPrice}
                                                {' '}{formatSubscriptionPeriod(
                                                    product.introductoryPriceSubscriptionPeriodIOS?.unit || 'DAY',
                                                    product.introductoryPriceSubscriptionPeriodIOS?.numberOfUnits || '0'
                                                )}
                                            </Text>
                                        )}
                                        <Text style={{ marginBottom: 6 }}>
                                            Annuler à tout moment
                                        </Text>
                                        <GradientButton
                                            handler={async () => {
                                                await AsyncStorage.removeItem("isActive");
                                                openSubscriptionManagement(product.productId);
                                            }}
                                        >
                                            <Text style={styles.manageButton}>
                                                Gérer / Annuler la souscription
                                            </Text>
                                        </GradientButton>
                                    </View>
                                </>
                            )}

                            {/* Available Plans Section */}
                            <Text style={[styles.title, { marginVertical: 8 }]}>
                                {isCurrentPlan ? 'Autres plans disponibles' : 'Plans disponibles'}
                            </Text>
                            <View style={styles.planCard}>
                                <Text style={styles.productTitle}>
                                    {product.title || product.productId}
                                </Text>
                                {product.description && (
                                    <Text style={styles.description}>
                                        {product.description}
                                    </Text>
                                )}
                                <View style={styles.priceRow}>
                                    <Text style={styles.priceText}>
                                        {product.localizedPrice} /
                                    </Text>
                                    <Text>
                                        {formatSubscriptionPeriod(
                                            product.subscriptionPeriodUnitIOS,
                                            product.subscriptionPeriodNumberIOS
                                        )}
                                    </Text>
                                </View>

                                {/* Show introductory price/trial if available */}
                                {product.introductoryPriceSubscriptionPeriodIOS && (
                                    <Text style={styles.trialInfo}>
                                        {product.introductoryPricePaymentModeIOS === 'FREETRIAL'
                                            ? `✨ Essai gratuit de ${formatSubscriptionPeriod(
                                                product.introductoryPriceSubscriptionPeriodIOS?.unit || 'DAY',
                                                product.introductoryPriceSubscriptionPeriodIOS?.numberOfUnits || '0'
                                            )}`
                                            : `✨ ${product.introductoryPrice} pour ${formatSubscriptionPeriod(
                                                product.introductoryPriceSubscriptionPeriodIOS?.unit || 'DAY',
                                                product.introductoryPriceSubscriptionPeriodIOS?.numberOfUnits || '0'
                                            )}`
                                        }
                                    </Text>
                                )}

                                <Text style={{ marginBottom: 6 }}>
                                    Annuler à tout moment
                                </Text>
                                {!isCurrentPlan ? (
                                    <GradientButton
                                        handler={() => handlePurchase(product.productId)}
                                    >
                                        <Text style={styles.subscribeButton}>
                                            S'abonner pour {product.localizedPrice}
                                        </Text>
                                    </GradientButton>
                                ) : (
                                    <View style={styles.currentPlanBadge}>
                                        <Text style={styles.currentPlanText}>
                                            ✓ Plan actuel
                                        </Text>
                                    </View>
                                )}
                            </View>
                        </View>
                    );
                })}
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
    productTitle: { fontSize: 15, fontWeight: "600", marginBottom: 4 },
    description: { fontSize: 14, marginVertical: 4, color: "#666" },
    trialInfo: {
        fontSize: 13,
        marginVertical: 4,
        color: "#007AFF",
        fontWeight: "500"
    },
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
    currentPlanBadge: {
        padding: 12,
        borderRadius: 6,
        backgroundColor: "#E8F5E9",
        borderWidth: 1,
        borderColor: "#4CAF50",
        alignItems: "center",
    },
    currentPlanText: {
        fontSize: 16,
        fontWeight: "600",
        color: "#2E7D32",
    },
});


export default IAPSubsciptionsIOS
