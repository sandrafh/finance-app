import React from 'react';
import {View} from 'react-native';
import {useNavigation} from "@react-navigation/native";
import {NativeStackNavigationProp} from "@react-navigation/native-stack";

import {styles} from './CategoriesViewStyles';

//Internal components
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


export const CategoriesView = () => {
  const dispatch = useDispatch()
  const navigation = useNavigation<NativeStackNavigationProp<any>>()

  const categories = useSelector((state: any) => getCategories(state))
  const categoryBudgetType: CategoryBudgetTypeEnum = useSelector((state: RootState) => getCategoryBudgetType(state))

  const onAddCategory = () => () => {
    navigation.navigate(NavigationAppScreens.AddCategory)
  }

  const onSelectCategory = (category: any) => {
    if(category.parentCategoryUid) {
      const parentCategory = categories.find((c: any) => c.uid === category.parentCategoryUid)
      dispatch(setSelectedParentCategory(parentCategory as Category))
    }
    navigation.navigate(NavigationAppScreens.AddCategory, { isEdit: true, category })
  }

  const sumCategoriesPercentage = () => {
    return categories.filter((category: Category) => category.parentCategoryUid === undefined)
      .reduce((acc: number, category: Category) => acc + category.budget, 0)
  }

  return (
    <View style={styles.container}>
      {categoryBudgetType === CategoryBudgetTypeEnum.Percentage && (
        <InfoText text={`Your categories add up to ${sumCategoriesPercentage()}%`} />
      )}
      {categories.length === 0 ? (
        <EmptyMessage text="No categories yet" />
      ) : (
        <CategoriesList onSelect={onSelectCategory}/> 
      )}      
      <View style={styles.buttonContainer}>
        <Button title="Add Category" onPress={onAddCategory()} variant={ButtonVariants.Primary} />
      </View>    
    </View>
  )
}
