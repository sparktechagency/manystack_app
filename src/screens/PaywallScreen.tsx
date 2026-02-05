import {
  NavigationProp,
  ParamListBase,
  useNavigation
} from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Image,
  ImageSourcePropType,
  Linking,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Purchases, { PurchasesPackage } from 'react-native-purchases';
import RNRestart from 'react-native-restart';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Bill, Binary, Camera2, HeartBeat, logo } from '../constant/images';
import { useGetProfileQuery } from '../redux/Apis/userApis';

export default function PaywallScreen() {
  const { top, bottom } = useSafeAreaInsets();
  const [packages, setPackages] = useState<PurchasesPackage[]>([]);
  const [selected, setSelected] = useState<PurchasesPackage | null>(null);
  const [loading, setLoading] = useState(true);
  const [processingPackageId, setProcessingPackageId] = useState<string | null>(null);
  const [activeProductIds, setActiveProductIds] = useState<string[]>([]);
  const navigation = useNavigation<NavigationProp<ParamListBase>>();
  const { data } = useGetProfileQuery(undefined);

  useEffect(() => {
    const apiKey =
      Platform.OS === 'ios'
        ? 'appl_tHakSyAztiXzbzeqtARsyrRdgpp'
        : 'goog_yTkIkCOSSUxCAjntXwSjguTpAWP';

    Purchases.configure({ apiKey, appUserID: data?.data?._id });

    loadOfferings();
  }, []);

  const loadOfferings = async () => {

    try {
      const offerings = await Purchases.getOfferings();

      if (offerings.current) {
        // console.log('🟢 Available Packages:', offerings.current.availablePackages);
        // offerings.current.availablePackages.forEach((pkg: any) => {
        //   console.log('🟢 Package:', {
        //     id: pkg.identifier,
        //     title: pkg.product.title,
        //     price: pkg.product.priceString,
        //     currency: pkg.product.currencyCode,
        //     period: pkg.product.subscriptionPeriod,
        //   });
        // });

        setPackages(offerings.current.availablePackages);
        setSelected(offerings.current.availablePackages[0]);
      }

      const customerInfo = await Purchases.getCustomerInfo();
      const activeSubs = customerInfo.activeSubscriptions || [];
      setActiveProductIds(activeSubs as string[]);
    } catch (error: any) {
      console.error('Error loading offerings:', error);
    } finally {
      setLoading(false);
    }
  };

  const purchase = async () => {
    if (!selected) return;

    try {
      setProcessingPackageId(selected.identifier);
      const result = await Purchases.purchasePackage(selected);

      if (result && result.customerInfo) {
        if (result.customerInfo.entitlements.active['pro']) {
          Alert.alert('Succès', 'Abonnement activé 🎉');
        }
        await RNRestart.restart();
      }
      await RNRestart.restart();
    } catch (e: any) {
      Alert.alert('Erreur', e.message);
    } finally {
      setProcessingPackageId(null);
    }
  };

  const restore = async () => {
    try {
      await Purchases.restorePurchases();
      // Alert.alert('Restauré', 'Achats restaurés');
      // Refresh offerings after restore
      await loadOfferings();
    } catch {
      Alert.alert('Erreur', 'Échec de la restauration');
    }
  };

  const openSubscriptionManagement = (productId: string) => {
    if (Platform.OS === 'android') {
      Linking.openURL(
        `https://play.google.com/store/account/subscriptions?sku=${productId}&package=com.shaharulsiyam.fibrepro`,
      );
    } else {
      Linking.openURL('https://apps.apple.com/account/subscriptions');
    }
  };

  const handleBackPress = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    }
  };

  if (loading) {
    return (
      <View style={[styles.center, { paddingTop: top, paddingBottom: bottom }]}>
        <ActivityIndicator size="large" />
      </View>
    );
  }
  if (!packages || packages.length === 0) {
    return (
      <View
        style={[
          styles.center,
          { paddingTop: top, paddingBottom: bottom, padding: 20 },
        ]}>
        <Text style={styles.emptyText}>Aucun abonnement disponible.</Text>
      </View>
    );
  }
  // console.log(packages)
  return (
    <ScrollView
      contentContainerStyle={[
        styles.container,
        // { paddingTop: top + 20, paddingBottom: bottom + 20 }
      ]}
    >
      {/* HEADER */}
      <View style={styles.header}>
        <Pressable
          style={styles.buttonStyle}
          onPress={handleBackPress}
        >
          <Text style={styles.buttonText}>Retour</Text>
        </Pressable>
        <Image
          style={{ width: 50, height: 50 }}
          source={logo as ImageSourcePropType}
        />
        <Pressable
          style={styles.buttonStyle}
          onPress={restore}
        >
          <Text style={styles.buttonText}>Restaurer</Text>
        </Pressable>
      </View>

      <Text style={styles.title}>FibrePro</Text>
      <Text style={styles.subtitle}>
        L'outil indispensable des techniciens fibre indépendants.
      </Text>

      {/* FEATURES */}
      <View style={styles.featureCard}>
        <Image
          style={styles.featureIcon}
          source={Binary as ImageSourcePropType}
        />
        <View style={styles.featureTextContainer}>
          <Text style={styles.featureTitle}>Gère tes interventions</Text>
          <Text style={styles.featureDesc}>
            Photos, notes, prix, réclamation en un clic.
          </Text>
        </View>
      </View>

      <View style={styles.featureCard}>
        <Image
          style={styles.featureIcon}
          source={HeartBeat as ImageSourcePropType}
        />
        <View style={styles.featureTextContainer}>
          <Text style={styles.featureTitle}>Suivi de dépenses</Text>
          <Text style={styles.featureDesc}>
            Suivi avec photo de la facture.
          </Text>
        </View>
      </View>

      <View style={styles.featureCard}>
        <Image
          style={styles.featureIcon}
          source={Camera2 as ImageSourcePropType}
        />
        <View style={styles.featureTextContainer}>
          <Text style={styles.featureTitle}>Photo horodatée</Text>
          <Text style={styles.featureDesc}>Photos géolocalisées.</Text>
        </View>
      </View>

      <View style={styles.featureCard}>
        <Image
          style={styles.featureIcon}
          source={Bill as ImageSourcePropType}
        />
        <View style={styles.featureTextContainer}>
          <Text style={styles.featureTitle}>Création de Facture</Text>
          <Text style={styles.featureDesc}>
            Factures pro illimitées.
          </Text>
        </View>
      </View>

      {/* PLANS */}
      {packages.map((pkg) => {
        const isSelected = selected?.identifier === pkg.identifier;
        const isActive = activeProductIds.includes(pkg.product.identifier);

        return (
          <View key={pkg.identifier}>
            <Pressable
              onPress={() => !isActive && setSelected(pkg)}
              style={[
                styles.planCard,
                isSelected && styles.planSelected,
                isActive && styles.planActive,
              ]}
              disabled={isActive}
            >
              {pkg?.product?.discounts?.[0]?.priceString ?
                <View style={{ position: 'absolute', top: 0, right: 0, backgroundColor: 'red', padding: 5, borderRadius: 5 }}>
                  <Text>{Math.round(((pkg.product.price - pkg?.product?.discounts?.[0].price) / pkg.product.price) * 100)}%</Text>
                </View> :
                null}
              <View style={styles.planHeader}>
                <Text style={styles.planTitle}>
                  {pkg.product.title}
                </Text>
                <Text style={styles.planType}>
                  {pkg.packageType}
                </Text>
              </View>
              <Text style={styles.planPrice}>
                {pkg.product.priceString}
              </Text>
              {isActive && (
                <Text style={styles.activeLabel}>Forfait actuel</Text>
              )}
            </Pressable>
            {/* </Text>mailto:siyamoffice0273@gmail.com */}

            {/* Show manage button for active subscriptions */}
            {isActive && (
              <Pressable
                style={styles.manageButton}
                onPress={() => openSubscriptionManagement(pkg.product.identifier)}
              >
                <Text style={styles.manageButtonText}>
                  Gérer / Annuler la souscription
                </Text>
              </Pressable>
            )}
          </View>
        );
      })}

      {!activeProductIds.some(id =>
        packages.some(pkg => pkg.product.identifier === id)
      ) && (
          <Pressable
            style={[
              styles.cta,
              processingPackageId && styles.ctaDisabled
            ]}
            onPress={purchase}
            disabled={!!processingPackageId || !selected}
          >
            <Text style={styles.ctaText}>
              {processingPackageId ? 'Processing...' : 'Continue'}
            </Text>
            <Text style={styles.ctaSub}>Annulable à tout moment</Text>
          </Pressable>
        )}

      {/* FOOTER LINKS */}
      <View style={styles.footerLinks}>
        <Pressable
          onPress={() => navigation.navigate('PrivacyPolicy')}
        >
          <Text style={styles.linkText}>
            politique de confidentialité
          </Text>
        </Pressable>
        <Pressable
          onPress={() => navigation.navigate('TermsAndConditions')}
        >
          <Text style={styles.linkText}>
            Conditions générales
          </Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#F8FAFC',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  logo: {
    width: 20,
    height: 20,
    objectFit: 'contain',
  },
  buttonStyle: {
    borderRadius: 50,
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: '#D7D7D7',
  },
  buttonText: {
    fontSize: 14,
    color: '#000',
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 16,
    color: '#64748B',
    marginBottom: 20,
  },
  featureCard: {
    backgroundColor: '#FFF',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 14,
    borderRadius: 12,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#D8D7DD',
  },
  featureIcon: {
    width: 24,
    height: 24,
    objectFit: 'contain',
  },
  featureTextContainer: {
    flex: 1,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  featureDesc: {
    color: '#64748B',
    marginTop: 4,
  },
  planCard: {
    backgroundColor: '#FFF',
    padding: 16,
    borderRadius: 14,
    marginTop: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    position: 'relative',
  },
  planSelected: {
    borderColor: '#3B82F6',
    backgroundColor: '#EFF6FF',
  },
  planActive: {
    borderColor: '#10B981',
    backgroundColor: '#F0FDF4',
  },
  planHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'relative',
  },
  planTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  planType: {
    fontSize: 10,
    fontWeight: '600',
    color: '#64748B',
  },
  planPrice: {
    marginTop: 6,
    fontSize: 18,
    fontWeight: '700',
  },
  activeLabel: {
    fontSize: 12,
    color: '#10B981',
    alignSelf: "flex-start",
    fontWeight: '600',
    backgroundColor: '#D1FAE5',
    marginTop: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  manageButton: {
    backgroundColor: '#4B5563',
    padding: 12,
    borderRadius: 14,
    marginTop: 8,
    alignItems: 'center',
  },
  manageButtonText: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: '600',
  },
  cta: {
    backgroundColor: '#3B82F6',
    padding: 16,
    borderRadius: 14,
    marginTop: 24,
    alignItems: 'center',
  },
  ctaDisabled: {
    backgroundColor: '#94A3B8',
  },
  ctaText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '700',
  },
  ctaSub: {
    color: '#DBEAFE',
    marginTop: 4,
  },
  footerLinks: {
    marginTop: 24,
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 24,
    flexWrap: 'wrap',
  },
  linkText: {
    color: '#3B82F6',
    textDecorationLine: 'underline',
    fontWeight: '500',
  },
  emptyText: {
    fontSize: 16,
    color: '#64748B',
    textAlign: 'center',
  },
});