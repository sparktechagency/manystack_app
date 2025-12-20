import DateTimePicker from '@react-native-community/datetimepicker';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import {
  Image,
  ImageSourcePropType,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Calender, Plus } from '../../constant/images';
import { globalStyles } from '../../constant/styles';
import { useGlobalContext } from '../../providers/GlobalContextProvider';
import { StackTypes } from '../../types/ScreenPropsTypes';
import { hexToRGBA } from '../../utils/hexToRGBA';
import { t } from '../../utils/translate';
import GradientButton from '../sheard/GradientButton';

const FilterByDate = ({
  title,
  fromTOHandler,
}: {
  title?: string;
  fromTOHandler: (arg: string, arg0: string) => void;
}) => {
  const navigate = useNavigation<NavigationProp<StackTypes>>();
  const { themeColors, english } = useGlobalContext();

  const [fromDate, setFromDate] = useState<Date | undefined>();
  const [toDate, setToDate] = useState<Date | undefined>();

  const [showFromPicker, setShowFromPicker] = useState(false);
  const [showToPicker, setShowToPicker] = useState(false);

  const onFromChange = (event: any, selectedDate?: Date) => {
    setShowFromPicker(Platform.OS === 'ios');
    if (selectedDate) setFromDate(selectedDate);
  };
  const onToChange = (event: any, selectedDate?: Date) => {
    setShowToPicker(Platform.OS === 'ios');
    if (selectedDate) setToDate(selectedDate);
  };

  useEffect(() => {
    if (fromDate && toDate) {
      fromTOHandler(
        moment(fromDate).format('YYYY-MM-DD'),
        moment(toDate).format('YYYY-MM-DD'),
      );
    }
  }, [fromDate, toDate]);

  const formatDate = (date?: Date) => {
    if (!date) return '00/00/000';
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };
  const getAllTitleKey = () => {
    if (title === 'Expenses') return 'allExpenses';
    if (title === 'Invoice') return 'allInvoice';
    return 'allIntervention';
  };

  const getAddTitleKey = () => {
    if (title === 'Expenses') return 'addExpenses';
    if (title === 'Invoice') return 'addInvoice';
    return 'addIntervention';
  };

  return (
    <View>
      <Text style={{ fontSize: 16, fontWeight: '600', marginBottom: 6 }}>
        {t('filterByDate', english)}
      </Text>

      <View style={styles.row}>
        <View style={styles.inputGroup}>
          <Text
            style={[
              styles.label,
              {
                color: showFromPicker
                  ? hexToRGBA(themeColors.primary as string, 1)
                  : hexToRGBA(themeColors.black as string, 0.6),
              },
            ]}>
            {t('from', english)}
          </Text>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => setShowFromPicker(true)}>
            <View
              style={[
                styles.inputWrapper,
                {
                  borderColor: showFromPicker
                    ? hexToRGBA(themeColors.primary as string, 1)
                    : hexToRGBA(themeColors.black as string, 0.6),
                },
              ]}>
              <Text
                style={[
                  styles.inputText,
                  {
                    color: showFromPicker
                      ? hexToRGBA(themeColors.primary as string, 1)
                      : hexToRGBA(themeColors.black as string, 0.6),
                  },
                ]}>
                {formatDate(fromDate)}
              </Text>
              <Image
                source={Calender as ImageSourcePropType}
                style={{ height: 20, width: 20 }}
              />
            </View>
          </TouchableOpacity>
          {showFromPicker && (
            <DateTimePicker
              value={fromDate || new Date()}
              mode="date"
              display="default"
              onChange={onFromChange}
              maximumDate={toDate}
            />
          )}
        </View>

        <View style={styles.inputGroup}>
          <Text
            style={[
              styles.label,
              {
                color: showToPicker
                  ? hexToRGBA(themeColors.primary as string, 1)
                  : hexToRGBA(themeColors.black as string, 0.6),
              },
            ]}>
            {t('to', english)}
          </Text>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => setShowToPicker(true)}>
            <View
              style={[
                styles.inputWrapper,
                {
                  borderColor: showToPicker
                    ? hexToRGBA(themeColors.primary as string, 1)
                    : hexToRGBA(themeColors.black as string, 0.6),
                },
              ]}>
              <Text
                style={[
                  styles.inputText,
                  {
                    color: showToPicker
                      ? hexToRGBA(themeColors.primary as string, 1)
                      : hexToRGBA(themeColors.black as string, 0.6),
                  },
                ]}>
                {formatDate(toDate)}
              </Text>
              <Image
                source={Calender as ImageSourcePropType}
                style={{ height: 20, width: 20 }}
              />
            </View>
          </TouchableOpacity>
          {showToPicker && (
            <DateTimePicker
              value={toDate || new Date()}
              mode="date"
              display="default"
              onChange={onToChange}
              minimumDate={fromDate}
            />
          )}
        </View>
      </View>

      <View
        style={[
          globalStyles.flex,
          {
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: 16,
          },
        ]}>
        <Text style={{ fontSize: 16, fontWeight: '600', marginBottom: 6 }}>
          {t(getAllTitleKey(), english)}
        </Text>
        <GradientButton
          style={{ width: 70 }}
          handler={() => {
            if (title === 'Expenses') {
              navigate.navigate('CreateExpenses');
            } else if (title === 'Invoice') {
              navigate.navigate('CreateInvoice');
            } else {
              navigate.navigate('CreateIntervention');
            }
          }}>
          {/* <Text
            style={{
              color: 'white',
              textAlign: 'center',
              fontWeight: '700',
              fontSize: 18,
              paddingHorizontal: 10
            }}>
            {t(getAddTitleKey(), english)}
          </Text> */}
          <Image
            source={Plus as ImageSourcePropType}
            style={{
              tintColor: "white",
              height: 20,
              width: 20
            }}
          />
        </GradientButton>
      </View>
    </View>
  );
};

export default FilterByDate;

const styles = StyleSheet.create({
  heading: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 12,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  inputGroup: {
    flex: 1,
    marginHorizontal: 5,
  },
  label: {
    fontSize: 14,
    marginBottom: 6,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  inputText: {
    flex: 1,
    fontSize: 14,
    paddingVertical: 6,
  },
});
