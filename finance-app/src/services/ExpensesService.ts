import { useDispatch, useSelector } from "react-redux"
//External libraries
//@ts-ignore
import { v4 } from 'uuid';
import db from "@react-native-firebase/database"
//Internal components
import { getUserUid } from "../redux/slices/user"
import { Expense } from "../constants/Expenses";
import { setExpenses } from "../redux/slices/expenses";
import { getCategories } from "../redux/slices/category";

export const ExpensesService = () => {
  const dispatch = useDispatch()
  const userUid = useSelector((state: any) => getUserUid(state))
  const categories = useSelector((state: any) => getCategories(state))

  const subscribeToExpenses = () => {
    try {
      db().ref(`users/${userUid}/expenses`).on('value', snapshot => {
        const data = snapshot.val()
        if(data) {
          const expense = Object.entries(data).map(([key, value]: any) => ({ ...value, uid: key }))
          dispatch(setExpenses(expense))
        }
      })
    } catch(e) {
      console.log("Error subscribing to expenses", e)
    }    
  }

  const addExpense = (expense: Partial<Expense>) => {
    try {
      const expenseUid = v4()
      db().ref(`users/${userUid}/expenses/${expenseUid}`).set(expense)   

      const categoryUid = expense.categoryUid
      db().ref(`users/${userUid}/categories/${categoryUid}/expenses/${expenseUid}`).set({spent: expense.spent})
      
      const category = categories.find((category: any) => category.uid === categoryUid)
      const newTotalSpent = +(category?.totalSpent as number) + (expense.spent as number) 
      db().ref(`users/${userUid}/categories/${categoryUid}`).update({ totalSpent: newTotalSpent })
    } catch(e) {
      console.log("Error adding expense", e)
    }
  }

  return {
    subscribeToExpenses,
    addExpense
  }
}