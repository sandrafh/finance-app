import React, { useEffect } from 'react'
import { View } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'

import { styles } from './CategoriesViewStyles'

//Internal components
import { CustomButton, ButtonVariants } from '@/src/components/CustomButton'
import { NavigationAppScreens } from '@/src/navigation/NavigationConstants'
import { CategoriesList } from './CategoriesList'
import { useDispatch, useSelector } from 'react-redux'
import { getCategories } from '@/src/redux/slices/category'
import { setSelectedParentCategory } from '@/src/redux/slices/ui'
import { Category } from '@/src/constants/Category'
import { EmptyMessage } from '@/src/components/EmptyMessage'
import { getCategoryBudgetType } from '@/src/redux/slices/settings'
import { CategoryBudgetTypeEnum } from '@/src/constants/Settings'
import { RootState } from '@/src/redux/store'
import { InfoText } from '@/src/components/InfoText'
import { CategoriesFilters } from './CategoriesFilters'
import { FiltersModal } from '@/src/modals/FiltersModal'
import { CategoryFilterEnum, useCategories } from '@/src/contexts/CategoriesContext'
import { FilterDates } from '@/src/components/FilterDates'
import { FilterCustomDates } from '@/src/components/FilterCustomDates'

export const CategoriesView = () => {
  const dispatch = useDispatch()
  const navigation = useNavigation<NativeStackNavigationProp<any>>()

  const { setSearchText, filteredCategories, setFilteredCategories, filterComponent, filtersModalRef } = useCategories()

  const categories = useSelector((state: any) => getCategories(state))
  const categoryBudgetType: CategoryBudgetTypeEnum = useSelector((state: RootState) => getCategoryBudgetType(state))

  useEffect(() => {
    setFilteredCategories(categories)
  }, [categories])

  const onAddCategory = () => () => {
    setSearchText('')
    navigation.navigate(NavigationAppScreens.AddCategory)
  }

  const onSelectCategory = (category: any) => {
    if (category.parentCategoryUid) {
      const parentCategory = categories.find((c: any) => c.uid === category.parentCategoryUid)
      dispatch(setSelectedParentCategory(parentCategory as Category))
    }
    setSearchText('')
    navigation.navigate(NavigationAppScreens.AddCategory, { isEdit: true, category })
  }

  const sumCategoriesPercentage = () => {
    return categories
      .filter((category: Category) => category.parentCategoryUid === undefined)
      .reduce((acc: number, category: Category) => acc + category.budget, 0)
  }

  const filterCategories = (value: string) => {
    setSearchText(value)
    const lowerCaseValue = value.toLowerCase()

    const filterCategory = (category: Category): Category | null => {
      const nameMatches = category.name.toLowerCase().includes(lowerCaseValue)

      const matchingChildren = category.categories
        ?.map(filterCategory)
        .filter((child): child is Category => child !== null)

      if (nameMatches || (matchingChildren && matchingChildren.length > 0)) {
        return {
          ...category,
          categories: matchingChildren,
        }
      }

      return null // Exclude this category if it and its children don't match
    }

    const filtered = categories.map(filterCategory).filter((category): category is Category => category !== null)

    setFilteredCategories(filtered)
  }

  const getFiltersContent = () => {
    switch (filterComponent) {
      case CategoryFilterEnum.Date:
        return <FilterDates />
      case CategoryFilterEnum.CustomDate:
        return <FilterCustomDates />
      default:
        return null
    }
  }

  return (
    <View style={styles.container}>
      {categories.length === 0 ? (
        <EmptyMessage text="No categories yet" />
      ) : (
        <View style={styles.listContainer}>
          <CategoriesFilters filterCategories={filterCategories} />
          {categoryBudgetType === CategoryBudgetTypeEnum.Percentage && (
            <InfoText text={`Your categories add up to ${sumCategoriesPercentage()}%`} />
          )}
          <CategoriesList
            onSelect={onSelectCategory}
            showPercentage={categoryBudgetType === CategoryBudgetTypeEnum.Percentage}
            filteredCategories={filteredCategories}
          />
        </View>
      )}
      <View style={styles.buttonContainer}>
        <CustomButton title="Add Category" onPress={onAddCategory()} variant={ButtonVariants.Primary} />
      </View>
      <FiltersModal modalRef={filtersModalRef}>{getFiltersContent()}</FiltersModal>
    </View>
  )
}
