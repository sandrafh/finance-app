import React from 'react'
import { View } from 'react-native'

import { styles } from './CategoriesFiltersStyles'

import DownArrow from '@/src/assets/icons/down-arrow.svg'

import { CustomButton, ButtonSizes, ButtonVariants } from '@/src/components/CustomButton'
import { CustomInput } from '@/src/components/CustomInput'
import { colors } from '@/src/constants/ColorsConstants'
import { CategoryFilterEnum, useCategories } from '@/src/contexts/CategoriesContext'

interface CategoriesFiltersProps {
  filterCategories: (value: string) => void
}

export const CategoriesFilters = ({ filterCategories }: CategoriesFiltersProps) => {
  const { searchText, filtersModalRef, setFilterComponent } = useCategories()

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
          title="Date"
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
