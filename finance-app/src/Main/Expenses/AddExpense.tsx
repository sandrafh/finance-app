import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { View, ScrollView } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { styles } from './AddExpenseStyles';

//External libraries
import { SwipeModalPublicMethods } from '@birdwingo/react-native-swipe-modal';
import DateTimePicker from 'react-native-ui-datepicker';
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
import { CustomInput } from '@/src/components/CustomInput';
import { CustomDropDown } from '@/src/components/CustomDropDown';
import { Category } from '@/src/constants/Category';


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
  const [notes, setNotes] = useState('')

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
      date,
      notes
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

  const onSelectCategory = (category: Category) => {
    dispatch(setSelectedCategory(category))
  }

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.formContainer}>
          <CustomInput
            label="Name"
            placeholder="Enter name"
            value={name}
            onChangeText={setName}
          />  
          <CustomInput
            label="Import (€)"
            placeholder="Enter budget"
            value={spent}
            onChangeText={setSpent}
            inputMode="numeric"
          />   
          <CustomDropDown label="Category" onClick={onClickSelectCategory}>
            {selectedCategory && <CategoryItem category={selectedCategory} showBudget={false} />}
          </CustomDropDown>

          <CustomInput
            label="Notes"
            placeholder="Enter notes"
            multiline={true}
            numberOfLines={4}
            value={notes}
            onChangeText={setNotes}
            inputMode={'text'}
          />

          <View style={styles.field}>
            <CustomText style={styles.label}>Date</CustomText>
            <DateTimePicker
              mode="single"
              date={date}
              onChange={(params) => setDate((params.date as Date).toISOString())}
              locale="es-ES"
              firstDayOfWeek={1}
              calendarTextStyle={{fontFamily: getFontFamily(FontWeight.Normal), color: colors.white}}
              headerTextStyle={{fontFamily: getFontFamily(FontWeight.Normal), color: colors.white}}
              headerButtonColor={colors.white}
              selectedItemColor={colors.primary}
              monthContainerStyle={{backgroundColor: colors.bgCard, borderColor: 'transparent'}}
              yearContainerStyle={{backgroundColor: colors.bgCard, borderColor: 'transparent'}}
              weekDaysTextStyle={{fontFamily: getFontFamily(FontWeight.Normal), color: colors.white}}
            />
          </View>  
        </View>           
      </ScrollView>

      <View style={styles.button}>
        <Button title="Save" onPress={handleSave} variant={ButtonVariants.Primary} />
      </View>

      <CategoriesListModal modalRef={categoriesModalRef} onSelectCategory={(category) => onSelectCategory(category)}/> 
    </View>
  )
}



