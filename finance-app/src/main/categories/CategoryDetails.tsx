import React, {useMemo} from 'react';
import {View} from 'react-native';
import {useNavigation} from "@react-navigation/native";
import {NativeStackNavigationProp} from "@react-navigation/native-stack";

import {styles} from './CategoryDetailsStyles';

//Internal components
import {useDispatch, useSelector} from 'react-redux';
import {getCurrentCategory} from '@/src/redux/slices/category';
import {getExpenses} from '@/src/redux/slices/expenses';
import {Category} from '@/src/constants/Category';
import {ExpensesList} from '../expenses/ExpensesList';


export const CategoryDetails = () => {
  const dispatch = useDispatch()
  const navigation = useNavigation<NativeStackNavigationProp<any>>()
  
  const currentCategory = useSelector((state: any) => getCurrentCategory(state)) as Category
  const expenses = useSelector((state: any) => getExpenses(state))

  const categoryExpensesList = useMemo(() => {
    return expenses.filter((expense: any) => expense.categoryUid === currentCategory.uid)
  }, [expenses, currentCategory])

  return (
    <View style={styles.container}> 
      <ExpensesList expensesList={categoryExpensesList} onSelect={() => {}}/>
    </View>
  )
}
