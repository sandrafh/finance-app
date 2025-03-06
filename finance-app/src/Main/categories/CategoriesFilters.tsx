import React from 'react'
import { View } from 'react-native'

import { styles } from './CategoriesFiltersStyles'

import DownArrow from '@assets/icons/down-arrow.svg'

import { CustomButton, ButtonSizes, ButtonVariants } from '@components/CustomButton'
import { CustomInput } from '@components/CustomInput'
import { colors } from '@constants/ColorsConstants'
import { useCategories } from '@contexts/CategoriesContext'
import { CategoryFilterEnum } from '@constants/Filters'

interface CategoriesFiltersProps {
  filterCategories: (value: string) => void
}

export const CategoriesFilters = ({ filterCategories }: CategoriesFiltersProps) => {
  const { searchText, filtersModalRef, setFilterComponent, filterDatesValue } = useCategories()

  const openFiltersModal = () => {
    filtersModalRef.current?.show()
  }

  const onClickDate = () => {
    setFilterComponent(CategoryFilterEnum.Date)
    openFiltersModal()
  }

  const onClickCategories = () => {
    setFilterComponent(CategoryFilterEnum.Categories)
    openFiltersModal()
  }

  return (
    <View style={styles.container}>
      <CustomInput
        placeholder="Search categories"
        value={searchText}
        onChangeText={filterCategories}
        haveClearButton={true}
      />
      <View style={styles.containerButtons}>
        <CustomButton
          title={filterDatesValue}
          onPress={onClickDate}
          variant={ButtonVariants.Outlined}
          style={styles.button}
          size={ButtonSizes.Small}
          rightIcon={<DownArrow width={16} height={16} color={colors.white} />}
        />
        <CustomButton
          title="Categories"
          onPress={onClickCategories}
          variant={ButtonVariants.Outlined}
          style={styles.button}
          size={ButtonSizes.Small}
          rightIcon={<DownArrow width={16} height={16} color={colors.white} />}
        />
      </View>
    </View>
  )
}
