import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native'
import React, { useState } from 'react'
import moment from 'moment'

const MonthButton = () => {
  const [selectedMonth, setSelectedMonth] = useState(moment().month())

  const months = Array.from({ length: 12 }, (_, i) => ({
    index: i,
    name: moment().month(i).format('MMMM')
  }))

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {months.map((month) => (
          <TouchableOpacity
            key={month.index}
            style={[
              styles.monthButton,
              selectedMonth === month.index && styles.selectedButton
            ]}
            onPress={() => setSelectedMonth(month.index)}
          >
            <Text
              style={[
                styles.monthText,
                selectedMonth === month.index && styles.selectedText
              ]}
            >
              {month.name}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  )
}

export default MonthButton

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
  },
  scrollContent: {
    paddingHorizontal: 10,
    gap: 10,
  },
  monthButton: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 25,
    backgroundColor: '#F5F5F5',
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  selectedButton: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },
  monthText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  selectedText: {
    color: '#FFFFFF',
  },
})
