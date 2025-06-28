import { NavigationProp, ParamListBase, useNavigation } from '@react-navigation/native';
import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import Toast from 'react-native-toast-message';
import FlexTextOpacity from '../../components/InterventionDetails/FlexTextOpacity';
import GradientButton from '../../components/sheard/GradientButton';
import SubscriptionCard from '../../components/Subscriptions/SubscriptionCard';
import { globalStyles } from '../../constant/styles';
import { useGlobalContext } from '../../providers/GlobalContextProvider';
import { useGetSubscriptionQuery } from '../../redux/Apis/subscriptionApis';
import { ISubscription } from '../../types/DataTypes';
import { hexToRGBA } from '../../utils/hexToRGBA';

const Subscription = () => {
  const navigate = useNavigation<NavigationProp<ParamListBase>>()
  const { themeColors, width, height } = useGlobalContext();
  const [selected, setSelected] = React.useState('');
  const { data } = useGetSubscriptionQuery(undefined)
  const handlePayment = () => {
    if (selected) {
      navigate.navigate('Payment', { params: { id: selected } })
    } else {
      Toast.show({
        type: 'error',
        text1: 'Please select a plan',
      })
    }
  }
  return (
    <SafeAreaView
      style={{
        paddingHorizontal: 20,
        position: 'relative',
        height: height,
      }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
      >
        <Text style={[globalStyles.inputLabel]}>Current Plan</Text>
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
              Basic Plan
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
              Active
            </Text>
          </View>
          <FlexTextOpacity
            text1="Purchase Date :"
            text2="25 Aug,2024"
            color={hexToRGBA(themeColors.black as string, 0.6)}
          />
          <FlexTextOpacity
            text1="Expiration Date :"
            text2="25 Nov,2024"
            color={hexToRGBA(themeColors.black as string, 0.6)}
          />
          <TouchableOpacity
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
              Cancel Request
            </Text>
          </TouchableOpacity>
        </View>
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
            <Text
              style={{
                color: 'white',
                textAlign: 'center',
                fontWeight: 700,
                fontSize: 18,
              }}>
              Upgrade Now
            </Text>
          </GradientButton>
        </View>
      </ScrollView>

    </SafeAreaView>
  );
};

export default Subscription;

const styles = StyleSheet.create({});
