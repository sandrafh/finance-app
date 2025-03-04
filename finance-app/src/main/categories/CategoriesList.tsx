import React from 'react'
import { useSelector } from 'react-redux'
import { ScrollView, View, TouchableOpacity } from 'react-native'
import { styles } from './CategoriesListStyles'
import { stylesApp } from '@/src/AppStyles'

// Internal components
import { getCategories } from '@/src/redux/slices/category'
import { CategoryItem } from './CategoryItem'
import { Category } from '@/src/constants/Category'
import { colors } from '@/src/constants/ColorsConstants'
import { RootState } from '@/src/redux/store'
import { Accordion } from '@/src/components/Accordion'

interface CategoriesListProps {
  onSelect: (category: Category) => void
  showBudget?: boolean
  haveRightArrow?: boolean
  backgroundColor?: string
<<<<<<< HEAD
  filteredCategories?: Category[] | undefined
}

export const CategoriesList = ({ 
  onSelect, 
  showBudget = true, 
  haveRightArrow = false, 
  backgroundColor = colors.bg ,
  filteredCategories = undefined
=======
  showPercentage?: boolean
}

export const CategoriesList = ({
  onSelect,
  showBudget = true,
  haveRightArrow = false,
  backgroundColor = colors.bg,
  showPercentage = false,
>>>>>>> master
}: CategoriesListProps) => {
  const categories = useSelector((state: RootState) => getCategories(state))

  const categoriesToRender = filteredCategories || categories

  return (
    <ScrollView contentContainerStyle={styles.container} style={{ backgroundColor }}>
<<<<<<< HEAD
      {categoriesToRender.map(category => {
=======
      {categories.map((category) => {
>>>>>>> master
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
