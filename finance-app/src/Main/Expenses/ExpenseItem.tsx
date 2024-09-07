
import React from "react";
import { View } from "react-native";
import { useSelector } from "react-redux";

import { styles } from "./ExpenseItemStyles";

//External libraries
//@ts-ignore
import Icon from 'react-native-vector-icons/MaterialIcons';
//Internal components
import { CustomText, FontSize, FontWeight } from "@/src/components/CustomText";
import { Expense } from "@/src/constants/Expenses";
import { getCategories } from "@/src/redux/slices/category";
import { findCategory } from "@/src/utils/functions";


interface ExpenseItemProps {
  expense: Expense
  showCategory?: boolean
}

export const ExpenseItem = ({ expense, showCategory }: ExpenseItemProps) => {
  const expenseSpent = expense.spent.toString() + " €"

  const categories = useSelector((state: any) => getCategories(state))

  const getCategory = () => {
    if (!showCategory) return null
    const cateogory = findCategory(categories, expense.categoryUid)
    return (
      <Icon key={cateogory?.icon} name={cateogory?.icon} size={24} color={cateogory?.color}/>
    )
  }

  return (
    <>      
      <View style={styles.cardTitle}>
        {getCategory()}
        <CustomText fontSize={FontSize.Medium} fontWeight={FontWeight.Normal}>
          {expense.name}
        </CustomText>
      </View>
      <CustomText fontSize={FontSize.Medium} fontWeight={FontWeight.Normal}>
        {expenseSpent}
      </CustomText>    
    </>        
  )
}