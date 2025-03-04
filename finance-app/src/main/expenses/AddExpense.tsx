import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ScrollView, View } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'

import { styles } from './AddExpenseStyles'

//External libraries
import DateTimePicker from 'react-native-ui-datepicker'
//@ts-ignore
import Toast from 'react-native-toast-message'
//Internal components
import { CustomButton, ButtonVariants } from '@/src/components/CustomButton'
import { ToastTypes } from '@/src/constants/ToastConstants'
import { NavigationMainScreens } from '@/src/navigation/NavigationConstants'
import { ExpensesService } from '@/src/services/ExpensesService'
import { useCategoriesListModal } from '@/src/contexts/CategoriesListModalContext'
import { colors } from '@/src/constants/ColorsConstants'
import { getCategories } from '@/src/redux/slices/category'
import { CategoryItem } from '../categories/CategoryItem'
import { getSelectedCategory, setSelectedCategory } from '@/src/redux/slices/ui'
import { getFontFamily } from '@/src/utils/fontFamily'
import { CustomInput } from '@/src/components/CustomInput'
import { CustomDropDown } from '@/src/components/CustomDropDown'
import { Category } from '@/src/constants/Category'
import { Expense } from '@/src/constants/Expenses'
import { FontWeight } from '@/src/constants/Texts'
import { ToggleInput } from '@/src/components/ToggleInput'

export const AddExpense = ({ route }: any) => {
  const dispatch = useDispatch()
  const navigation = useNavigation<NativeStackNavigationProp<any>>()

  const isEdit = route.params?.isEdit
  const expense: Expense = route.params?.expense

  const { addExpense, updateExpense } = ExpensesService()
  const { openCategoriesListModal, closeCategoriesListModal } = useCategoriesListModal()

  const categories = useSelector((state: any) => getCategories(state))
  const selectedCategory = useSelector((state: any) => getSelectedCategory(state))

  const [name, setName] = useState(expense?.name || '')
  const [spent, setSpent] = useState(expense?.spent.toString() || '0')
  const [date, setDate] = useState(expense?.date || new Date(Date.now()).toISOString())
  const [notes, setNotes] = useState(expense?.notes || '')

  useEffect(() => {
    if (!isEdit) dispatch(setSelectedCategory(categories[0]))
  }, [])

  const handleSave = () => {
    if (!name || !spent || !selectedCategory?.uid) {
      Toast.show({
        type: ToastTypes.Error,
        text1: 'Fill all the required fields',
      })
      return
    }
    const newExpense = {
      uid: isEdit ? expense.uid : undefined,
      name,
      spent: +spent,
      categoryUid: selectedCategory.uid,
      date,
      notes,
    }
    let toastText = 'Expense added successfully'
    if (isEdit) {
      toastText = 'Expense updated successfully'
      updateExpense(newExpense as Expense)
    } else addExpense(newExpense)

    Toast.show({
      type: ToastTypes.Success,
      text1: toastText,
    })
    navigation.navigate(NavigationMainScreens.Expenses)
  }

  const onClickSelectCategory = () => {
    openCategoriesListModal(onSelectCategory)
  }

  const onSelectCategory = (category: Category) => {
    dispatch(setSelectedCategory(category))
    closeCategoriesListModal()
  }

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.formContainer}>
          <CustomInput label="Name" placeholder="Enter name" value={name} onChangeText={setName} />

          <ToggleInput
            label="Import (€)"
            placeholder="Enter budget"
            value={spent}
            onChangeText={setSpent}
            keyboardType="numeric"
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
            keyboardType={'text'}
          />

          <DateTimePicker
            mode="single"
            date={date}
            onChange={(params) => setDate((params.date as Date).toISOString())}
            locale="es-ES"
            firstDayOfWeek={1}
            calendarTextStyle={{ fontFamily: getFontFamily(FontWeight.Normal), color: colors.white }}
            headerTextStyle={{ fontFamily: getFontFamily(FontWeight.Normal), color: colors.white }}
            headerButtonColor={colors.white}
            selectedItemColor={colors.primary}
            monthContainerStyle={{ backgroundColor: colors.bgCard, borderColor: 'transparent' }}
            yearContainerStyle={{ backgroundColor: colors.bgCard, borderColor: 'transparent' }}
            weekDaysTextStyle={{ fontFamily: getFontFamily(FontWeight.Normal), color: colors.white }}
          />
        </View>
      </ScrollView>

      <View style={styles.buttons}>
        <CustomButton title="Save" onPress={handleSave} variant={ButtonVariants.Primary} />
      </View>
    </View>
  )
}
