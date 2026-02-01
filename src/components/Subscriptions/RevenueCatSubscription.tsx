// import {
//   NavigationProp,
//   ParamListBase,
//   useNavigation,
//   useRoute,
// } from '@react-navigation/native';
// import React, { useEffect, useState } from 'react';
// import {
//   ActivityIndicator,
//   Linking,
//   Platform,
//   ScrollView,
//   Text,
//   TouchableOpacity,
//   View,
// } from 'react-native';
// import Purchases, {
//   PurchasesOffering,
//   PurchasesPackage,
// } from 'react-native-purchases';
// import RNRestart from 'react-native-restart';
// import { useSafeAreaInsets } from 'react-native-safe-area-context';
// import { useGetProfileQuery } from '../../redux/Apis/userApis';
// import BackButton from '../sheard/BackButton';

// const RevenueCatSubscription = () => {
//   const { top, bottom } = useSafeAreaInsets();
//   const [offerings, setOfferings] = useState<PurchasesOffering | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [processingPackageId, setProcessingPackageId] = useState<string | null>(
//     null,
//   );
//   const [activeProductIds, setActiveProductIds] = useState<string[]>([]);
//   const { params }: any = useRoute();
//   const navigation = useNavigation<NavigationProp<ParamListBase>>();
//   const { data } = useGetProfileQuery(undefined);
//   useEffect(() => {
//     const apiKey =
//       Platform.OS === 'ios'
//         ? 'appl_tHakSyAztiXzbzeqtARsyrRdgpp'
//         : 'goog_yTkIkCOSSUxCAjntXwSjguTpAWP';

//     Purchases.configure({ apiKey, appUserID: data?.data?._id });

//     const fetchData = async () => {
//       try {
//         const data = await Purchases.getOfferings();
//         if (data.current) {
//           setOfferings(data.current);
//         }

//         const customerInfo = await Purchases.getCustomerInfo();
//         const activeSubs = customerInfo.activeSubscriptions || [];
//         setActiveProductIds(activeSubs as string[]);
//       } catch (error) {
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   const handlePurchase = async (pack: PurchasesPackage) => {
//     try {
//       setProcessingPackageId(pack.identifier);
//       const result = await Purchases.purchasePackage(pack);

//       if (result && result.customerInfo) {
//         await RNRestart.restart();
//       }
//       await RNRestart.restart();
//     } catch (error) {
//     } finally {
//       setProcessingPackageId(null);
//     }
//   };

//   const openSubscriptionManagement = (productId: string) => {
//     if (Platform.OS === 'android') {
//       Linking.openURL(
//         `https://play.google.com/store/account/subscriptions?sku=${productId}&package=${'com.shaharulsiyam.fibrepro'}`,
//       );
//     } else {
//       Linking.openURL('https://apps.apple.com/account/subscriptions');
//     }
//   };

//   if (loading) {
//     return (
//       <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//         <ActivityIndicator />
//       </View>
//     );
//   }

//   if (!offerings || !offerings.availablePackages.length) {
//     return (
//       <View
//         style={{
//           flex: 1,
//           justifyContent: 'center',
//           alignItems: 'center',
//           paddingTop: top,
//           paddingBottom: bottom,
//         }}>
//         <Text>Aucun abonnement disponible.</Text>
//       </View>
//     );
//   }
//   return (
//     <View style={{ flex: 1, paddingTop: top, paddingBottom: bottom }}>
//       <ScrollView
//         contentContainerStyle={{ paddingHorizontal: 16, paddingTop: 16 }}>
//         {params?.params?.show && <BackButton text={'Abonnement'} />}
//         {offerings.availablePackages.map(pack => {
//           const isActive = activeProductIds.includes(pack.product.identifier);

//           return (
//             <View
//               key={pack.identifier}
//               style={{
//                 marginTop: 16,
//                 padding: 16,
//                 borderRadius: 12,
//                 borderWidth: 1,
//                 borderColor: '#e5e5e5',
//               }}>
//               <Text style={{ fontSize: 14, fontWeight: '500', marginBottom: 4 }}>
//                 {pack.product.title || pack.product.identifier}
//               </Text>
//               <Text style={{ fontSize: 16, fontWeight: '600', marginBottom: 4 }}>
//                 {pack.product.priceString}
//               </Text>
//               <Text style={{ fontSize: 14, marginBottom: 4 }}>
//                 {
//                   'Gérez vos finances, factures, dépenses et fichiers PDF avec accès à la source.'
//                 }
//               </Text>

//               {isActive ? (
//                 <>
//                   <Text style={{ marginBottom: 8 }}>Forfait actuel</Text>
//                   <TouchableOpacity
//                     onPress={() =>
//                       openSubscriptionManagement(pack.product.identifier)
//                     }
//                     style={{
//                       backgroundColor: '#4b5563',
//                       paddingVertical: 10,
//                       borderRadius: 9999,
//                       alignItems: 'center',
//                     }}>
//                     <Text style={{ color: '#ffffff', fontWeight: '600' }}>
//                       Gérer / Annuler la souscription
//                     </Text>
//                   </TouchableOpacity>
//                 </>
//               ) : (
//                 <TouchableOpacity
//                   disabled={processingPackageId === pack.identifier}
//                   onPress={() => handlePurchase(pack)}
//                   style={{
//                     backgroundColor: '#2563eb',
//                     paddingVertical: 10,
//                     borderRadius: 9999,
//                     alignItems: 'center',
//                   }}>
//                   <Text style={{ color: '#ffffff', fontWeight: '600' }}>
//                     {processingPackageId === pack.identifier
//                       ? 'Processing...'
//                       : 'Souscrire'}
//                   </Text>
//                 </TouchableOpacity>
//               )}
//             </View>
//           );
//         })}
//         <View
//           style={{
//             marginTop: 24,
//             flexDirection: 'row',
//             justifyContent: 'center',
//             gap: 24,
//             flexWrap: 'wrap',
//           }}>
//           <TouchableOpacity
//             onPress={() => navigation.navigate('PrivacyPolicy')}>
//             <Text
//               style={{
//                 color: '#2563eb',
//                 textDecorationLine: 'underline',
//                 fontWeight: '500',
//               }}>
//               politique de confidentialité
//             </Text>
//           </TouchableOpacity>
//           <TouchableOpacity
//             onPress={() => navigation.navigate('TermsAndConditions')}>
//             <Text
//               style={{
//                 color: '#2563eb',
//                 textDecorationLine: 'underline',
//                 fontWeight: '500',
//               }}>
//               Conditions générales
//             </Text>
//           </TouchableOpacity>
//         </View>
//       </ScrollView>
//     </View>
//   );
// };

// export default RevenueCatSubscription;


import React from 'react'
import { StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import PaywallScreen from '../../screens/PaywallScreen'

export default function RevenueCatSubscription() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <PaywallScreen />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({})