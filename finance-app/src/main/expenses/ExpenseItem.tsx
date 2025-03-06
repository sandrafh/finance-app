import React from 'react'
import { TouchableOpacity, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'

import { styles } from './ExpenseItemStyles'

import RightArrowIcon from '@assets/icons/right-arrow.svg'

//External libraries
//@ts-ignore
import Icon from 'react-native-vector-icons/MaterialIcons'
//Internal components
import { CustomText } from '@components/CustomText'
import { Expense } from '@constants/Expenses'
import { getCategories } from '@redux/slices/category'
import { findCategory } from '@utils/functions'
import { colors } from '@constants/ColorsConstants'
import { NavigationAppScreens } from '@navigation/NavigationConstants'
import { setSelectedCategory } from '@redux/slices/ui'
import { FontSize, FontWeight } from '@constants/Texts'

interface ExpenseItemProps {
  expense: Expense
  showCategory?: boolean
}

export const ExpenseItem = ({ expense, showCategory }: ExpenseItemProps) => {
  const dispatch = useDispatch()
  const navigation = useNavigation<NativeStackNavigationProp<any>>()

  const expenseSpent = expense.spent.toString() + ' €'

  const categories = useSelector((state: any) => getCategories(state))

  const getCategory = () => {
    if (!showCategory) return null
    const cateogory = findCategory(categories, expense.categoryUid)
    return <Icon key={cateogory?.icon} name={cateogory?.icon} size={24} color={cateogory?.color} />
  }

  const onPressExpense = () => {
    const category = findCategory(categories, expense.categoryUid)
    dispatch(setSelectedCategory(category))
    navigation.navigate(NavigationAppScreens.AddExpense, { isEdit: true, expense })
  }

  return (
    <TouchableOpacity style={styles.container} onPress={onPressExpense}>
      <View style={styles.cardTitle}>
        {getCategory()}
        <CustomText fontSize={FontSize.Medium} fontWeight={FontWeight.Normal}>
          {expense.name}
        </CustomText>
      </View>
      <View style={styles.end}>
        <CustomText fontSize={FontSize.Medium} fontWeight={FontWeight.Normal}>
          {expenseSpent}
        </CustomText>
        <RightArrowIcon width={16} height={16} fill={colors.white} />
      </View>
    </TouchableOpacity>
  )
}
