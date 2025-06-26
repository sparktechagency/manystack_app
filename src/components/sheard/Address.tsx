import React from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { globalStyles } from '../../constant/styles';
import { useGlobalContext } from '../../providers/GlobalContextProvider';
import { IAddress } from '../../types/loginType';
import { t } from '../../utils/translate';

const Address = ({
  address,
  setAddress,
  error,
}: {
  address: IAddress;
  setAddress: (arg0: IAddress) => void;
  error: any;
}) => {
  const { width, english } = useGlobalContext();
  return (
    <View>
      <Text style={globalStyles.inputLabel}>{t('address', english)}</Text>
      <View style={styles.row}>
        <TextInput
          value={address?.streetNo}
          onChangeText={text =>
            setAddress({
              ...address,
              streetNo: text,
            })
          }
          style={[
            globalStyles.input,
            error?.streetNo ? globalStyles.inputError : {},
            { width: (width - 60) / 3 },
          ]}
          placeholder={t('streetNo', english)}
          placeholderTextColor={globalStyles.inputPlaceholder.color}
        />
        <TextInput
          value={address?.streetName}
          onChangeText={text =>
            setAddress({
              ...address,
              streetName: text,
            })
          }
          style={[
            globalStyles.input,
            error?.streetName ? globalStyles.inputError : {},
            { width: (width - 60) / 3 },
            { marginHorizontal: 10 },
          ]}
          placeholder={t('streetName', english).slice(0, 10)}
          placeholderTextColor={globalStyles.inputPlaceholder.color}
        />
        <TextInput
          value={address?.city}
          onChangeText={text =>
            setAddress({
              ...address,
              city: text,
            })
          }
          style={[
            globalStyles.input,
            error?.city ? globalStyles.inputError : {},
            { width: (width - 60) / 3 },
          ]}
          placeholder={t('city', english)}
          placeholderTextColor={globalStyles.inputPlaceholder.color}
        />
      </View>

      <View style={styles.row}>
        <TextInput
          value={address?.postalCode}
          onChangeText={text =>
            setAddress({
              ...address,
              postalCode: text,
            })
          }
          style={[
            globalStyles.input,
            error?.postalCode ? globalStyles.inputError : {},
            { width: (width - 50) / 2 },
            { marginRight: 10 },
          ]}
          placeholder={t('postalCode', english)}
          placeholderTextColor={globalStyles.inputPlaceholder.color}
        />
        <TextInput
          value={address?.country}
          onChangeText={text =>
            setAddress({
              ...address,
              country: text,
            })
          }
          style={[
            globalStyles.input,
            error?.country ? globalStyles.inputError : {},
            { width: (width - 50) / 2 },
          ]}
          placeholderTextColor={globalStyles.inputPlaceholder.color}
          placeholder={t('country', english)}
        />
      </View>
    </View>
  );
};

export default Address;

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    // marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginRight: 8,
    fontSize: 16,
    backgroundColor: 'white',
  },
  smallInput: {
    flex: 1,
    maxWidth: 80,
  },
});
