import React from 'react';
import {
  Image,
  ImageSourcePropType,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {Close, Plus} from '../../constant/images';
import {globalStyles} from '../../constant/styles';
import {useGlobalContext} from '../../providers/GlobalContextProvider';
import {useGetCategoriesQuery} from '../../redux/Apis/categoryApis';
import {IInvoiceService} from '../../types/loginType';
import {generateRandom} from '../../utils/generateRandom';
import {hexToRGBA} from '../../utils/hexToRGBA';
import {t} from '../../utils/translate';

const InvoiceService = ({
  service,
  setService,
  error,
  setError,
}: {
  service: IInvoiceService[];
  setService: (arg0: IInvoiceService[]) => void;
  error: any;
  setError: (arg0: any) => void;
}) => {
  const {width, themeColors, english} = useGlobalContext();
  const {data} = useGetCategoriesQuery(undefined);
  console.log(service);
  return (
    <View>
      <Text style={globalStyles.inputLabel}>
        {t('addServiceDetails', english)}
      </Text>
      <Text style={globalStyles.inputLabel}>{t('services', english)}</Text>
      {service.map((item, index) => (
        <View key={item.id}>
          <View
            style={{
              width: '100%',
              // width: (width - 120) / 2.5,
            }}>
            <TextInput
              value={item.service}
              onChangeText={text => {
                const updatedService = {
                  ...item,
                  service: text,
                };
                const newArray = service.map((s, i) =>
                  i === index ? updatedService : s,
                );
                setService(newArray);
              }}
              style={[
                globalStyles.input,
                error?.streetName ? globalStyles.inputError : {},
              ]}
              keyboardType="default"
              placeholder={t('service', english)}
              placeholderTextColor={globalStyles.inputPlaceholder.color}
            />
          </View>
          <View style={styles.row}>
            <TextInput
              value={item.quantity}
              onChangeText={text => {
                const updatedService = {
                  ...item,
                  quantity: text,
                };
                const newArray = service.map((s, i) =>
                  i === index ? updatedService : s,
                );
                setService(newArray);
              }}
              style={[
                globalStyles.input,
                error?.streetName ? globalStyles.inputError : {},
                // { maxWidth: (width - 120) / 3.5 },
                {maxWidth: (width - 100) / 2},
              ]}
              keyboardType="numeric"
              placeholder={t('quantity', english)}
              placeholderTextColor={globalStyles.inputPlaceholder.color}
            />
            <TextInput
              value={item.price}
              onChangeText={text => {
                const updatedService = {
                  ...item,
                  price: text,
                };
                const newArray = service.map((s, i) =>
                  i === index ? updatedService : s,
                );
                setService(newArray);
              }}
              style={[
                globalStyles.input,
                error?.postalCode ? globalStyles.inputError : {},
                {maxWidth: (width - 120) / 2},
                // { maxWidth: (width - 120) / 4 },
              ]}
              placeholder={t('price', english)}
              keyboardType="numeric"
              placeholderTextColor={globalStyles.inputPlaceholder.color}
            />
            <View
              style={[
                styles.row,
                {
                  marginTop: -15,
                  gap: 3,
                  justifyContent: 'center',
                },
              ]}>
              <TouchableOpacity
                onPress={() => {
                  setService([
                    ...service,
                    {
                      id: generateRandom(),
                      service: '',
                      quantity: '',
                      price: '',
                    },
                  ]);
                }}
                style={{
                  backgroundColor: hexToRGBA(
                    themeColors.primary as string,
                    0.1,
                  ),
                  padding: 6,
                  borderRadius: 6,
                }}>
                <Image
                  source={Plus as ImageSourcePropType}
                  style={{
                    width: 20,
                    height: 20,
                    tintColor: themeColors.primary as string,
                  }}
                />
              </TouchableOpacity>
              {index !== 0 && (
                <TouchableOpacity
                  onPress={() => {
                    const newArray = service.filter(s => s.id !== item.id);
                    setService(newArray);
                  }}
                  style={{
                    backgroundColor: hexToRGBA(themeColors.red as string, 0.1),
                    padding: 6,
                    borderRadius: 6,
                  }}>
                  <Image
                    source={Close as ImageSourcePropType}
                    style={{
                      width: 16,
                      height: 16,
                      tintColor: themeColors.red as string,
                    }}
                  />
                </TouchableOpacity>
              )}
            </View>
          </View>
        </View>
      ))}
    </View>
  );
};

export default InvoiceService;
const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 6,
    // marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 6,
    marginRight: 8,
    fontSize: 16,
    backgroundColor: 'white',
  },
  smallInput: {
    flex: 1,
    maxWidth: 80,
  },
});
