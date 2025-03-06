import React from 'react'
import { useSelector } from 'react-redux'
import { ScrollView, View, TouchableOpacity } from 'react-native'
import { styles } from './CategoriesListStyles'

// Internal components
import { getCategories } from '@redux/slices/category'
import { CategoryItem } from './CategoryItem'
import { Category } from '@constants/Category'
import { colors } from '@constants/ColorsConstants'
import { RootState } from '@redux/store'
import { Accordion } from '@components/Accordion'
import { stylesApp } from 'src/AppStyles'

interface CategoriesListProps {
  onSelect: (category: Category) => void
  showBudget?: boolean
  haveRightArrow?: boolean
  backgroundColor?: string
  showPercentage?: boolean
  filteredCategories?: Category[] | undefined
}

export const CategoriesList = ({
  onSelect,
  showBudget = true,
  haveRightArrow = false,
  backgroundColor = colors.bg,
  filteredCategories = undefined,
  showPercentage,
}: CategoriesListProps) => {
  const categories = useSelector((state: RootState) => getCategories(state))

  const categoriesToRender = filteredCategories || categories

  return (
    <ScrollView contentContainerStyle={styles.container} style={{ backgroundColor }}>
      {categoriesToRender.map((category) => {
        const hasChildren = !!category?.categories?.length
        return (
          <View key={category.uid}>
            <Accordion
              header={
                <TouchableOpacity style={styles.card} onPress={() => onSelect(category)}>
                  <CategoryItem
                    category={category}
                    showBudget={showBudget}
                    haveRightArrow={haveRightArrow}
                    showPercentage={showPercentage}
                  />
                </TouchableOpacity>
              }
              hasArrow={hasChildren}
            >
              {category?.categories?.map((subcategory: Category) => {
                const isLast = category.categories?.indexOf(subcategory) === (category.categories?.length || 0) - 1
                return (
                  <View key={subcategory.uid}>
                    <TouchableOpacity style={styles.subCategoryCard} onPress={() => onSelect(subcategory)}>
                      <CategoryItem
                        category={subcategory}
                        showBudget={showBudget}
                        haveRightArrow={haveRightArrow}
                        showPercentage={showPercentage}
                      />
                    </TouchableOpacity>
                    {!isLast && <View style={stylesApp.separator}></View>}
                  </View>
                )
              })}
            </Accordion>
            <View style={stylesApp.separator}></View>
          </View>
        )
      })}
    </ScrollView>
  )
}
