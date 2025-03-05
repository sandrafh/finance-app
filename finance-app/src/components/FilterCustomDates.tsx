import React from 'react'
import { View } from 'react-native'

import { styles } from './FilterCustomDatesStyles'

import { CustomText } from './CustomText'
import { DateInput } from './DateInput'

interface FilterCustomDatesProps {
  startDate: Date
  setStartDate: (date: Date) => void
  endDate: Date
  setEndDate: (date: Date) => void
}

export const FilterCustomDates = ({ startDate, setStartDate, endDate, setEndDate }: FilterCustomDatesProps) => {
  return (
    <View style={styles.container}>
      <DateInput date={startDate} setDate={setStartDate} />
      <DateInput date={endDate} setDate={setEndDate} />
    </View>
  )
}
