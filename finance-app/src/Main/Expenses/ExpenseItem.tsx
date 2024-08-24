
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


interface ExpenseItemProps {
  expense: Expense
  showCategory?: boolean
}

export const ExpenseItem = ({ expense, showCategory }: ExpenseItemProps) => {
  const expenseSpent = expense.spent.toString() + " €"

  const categories = useSelector((state: any) => getCategories(state))

  const getCategory = () => {
    if (!showCategory) return null
    const cateogory = categories.find(category => category.uid === expense.categoryUid)
    return (
      <Icon key={cateogory?.icon} name={cateogory?.icon} size={24} color={cateogory?.color}/>
    )
  }

  return (
    <>
      <View style={styles.cardTitle}>
        {/* <Icon key={expense.icon} name={expense.icon} size={24} color={expense.color}/> */}
        <CustomText fontSize={FontSize.Medium} fontWeight={FontWeight.Bold}>
          {expenseSpent}
        </CustomText>
        <CustomText fontSize={FontSize.Medium} fontWeight={FontWeight.Normal}>
          {expense.name}
        </CustomText>
      </View>
      
      {getCategory()}
    </>        
  )
}