import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { View, TextInput, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { styles } from './AddExpenseStyles';

import DownArrowIcon from '../../assets/icons/down-arrow.svg'

//External libraries
import { SwipeModalPublicMethods } from '@birdwingo/react-native-swipe-modal';
//@ts-ignore
//@ts-ignore
import Toast from 'react-native-toast-message';
//Internal components
import { Button, ButtonVariants } from '@/src/components/Button';
import { ToastTypes } from '@/src/constants/ToastConstants';
import { NavigationExpensesScreens } from '@/src/navigation/NavigationConstants';
import { CustomText } from '@/src/components/CustomText';
import { ExpensesService } from '@/src/services/ExpensesService';
import { CategoriesListModal } from '@/src/modals/CategoriesListModal';
import { colors } from '@/src/constants/ColorsConstants';
import { getCategories } from '@/src/redux/slices/category';
import { CategoryItem } from '../categories/CategoryItem';
import { getSelectedCategory, setSelectedCategory } from '@/src/redux/slices/ui';


export const AddExpense = () => {
  const dispatch = useDispatch()
  const navigation = useNavigation<NativeStackNavigationProp<any>>()
  const categoriesModalRef = useRef<SwipeModalPublicMethods>(null)

  const { addExpense } = ExpensesService()

  const categories = useSelector((state: any) => getCategories(state))
  const selectedCategory = useSelector((state: any) => getSelectedCategory(state))
  
  const [name, setName] = useState('')
  const [spent, setSpent] = useState('0')

  useEffect(() => {
    dispatch(setSelectedCategory(categories[0]))
  }, [])

  const handleSave = () => {
    if(!name || !spent || !selectedCategory?.uid) {
      Toast.show({
        type: ToastTypes.Error,
        text1: 'Fill all the required fields'
      })
      return
    }
    const expense = {
      name,
      spent: +spent,
      categoryUid: selectedCategory.uid,
      data: new Date()
    }
    addExpense(expense)

    Toast.show({
      type: ToastTypes.Success,
      text1: 'Expense added successfully'
    })
    navigation.navigate(NavigationExpensesScreens.ExpensesView)
  }

  const onClickSelectCategory = () => {
    categoriesModalRef.current?.show()
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.formContainer}>
        <View style={styles.field}>
          <CustomText>Name</CustomText>
          <TextInput
            style={styles.input}
            placeholder="Enter name"
            value={name}
            onChangeText={setName}
          />  
        </View>   

        <View style={styles.field}>
          <CustomText>Import (€)</CustomText>
          {/* TODO: change for numeric input */}
          <TextInput
            style={styles.input}
            placeholder="Enter budget"
            value={spent}
            onChangeText={setSpent}
            keyboardType="numeric"
          />
        </View>    
        <View style={styles.field}>
          <CustomText>Category</CustomText>
          <TouchableOpacity style={styles.dropDown} onPress={onClickSelectCategory}>
            {selectedCategory && <CategoryItem category={selectedCategory} showBudget={false} />}
            <DownArrowIcon width={24} color={colors.grey4} />
          </TouchableOpacity>
        </View>    

        <Button style={styles.button} title="Save" onPress={handleSave} variant={ButtonVariants.Primary} />
      </View>  
      <CategoriesListModal modalRef={categoriesModalRef} />   
    </ScrollView>
  )
}



