<<<<<<< HEAD
import React, { useEffect, useState } from 'react';
import {View} from 'react-native';
import {useNavigation} from "@react-navigation/native";
import {NativeStackNavigationProp} from "@react-navigation/native-stack";
=======
import React from 'react'
import { View } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
>>>>>>> master

import { styles } from './CategoriesViewStyles'

//Internal components
<<<<<<< HEAD
import {Button, ButtonVariants} from '@/src/components/Button';
import {NavigationAppScreens} from '@/src/navigation/NavigationConstants';
import {CategoriesList} from './CategoriesList';
import {useDispatch, useSelector} from 'react-redux';
import {getCategories} from '@/src/redux/slices/category';
import {setSelectedParentCategory} from '@/src/redux/slices/ui';
import {Category} from '@/src/constants/Category';
import { EmptyMessage } from '@/src/components/EmptyMessage';
import { getCategoryBudgetType } from '@/src/redux/slices/settings';
import { CategoryBudgetTypeEnum } from '@/src/constants/Settings';
import { RootState } from '@/src/redux/store';
import { InfoText } from '@/src/components/InfoText';
import { CustomInput } from '@/src/components/CustomInput';

=======
import { Button, ButtonVariants } from '@/src/components/Button'
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
>>>>>>> master

export const CategoriesView = () => {
  const dispatch = useDispatch()
  const navigation = useNavigation<NativeStackNavigationProp<any>>()

  const categories = useSelector((state: any) => getCategories(state))
  const categoryBudgetType: CategoryBudgetTypeEnum = useSelector((state: RootState) => getCategoryBudgetType(state))

  const [searchText, setSearchText] = useState<string>('')
  const [filteredCategories, setFilteredCategories] = useState<Category[]>(categories)

  useEffect(() => {
    setFilteredCategories(categories)
  }, [categories])

  const onAddCategory = () => () => {
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
          categories: matchingChildren
        }
      }
  
      return null // Exclude this category if it and its children don't match
    }
  
    const filtered = categories
      .map(filterCategory)
      .filter((category): category is Category => category !== null)
  
    setFilteredCategories(filtered)
  }

  return (
    <View style={styles.container}>
      {categoryBudgetType === CategoryBudgetTypeEnum.Percentage && (
        <InfoText text={`Your categories add up to ${sumCategoriesPercentage()}%`} />
      )}
      {categories.length === 0 ? (
        <EmptyMessage text="No categories yet" />
      ) : (
<<<<<<< HEAD
        <View style={styles.listContainer}>
          <CustomInput placeholder="Search categories" value={searchText} onChangeText={filterCategories}/>
          <CategoriesList onSelect={onSelectCategory} filteredCategories={filteredCategories} /> 
        </View>
      )}      
=======
        <CategoriesList
          onSelect={onSelectCategory}
          showPercentage={categoryBudgetType === CategoryBudgetTypeEnum.Percentage}
        />
      )}
>>>>>>> master
      <View style={styles.buttonContainer}>
        <Button title="Add Category" onPress={onAddCategory()} variant={ButtonVariants.Primary} />
      </View>
    </View>
  )
}
