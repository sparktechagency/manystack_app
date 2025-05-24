import DateTimePicker from '@react-native-community/datetimepicker'
import { NavigationProp, useNavigation } from '@react-navigation/native'
import React, { useState } from 'react'
import { Image, ImageSourcePropType, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Calender } from '../../constant/images'
import { globalStyles } from '../../constant/styles'
import { useGlobalContext } from '../../providers/GlobalContextProvider'
import { StackTypes } from '../../types/ScreenPropsTypes'
import { hexToRGBA } from '../../utils/hexToRGBA'
import GradientButton from '../sheard/GradientButton'

const FilterByDate = () => {
  const navigate = useNavigation<NavigationProp<StackTypes>>()
  const { themeColors } = useGlobalContext()

  const [fromDate, setFromDate] = useState<Date | undefined>()
  const [toDate, setToDate] = useState<Date | undefined>()

  const [showFromPicker, setShowFromPicker] = useState(false)
  const [showToPicker, setShowToPicker] = useState(false)

  const onFromChange = (event: any, selectedDate?: Date) => {
    setShowFromPicker(Platform.OS === 'ios')
    if (selectedDate) setFromDate(selectedDate)
  }

  const onToChange = (event: any, selectedDate?: Date) => {
    setShowToPicker(Platform.OS === 'ios')
    if (selectedDate) setToDate(selectedDate)
  }

  const formatDate = (date?: Date) => {
    if (!date) return '00/00/000'
    const day = date.getDate().toString().padStart(2, '0')
    const month = (date.getMonth() + 1).toString().padStart(2, '0')
    const year = date.getFullYear()
    return `${day}/${month}/${year}`
  }

  return (
    <View >
      <Text style={{
        fontSize: 16,
        fontWeight: 600,
        marginBottom: 6
      }}>Filter by date</Text>
      <View style={styles.row}>
        <View style={styles.inputGroup}>
          <Text style={[
            styles.label,
            {
              color: showFromPicker ? hexToRGBA(themeColors.primary as string, 1) : hexToRGBA(themeColors.black as string, .6)
            }
          ]}>From</Text>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => setShowFromPicker(true)}
          >
            <View style={[
              styles.inputWrapper,
              {
                borderColor: showFromPicker ? hexToRGBA(themeColors.primary as string, 1) : hexToRGBA(themeColors.black as string, .6)
              }
            ]}>
              <Text style={[
                styles.inputText,
                {
                  color: showFromPicker ? hexToRGBA(themeColors.primary as string, 1) : hexToRGBA(themeColors.black as string, .6)
                }
              ]}>{formatDate(fromDate)}</Text>
              <Image
                source={Calender as ImageSourcePropType}
                style={{
                  height: 20,
                  width: 20,
                }}
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
          <Text style={[
            styles.label,
            {
              color: showToPicker ? hexToRGBA(themeColors.primary as string, 1) : hexToRGBA(themeColors.black as string, .6)
            }
          ]}>To</Text>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => setShowToPicker(true)}
          >
            <View style={[
              styles.inputWrapper,
              {
                borderColor: showToPicker ? hexToRGBA(themeColors.primary as string, 1) : hexToRGBA(themeColors.black as string, .6)
              }
            ]}>
              <Text style={[
                styles.inputText,
                {
                  color: showToPicker ? hexToRGBA(themeColors.primary as string, 1) : hexToRGBA(themeColors.black as string, .6)
                }
              ]}>{formatDate(toDate)}</Text>
              <Image
                source={Calender as ImageSourcePropType}
                style={{
                  height: 20,
                  width: 20,
                }}
              />
            </View>
          </TouchableOpacity>
          {showToPicker && (
            <DateTimePicker
              value={toDate || new Date()}
              mode="date"
              display="default"
              onChange={onToChange}
              minimumDate={fromDate} // optional: min is From date
            />
          )}
        </View>
      </View>
      <View style={[globalStyles.flex, {
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: 16
      }]}>
        <Text style={{
          fontSize: 16,
          fontWeight: 600,
          marginBottom: 6
        }}>All Intervention</Text>
        <GradientButton handler={() => navigate.navigate('CreateIntervention')}>
          <Text style={{ color: 'white', textAlign: 'center', fontWeight: 700, fontSize: 18, }}>Add An Intervention</Text>
        </GradientButton>
      </View>
    </View>
  )
}

export default FilterByDate

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
    paddingVertical: 6
  },

})
