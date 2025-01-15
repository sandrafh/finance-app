import React, {useMemo} from 'react';
import {View} from 'react-native';

import {styles} from './CategoryDetailsStyles';

//Internal components
import {useSelector} from 'react-redux';
import {getCurrentCategory} from '@/src/redux/slices/category';
import {getExpenses} from '@/src/redux/slices/expenses';
import {Category} from '@/src/constants/Category';
import {ExpensesList} from '../expenses/ExpensesList';
import { StatsChart } from '../stats/StatsChart';
import { CustomText } from '@/src/components/CustomText';
import { FontSize } from '@/src/constants/Texts';
import { CategoryBudgetTypeEnum } from '@/src/constants/Settings';
import { getCategoryBudgetType } from '@/src/redux/slices/settings';
import { RootState } from '@/src/redux/store';


export const CategoryDetails = () => {  
  const currentCategory = useSelector((state: any) => getCurrentCategory(state)) as Category
  const expenses = useSelector((state: any) => getExpenses(state))
  const categoryBudgetType: CategoryBudgetTypeEnum = useSelector((state: RootState) => getCategoryBudgetType(state))

  const categoryExpensesList = useMemo(() => {
    return expenses.filter((expense: any) => expense.categoryUid === currentCategory.uid)
  }, [expenses, currentCategory])

  return (
    <View style={styles.container}> 
      <View style={styles.infoContainer}>
        <CustomText style={styles.info} fontSize={FontSize.Small}>
          This category has {currentCategory.budget.toString()}{categoryBudgetType} of the total budget
        </CustomText>
      </View>
      <StatsChart />
      <ExpensesList expensesList={categoryExpensesList} onSelect={() => {}}/>
    </View>
  )
}
