import { NavigationProp, useNavigation, useRoute } from '@react-navigation/native';
import React from 'react';
import {
  Image,
  ImageSourcePropType,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { Text } from 'react-native-gesture-handler';
import { DeleteIcon, DownloadPdf, Edit, FullLogo } from '../../constant/images';
import { globalStyles } from '../../constant/styles';
import { useGlobalContext } from '../../providers/GlobalContextProvider';
import { useGetInvoiceByIdQuery } from '../../redux/Apis/invoiceApis';
import { IInvoice } from '../../types/DataTypes';
import { StackTypes } from '../../types/ScreenPropsTypes';
import { hexToRGBA } from '../../utils/hexToRGBA';
import { CardStyles } from '../Intervention/InterventionsCards';
import FlexTextOpacity from '../InterventionDetails/FlexTextOpacity';
import GradientButton from '../sheard/GradientButton';

const InvoiceDetails = () => {
  const { params }: any = useRoute()
  const navigation = useNavigation<NavigationProp<StackTypes>>();
  const { themeColors, width, height } = useGlobalContext();
  const { data } = useGetInvoiceByIdQuery(params?.params?.id)
  const invoice = data?.invoice as IInvoice
  return (
    <SafeAreaView
      style={{
        paddingHorizontal: 20,
        position: 'relative',
        height: height,
      }}>
      <View
        style={[
          CardStyles.actions,
          { width: 90, marginLeft: 'auto', marginTop: -35, marginRight: 20 },
        ]}>
        <TouchableOpacity>
          <Image
            source={DownloadPdf as ImageSourcePropType}
            style={[
              CardStyles.icon,
              {
                tintColor: themeColors.primary as string,
              },
            ]}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('UpdateIntervention', {
              params: { id: '', category: '', price: '', note: '', status: '', },
            });
          }}>
          <Image
            source={Edit as ImageSourcePropType}
            style={[
              CardStyles.icon,
              {
                tintColor: themeColors.primary as string,
              },
            ]}
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image
            source={DeleteIcon as ImageSourcePropType}
            style={[
              CardStyles.icon,
              {
                tintColor: themeColors.red as string,
              },
            ]}
          />
        </TouchableOpacity>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
      >
        <View
          style={[
            globalStyles.flex,
            {
              justifyContent: 'space-between',
              alignItems: 'center',
              paddingBottom: 10,
              marginTop: 10,
              borderBottomWidth: 1,
              borderBottomColor: hexToRGBA(themeColors.primary as string, 0.5),

            },
          ]}>
          <Image
            source={FullLogo as ImageSourcePropType}
            style={{
              height: 60,
              width: 60,
              borderRadius: 8,
            }}
          />
          <View>
            <Text
              style={[
                globalStyles.inputLabel,
                { color: themeColors.primary as string, textAlign: 'right' },
              ]}>
              INV-20250507-001
            </Text>
            <Text
              style={[
                {
                  color: hexToRGBA(themeColors.black as string, 0.6),
                  textAlign: 'right',
                },
              ]}>
              25,Feb 2025
            </Text>
          </View>
        </View>

        <Text style={[globalStyles.inputLabel, { marginTop: 20 }]}>
          Customer Details
        </Text>

        <FlexTextOpacity text1="Name :" text2="John Doe" />
        <FlexTextOpacity text1="Email :" text2="siyamoffice0273@gmail.com" />
        <FlexTextOpacity text1="Contact :" text2="+8801566026301" />
        <FlexTextOpacity
          text1="Address :"
          text2="24B Rue Mandela,75010 Paris, France"
        />
        <FlexTextOpacity
          text1="Siren no :"
          text2="732 829 320"
          color={themeColors.primary as string}
        />
        <Text style={[globalStyles.inputLabel, { marginTop: 20 }]}>Services</Text>
        <View
          style={[
            {
              paddingBottom: 10,
              borderBottomWidth: 1,
              borderBottomColor: hexToRGBA(themeColors.primary as string, 0.5),
            },
          ]}>
          <View
            style={[
              globalStyles.flex,
              {
                justifyContent: 'space-between',
                alignItems: 'center',
                backgroundColor: hexToRGBA(themeColors.primary as string, 0.2),
                padding: 20,
                paddingVertical: 16,
                borderRadius: 8,
                marginBottom: 10,
              },
            ]}>
            <Text style={{ color: hexToRGBA(themeColors.black as string, 0.6) }}>
              {' '}
              No
            </Text>
            <Text style={{ color: hexToRGBA(themeColors.black as string, 0.6) }}>
              {' '}
              Name
            </Text>
            <Text style={{ color: hexToRGBA(themeColors.black as string, 0.6) }}>
              {' '}
              Quantity
            </Text>
            <Text style={{ color: hexToRGBA(themeColors.black as string, 0.6) }}>
              {' '}
              Price
            </Text>
          </View>
          <View
            style={[
              globalStyles.flex,
              {
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: 20,
                paddingVertical: 16,
                borderRadius: 8,
              },
            ]}>
            <Text style={{ color: hexToRGBA(themeColors.black as string, 0.6) }}>
              01
            </Text>
            <Text style={{ color: hexToRGBA(themeColors.black as string, 0.6) }}>
              After sales service
            </Text>
            <Text style={{ color: hexToRGBA(themeColors.black as string, 0.6) }}>
              01
            </Text>
            <Text style={{ color: hexToRGBA(themeColors.black as string, 0.6) }}>
              350.00$
            </Text>
          </View>
        </View>
        <FlexTextOpacity
          text1="Total :"
          text2="350.00$"
          color={themeColors.primary as string}
        />
        <FlexTextOpacity
          text1="Status :"
          text2="Unpaid"
          color={themeColors.red as string}
        />

        <View
          style={{
            paddingHorizontal: 25,
            // position: 'absolute',
            // bottom: 100,
            marginBottom: 100,
            width: "100%",
            paddingVertical: 16,
          }}>
          <GradientButton handler={() => { }}>
            <Text
              style={{
                color: 'white',
                textAlign: 'center',
                fontWeight: 700,
                fontSize: 18,
              }}>
              Mark As Paid
            </Text>
          </GradientButton>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default InvoiceDetails;

const styles = StyleSheet.create({});
