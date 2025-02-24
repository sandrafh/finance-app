import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { ScrollView, TouchableOpacity, View } from 'react-native'
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
import RightArrowIcon from '@/src/assets/icons/right-arrow.svg'

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

  const [expandedCategories, setExpandedCategories] = useState<{ [key: string]: boolean }>({})

  const toggleCategory = (categoryId: string) => {
    setExpandedCategories(prev => ({
      ...prev,
      [categoryId]: !prev[categoryId]
    }))
  }

  return (
    <ScrollView contentContainerStyle={styles.container} style={{ backgroundColor }}>
      {categories.map(category => {
        const isExpanded = expandedCategories[category.uid] || false
        const hasChildren = !!category?.categories?.length

        return (
          <View key={category.uid}>
            <TouchableOpacity style={styles.card} onPress={() => onSelect(category)}>         
              <TouchableOpacity onPress={() => hasChildren && toggleCategory(category.uid)} style={styles.accordionArrow}>
                {!!hasChildren && (
                  <RightArrowIcon 
                    width={16} 
                    height={16} 
                    color={colors.grey1} 
                    style={{ transform: [{ rotate: isExpanded ? '90deg' : '0deg' }] }} 
                  />
                )}
              </TouchableOpacity>             
              <CategoryItem 
                category={category} 
                showBudget={showBudget} 
                haveRightArrow={haveRightArrow} 
                showPercentage={showPercentage} 
              />             
            </TouchableOpacity>
            <View style={stylesApp.separator}></View>

            {isExpanded && category?.categories?.map((subcategory: Category) => (
              <View key={subcategory.uid} style={styles.subCategoryContainer}>
                <TouchableOpacity style={styles.subCategoryCard} onPress={() => onSelect(subcategory)}>
                  <CategoryItem 
                    category={subcategory} 
                    showBudget={showBudget} 
                    haveRightArrow={haveRightArrow} 
                    showPercentage={showPercentage} 
                  />
                </TouchableOpacity>
                <View style={stylesApp.separator}></View>
              </View>                
            ))}
          </View>          
        )        
      })}       
    </ScrollView>
  )
}
