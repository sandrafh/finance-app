import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { View, TextInput, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { styles } from './AddExpenseStyles';

import DownArrowIcon from '../../assets/icons/down-arrow.svg'

//External libraries
import { SwipeModalPublicMethods } from '@birdwingo/react-native-swipe-modal';
import DateTimePicker from 'react-native-ui-datepicker';
import dayjs from 'dayjs';
//@ts-ignore
import Toast from 'react-native-toast-message';
//Internal components
import { Button, ButtonVariants } from '@/src/components/Button';
import { ToastTypes } from '@/src/constants/ToastConstants';
import { NavigationExpensesScreens } from '@/src/navigation/NavigationConstants';
import { CustomText, FontWeight } from '@/src/components/CustomText';
import { ExpensesService } from '@/src/services/ExpensesService';
import { CategoriesListModal } from '@/src/modals/CategoriesListModal';
import { colors } from '@/src/constants/ColorsConstants';
import { getCategories } from '@/src/redux/slices/category';
import { CategoryItem } from '../categories/CategoryItem';
import { getSelectedCategory, setSelectedCategory } from '@/src/redux/slices/ui';
import { getFontFamily } from '@/src/utils/fontFamily';


export const AddExpense = () => {
  const dispatch = useDispatch()
  const navigation = useNavigation<NativeStackNavigationProp<any>>()
  const categoriesModalRef = useRef<SwipeModalPublicMethods>(null)

  const { addExpense } = ExpensesService()

  const categories = useSelector((state: any) => getCategories(state))
  const selectedCategory = useSelector((state: any) => getSelectedCategory(state))
  
  const [name, setName] = useState('')
  const [spent, setSpent] = useState('0')
  const [date, setDate] = useState(new Date(Date.now()).toISOString())

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
      date
    }
    console.log("expense: ",expense)
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

        <View style={styles.field}>
          <CustomText>Date</CustomText>
          <DateTimePicker
            mode="single"
            date={date}
            onChange={(params) => setDate((params.date as Date).toISOString())}
            locale="es"
            firstDayOfWeek={1}
            calendarTextStyle={{fontFamily: getFontFamily(FontWeight.Normal)}}
            headerTextStyle={{fontFamily: getFontFamily(FontWeight.Normal)}}
            selectedItemColor={colors.primary}
          />
        </View>       

        <Button style={styles.button} title="Save" onPress={handleSave} variant={ButtonVariants.Primary} />
      </View>  
      <CategoriesListModal modalRef={categoriesModalRef} />   
    </ScrollView>
  )
}



