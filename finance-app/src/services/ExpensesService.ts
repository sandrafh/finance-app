import { useDispatch, useSelector } from "react-redux"
//External libraries
//@ts-ignore
import { v4 } from 'uuid';
import db from "@react-native-firebase/database"
//Internal components
import { getUserUid } from "../redux/slices/user"
import { Expense } from "../constants/Expenses";
import { setExpenses } from "../redux/slices/expenses";

export const ExpensesService = () => {
  const dispatch = useDispatch()
  const userUid = useSelector((state: any) => getUserUid(state))

  const subscribeToExpenses = () => {
    db().ref(`users/${userUid}/expenses`).on('value', snapshot => {
      const data = snapshot.val()
      if(data) {
        const expense = Object.entries(data).map(([key, value]: any) => ({ ...value, uid: key }))
        dispatch(setExpenses(expense))
      }
    })
  }

  const addExpense = (expense: Partial<Expense>) => {
    db().ref(`users/${userUid}/expenses/${v4()}`).set(expense)
  }

  return {
    subscribeToExpenses,
    addExpense
  }
}