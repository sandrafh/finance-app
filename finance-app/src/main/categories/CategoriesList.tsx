import React from 'react'
import { useSelector } from 'react-redux'
import { ScrollView, View, TouchableOpacity } from 'react-native'
import { useRoute } from '@react-navigation/native'
import { styles } from './CategoriesListStyles'
import { stylesApp } from '@/src/AppStyles'

// Internal components
import { getCategories } from '@/src/redux/slices/category'
import { CategoryItem } from './CategoryItem'
import { Category } from '@/src/constants/Category'
import { colors } from '@/src/constants/ColorsConstants'
import { CategoryBudgetTypeEnum } from '@/src/constants/Settings'
import { getCategoryBudgetType } from '@/src/redux/slices/settings'
import { RootState } from '@/src/redux/store'
import { Accordion } from '@/src/components/Accordion'

interface CategoriesListProps {
  onSelect: (category: Category) => void
  showBudget?: boolean
  haveRightArrow?: boolean
  backgroundColor?: string
}

export const CategoriesList = ({ 
  onSelect, 
  showBudget = true, 
  haveRightArrow = false, 
  backgroundColor = colors.bg 
}: CategoriesListProps) => {
  const route = useRoute()
  const categories = useSelector((state: RootState) => getCategories(state))
  const categoryBudgetType: CategoryBudgetTypeEnum = useSelector((state: RootState) => getCategoryBudgetType(state))
  const showPercentage = categoryBudgetType === CategoryBudgetTypeEnum.Percentage && route.name === 'Categories'

  return (
    <ScrollView contentContainerStyle={styles.container} style={{ backgroundColor }}>
      {categories.map(category => {
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
