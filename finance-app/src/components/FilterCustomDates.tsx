import React from 'react'
import { View } from 'react-native'

import { styles } from './FilterCustomDatesStyles'

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
      <DateInput date={startDate} setDate={setStartDate} onOpenCalendar={() => {}} />
      <DateInput date={endDate} setDate={setEndDate} onOpenCalendar={() => {}} />
    </View>
  )
}
