import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ScrollView, View } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'

import { styles } from './AddExpenseStyles'

//External libraries
//@ts-ignore
import Toast from 'react-native-toast-message'
//Internal components
import { CustomButton, ButtonVariants } from '@components/CustomButton'
import { ToastTypes } from '@constants/ToastConstants'
import { NavigationMainScreens } from '@navigation/NavigationConstants'
import { ExpensesService } from '@services/ExpensesService'
import { useCategoriesListModal } from '@contexts/CategoriesListModalContext'
import { getCategories } from '@redux/slices/category'
import { CategoryItem } from '../categories/CategoryItem'
import { getSelectedCategory, setSelectedCategory } from '@redux/slices/ui'
import { CustomInput } from '@components/CustomInput'
import { CustomDropDown } from '@components/CustomDropDown'
import { Category } from '@constants/Category'
import { Expense } from '@constants/Expenses'
import { ToggleInput } from '@components/ToggleInput'
import { Calendar } from '@components/Calendar'

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

          <Calendar date={date} setDate={setDate} />
        </View>
      </ScrollView>

      <View style={styles.buttons}>
        <CustomButton title="Save" onPress={handleSave} variant={ButtonVariants.Primary} />
      </View>
    </View>
  )
}
