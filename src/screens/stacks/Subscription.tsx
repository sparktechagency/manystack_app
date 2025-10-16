import {
  NavigationProp,
  ParamListBase,
  useNavigation,
} from '@react-navigation/native';
import moment from 'moment';
import React from 'react';
import {
  ActivityIndicator,
  SafeAreaView,
  StyleSheet,
  Text,
  View
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';
import Toast from 'react-native-toast-message';
import FlexTextOpacity from '../../components/InterventionDetails/FlexTextOpacity';
import BackButton from '../../components/sheard/BackButton';
import GradientButton from '../../components/sheard/GradientButton';
import SubscriptionCard from '../../components/Subscriptions/SubscriptionCard';
import { globalStyles } from '../../constant/styles';
import {
  useCancelSubscription,
  useSubscriptionPayment,
} from '../../hooks/subscriptionApiCall';
import { useGlobalContext } from '../../providers/GlobalContextProvider';
import {
  useGetMySubscriptionQuery,
  useGetSubscriptionQuery
} from '../../redux/Apis/subscriptionApis';
import { ISubscription } from '../../types/DataTypes';
import { hexToRGBA } from '../../utils/hexToRGBA';
import { t } from '../../utils/translate';
interface ICurrentSubscription {
  success: boolean;
  subscription: {
    plan: string;
    isActive: boolean;
    isTrial: boolean;
    startDate: string;
    endDate: string;
  };
  planDetails: {
    trialPeriodDays: number;
    _id: string;
    name: string;
    price: number;
    validity: string;
    features: [string];
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
  };
}
const Subscription = () => {
  const navigate = useNavigation<NavigationProp<ParamListBase>>();
  const { themeColors, height, english } = useGlobalContext();
  const [selected, setSelected] = React.useState('');
  const { data } = useGetSubscriptionQuery(undefined);
  const { data: currentSubscription } = useGetMySubscriptionQuery(undefined);
  const { handleSubscriptionPayment, isLoading } = useSubscriptionPayment();
  const { handleCancelSubscription } = useCancelSubscription();
  const handlePayment = () => {
    if (selected) {
      handleSubscriptionPayment({ subscriptionId: selected }, (url: string) => {
        navigate.navigate('Payment', { params: { url } });
      });
    } else {
      Toast.show({
        type: 'error',
        text1: 'Please select a plan',
      });
    }
  };
  return (
    <SafeAreaView
      style={{
        paddingHorizontal: 20,
        position: 'relative',
        height: height,
      }}>
      <BackButton text={t('subscription', english)} />
      <KeyboardAwareScrollView bottomOffset={62} >
        <View style={{
          height: height,
          paddingHorizontal: 20,
          paddingVertical: 20,
        }}>


          <Text style={[globalStyles.inputLabel]}>Current Plan</Text>
          {!currentSubscription?.subscription?.isActive ? (
            <Text style={{ textAlign: 'center' }}>No Subscription Found</Text>
          ) : (
            <View
              style={{
                width: '100%',
                height: 'auto',
                backgroundColor: hexToRGBA(themeColors.primary as string, 0.1),
                padding: 16,
                borderRadius: 10,
              }}>
              <View
                style={[
                  globalStyles.flex,
                  {
                    justifyContent: 'space-between',
                  },
                ]}>
                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: '600',
                    color: themeColors.primary as string,
                  }}>
                  {currentSubscription?.subscription?.planDetails?.name}
                </Text>
                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: '600',
                    color: themeColors.white as string,
                    backgroundColor: hexToRGBA(themeColors.green as string, 0.6),
                    paddingHorizontal: 10,
                    borderRadius: 5,
                  }}>
                  {currentSubscription?.subscription?.isActive
                    ? 'Active'
                    : 'Inactive'}
                </Text>
              </View>
              <FlexTextOpacity
                text1="Purchase Date :"
                text2={moment(
                  currentSubscription?.subscription?.startDate,
                ).format('DD MMM,YYYY')}
                color={hexToRGBA(themeColors.black as string, 0.6)}
              />
              <FlexTextOpacity
                text1="Expiration Date :"
                text2={moment(currentSubscription?.subscription?.endDate).format(
                  'DD MMM,YYYY',
                )}
                color={hexToRGBA(themeColors.black as string, 0.6)}
              />
              {/* <TouchableOpacity
                onPress={handleCancelSubscription}
                style={{
                  flexDirection: 'row',
                  marginTop: 10,
                }}>
                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: '600',
                    color: themeColors.white as string,
                    backgroundColor: hexToRGBA(themeColors.red as string, 0.6),
                    paddingHorizontal: 10,
                    paddingVertical: 5,
                    borderRadius: 5,
                  }}>
                  Cancel Subscription
                </Text>
              </TouchableOpacity> */}
            </View>
          )}

          <Text
            style={[
              globalStyles.inputLabel,
              {
                marginTop: 20,
              },
            ]}>
            Available Plan
          </Text>
          {data?.subscriptions?.map((item: ISubscription, index: number) => (
            <SubscriptionCard
              selected={selected === item?._id}
              setSelected={setSelected}
              item={item}
              key={item?._id}
            />
          ))}
          <View
            style={{
              marginBottom: 120,
            }}>
            <GradientButton handler={handlePayment}>
              {isLoading ? (
                <ActivityIndicator color="white" />
              ) : (
                <Text
                  style={{
                    color: 'white',
                    textAlign: 'center',
                    fontWeight: 700,
                    fontSize: 18,
                  }}>
                  Upgrade Now
                </Text>
              )}
            </GradientButton>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default Subscription;

const styles = StyleSheet.create({});
