import React from 'react'
import { View } from 'react-native'

import { styles } from './FilterDatesStyles'

import { ButtonVariants, CustomButton } from './CustomButton'
import { FilterDatesEnum } from '@constants/Filters'

interface FilterDatesProps {
  onPress: (filterDates: FilterDatesEnum) => void
}

export const FilterDates = ({ onPress }: FilterDatesProps) => {
  return (
    <View style={styles.container}>
      <CustomButton
        title={FilterDatesEnum.CurrentMonth}
        variant={ButtonVariants.Secondary}
        onPress={() => onPress(FilterDatesEnum.CurrentMonth)}
      />
      <CustomButton
        title={FilterDatesEnum.LastMonth}
        variant={ButtonVariants.Secondary}
        onPress={() => onPress(FilterDatesEnum.LastMonth)}
      />
      <CustomButton
        title={FilterDatesEnum.CurrentYear}
        variant={ButtonVariants.Secondary}
        onPress={() => onPress(FilterDatesEnum.CurrentYear)}
      />
      <CustomButton
        title={FilterDatesEnum.LastYear}
        variant={ButtonVariants.Secondary}
        onPress={() => onPress(FilterDatesEnum.LastYear)}
      />
      <CustomButton
        title={FilterDatesEnum.CustomDates}
        variant={ButtonVariants.Secondary}
        onPress={() => onPress(FilterDatesEnum.CustomDates)}
      />
    </View>
  )
}
