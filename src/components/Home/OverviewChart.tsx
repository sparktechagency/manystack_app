import React from 'react';
import { Text, View } from 'react-native';
import { BarChart } from 'react-native-gifted-charts';
import { globalStyles } from '../../constant/styles';
import { useGlobalContext } from '../../providers/GlobalContextProvider';
import { hexToRGBA } from '../../utils/hexToRGBA';
import { t } from '../../utils/translate';
interface MonthlyData {
  month: string;
  income: number;
  expenses: number;
  profit: number;
}
interface Props {
  monthlyData: MonthlyData[];
}
const OverviewChart = ({ monthlyData }: Props) => {
  const { themeColors, english } = useGlobalContext();
  const mapMonthlyDataToBarData = (monthlyData: MonthlyData[]) => {
    return monthlyData.flatMap(item => [
      {
        value: item.income,
        label: item.month,
        spacing: 2,
        labelWidth: 30,
        labelTextStyle: { color: 'gray' },
        frontColor: '#017FF4',
      },
      {
        value: item.expenses,
        frontColor: '#4CAF50',
        spacing: 2,
      },
      {
        value: item.profit,
        frontColor: '#F2C94C',
      },
    ]);
  };

  const getMaxValue = (monthlyData: MonthlyData[]): number => {
    return monthlyData.reduce((max, item) => {
      const currentMax = Math.max(item.income, item.expenses, item.profit);
      return currentMax > max ? currentMax : max;
    }, 0);
  };

  const barData = [
    // Jan
    {
      value: 40,
      label: 'Jan',
      spacing: 2,
      labelWidth: 30,
      labelTextStyle: { color: 'gray' },
      frontColor: '#017FF4',
    },
    { value: 20, frontColor: '#4CAF50', spacing: 2 },
    { value: 30, frontColor: '#F2C94C' },

    // Feb
    {
      value: 50,
      label: 'Feb',
      spacing: 2,
      labelWidth: 30,
      labelTextStyle: { color: 'gray' },
      frontColor: '#017FF4',
    },
    { value: 40, frontColor: '#4CAF50', spacing: 2 },
    { value: 35, frontColor: '#F2C94C' },

    // Mar
    {
      value: 75,
      label: 'Mar',
      spacing: 2,
      labelWidth: 30,
      labelTextStyle: { color: 'gray' },
      frontColor: '#017FF4',
    },
    { value: 25, frontColor: '#4CAF50', spacing: 2 },
    { value: 45, frontColor: '#F2C94C' },

    // Apr
    {
      value: 30,
      label: 'Apr',
      spacing: 2,
      labelWidth: 30,
      labelTextStyle: { color: 'gray' },
      frontColor: '#017FF4',
    },
    { value: 20, frontColor: '#4CAF50', spacing: 2 },
    { value: 28, frontColor: '#F2C94C' },

    // May
    {
      value: 60,
      label: 'May',
      spacing: 2,
      labelWidth: 30,
      labelTextStyle: { color: 'gray' },
      frontColor: '#017FF4',
    },
    { value: 40, frontColor: '#4CAF50', spacing: 2 },
    { value: 50, frontColor: '#F2C94C' },

    // Jun
    {
      value: 65,
      label: 'Jun',
      spacing: 2,
      labelWidth: 30,
      labelTextStyle: { color: 'gray' },
      frontColor: '#017FF4',
    },
    { value: 30, frontColor: '#4CAF50', spacing: 2 },
    { value: 40, frontColor: '#F2C94C' },
    {
      value: 65,
      label: 'July',
      spacing: 2,
      labelWidth: 30,
      labelTextStyle: { color: 'gray' },
      frontColor: '#017FF4',
    },
    { value: 30, frontColor: '#4CAF50', spacing: 2 },
    { value: 40, frontColor: '#F2C94C' },
    {
      value: 65,
      label: 'Aug',
      spacing: 2,
      labelWidth: 30,
      labelTextStyle: { color: 'gray' },
      frontColor: '#017FF4',
    },
    { value: 30, frontColor: '#4CAF50', spacing: 2 },
    { value: 40, frontColor: '#F2C94C' },
    {
      value: 65,
      label: 'Sept',
      spacing: 2,
      labelWidth: 30,
      labelTextStyle: { color: 'gray' },
      frontColor: '#017FF4',
    },
    { value: 30, frontColor: '#4CAF50', spacing: 2 },
    { value: 40, frontColor: '#F2C94C' },
    {
      value: 65,
      label: 'Oct',
      spacing: 2,
      labelWidth: 30,
      labelTextStyle: { color: 'gray' },
      frontColor: '#017FF4',
    },
    { value: 30, frontColor: '#4CAF50', spacing: 2 },
    { value: 40, frontColor: '#F2C94C' },
    {
      value: 65,
      label: 'Nov',
      spacing: 2,
      labelWidth: 30,
      labelTextStyle: { color: 'gray' },
      frontColor: '#017FF4',
    },
    { value: 30, frontColor: '#4CAF50', spacing: 2 },
    { value: 40, frontColor: '#F2C94C' },
    {
      value: 65,
      label: 'Dec',
      spacing: 2,
      labelWidth: 30,
      labelTextStyle: { color: 'gray' },
      frontColor: '#017FF4',
    },
    { value: 30, frontColor: '#4CAF50', spacing: 2 },
    { value: 40, frontColor: '#F2C94C' },
  ];

  const renderTitle = () => (
    <View style={{ marginVertical: 10 }}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-evenly',
          marginTop: 10,
          // backgroundColor: 'yellow',
          paddingVertical: 6,
          borderRadius: 8,
        }}>
        {/* Point 01 */}
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <View
            style={{
              height: 14,
              width: 24,
              borderRadius: 6,
              backgroundColor: '#49A56F',
              marginRight: 8,
            }}
          />
          <Text style={globalStyles.inputLabel}>{t('profit', english)}</Text>
        </View>

        {/* Point 02 */}
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <View
            style={{
              height: 14,
              width: 24,
              borderRadius: 6,
              backgroundColor: '#017FF4',
              marginRight: 8,
            }}
          />
          <Text style={globalStyles.inputLabel}>Chiffres d’affaires</Text>
        </View>

        {/* Point 03 */}
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <View
            style={{
              height: 14,
              width: 24,
              borderRadius: 6,
              backgroundColor: '#F2C94C',
              marginRight: 8,
            }}
          />
          <Text style={globalStyles.inputLabel}>{t('expanses', english)}</Text>
        </View>
      </View>
    </View>
  );

  return (
    <View
      style={{
        backgroundColor: hexToRGBA(themeColors.black as string, 0.04),
        paddingBottom: 10,
        borderRadius: 20,
        paddingHorizontal: 6,
      }}>
      {renderTitle()}

      <BarChart
        data={mapMonthlyDataToBarData(monthlyData)}
        barWidth={6}
        spacing={13}
        roundedTop
        roundedBottom
        hideRules
        xAxisThickness={0}
        yAxisThickness={0}
        yAxisTextStyle={{ color: 'gray' }}
        noOfSections={3}
        maxValue={getMaxValue(monthlyData)}
      />
    </View>
  );
};

export default OverviewChart;
