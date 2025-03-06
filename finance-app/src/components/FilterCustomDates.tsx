import { View } from 'react-native'

import { styles } from './FilterCustomDatesStyles'

import { DateInput } from './DateInput'
import { Dates } from '@constants/Filters'

interface FilterCustomDatesProps {
  startDate: Date
  setStartDate: (date: Date) => void
  endDate: Date
  setEndDate: (date: Date) => void
  onOpenCalendar: (value: Dates) => void
}

export const FilterCustomDates = ({
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  onOpenCalendar,
}: FilterCustomDatesProps) => {
  return (
    <View style={styles.container}>
      <DateInput
        label="From"
        date={startDate}
        setDate={setStartDate}
        onOpenCalendar={() => onOpenCalendar(Dates.StartDate)}
      />
      <DateInput label="To" date={endDate} setDate={setEndDate} onOpenCalendar={() => onOpenCalendar(Dates.EndDate)} />
    </View>
  )
}
