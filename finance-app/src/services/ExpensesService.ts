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
import { Category } from "../constants/Category";

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
      const category = categories.find((category: Category) => category.uid === categoryUid) as Category
      if(!!category) {
        db().ref(`users/${userUid}/categories/${categoryUid}/expenses/${expenseUid}`).set({spent: expense.spent})
        const newTotalSpent = +(category?.totalSpent as number) + (expense.spent as number) 
        db().ref(`users/${userUid}/categories/${categoryUid}`).update({ totalSpent: newTotalSpent })
      }
      else {
        let subCategory: Category = {} as Category
        categories.forEach((category: any) => {
          if(!!category.categories) {
            const subCat = category.categories.find((subCategory: any) => subCategory.uid === categoryUid)
            if(!!subCat) {
              subCategory = subCat
              return
            }
          }
        })
        const parentCategory = categories.find((category: any) => category.uid === subCategory.parentCategoryUid) as Category
        
        //Add expense to parent category
        db().ref(`users/${userUid}/categories/${parentCategory.uid}/expenses/${expenseUid}`).set({spent: expense.spent})
        //Add expense to category itself
        db().ref(`users/${userUid}/categories/${parentCategory.uid}/categories/${subCategory.uid}/expenses/${expenseUid}`).set({spent: expense.spent})
        //Update total spent for parent category
        const newTotalSpentParentCategory = +(parentCategory.totalSpent) + (expense.spent as number) 
        db().ref(`users/${userUid}/categories/${parentCategory.uid}`).update({ totalSpent: newTotalSpentParentCategory })
        //Update total spent for category itself
        const newTotalSpentCategory = +(subCategory.totalSpent) + (expense.spent as number) 
        db().ref(`users/${userUid}/categories/${parentCategory.uid}/categories/${subCategory.uid}`).update({ totalSpent: newTotalSpentCategory })
      }
    } catch(e) {
      console.log("Error adding expense", e)
    }
  }

  return {
    subscribeToExpenses,
    addExpense
  }
}