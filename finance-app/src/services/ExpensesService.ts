import { useDispatch, useSelector } from "react-redux"
//External libraries
//@ts-ignore
import { v4 } from 'uuid';
import db, { get } from "@react-native-firebase/database"
//Internal components
import { getUserUid } from "../redux/slices/user"
import { Expense } from "../constants/Expenses";
import { getExpenses, setExpenses } from "../redux/slices/expenses";
import { getCategories } from "../redux/slices/category";
import { Category } from "../constants/Category";
import { findCategory } from "../utils/functions";

export const ExpensesService = () => {
  const dispatch = useDispatch()
  const userUid = useSelector((state: any) => getUserUid(state))
  const categories = useSelector((state: any) => getCategories(state))
  const expenses = useSelector((state: any) => getExpenses(state))

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
      const expenseUid = expense?.uid ?? v4()
      db().ref(`users/${userUid}/expenses/${expenseUid}`).set(expense)   

      const categoryUid = expense.categoryUid
      
      const category = categories.find((category: Category) => category.uid === categoryUid) as Category
      if(!!category) {
        db().ref(`users/${userUid}/categories/${categoryUid}/expenses/${expenseUid}`).set({spent: expense.spent, date: expense.date})
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
        db().ref(`users/${userUid}/categories/${parentCategory.uid}/expenses/${expenseUid}`).set({spent: expense.spent, date: expense.date})
        const newTotalSpentParentCategory = +(parentCategory.totalSpent) + (expense.spent as number) 
        db().ref(`users/${userUid}/categories/${parentCategory.uid}`).update({ totalSpent: newTotalSpentParentCategory })

        //Add expense to category itself
        db().ref(`users/${userUid}/categories/${parentCategory.uid}/categories/${subCategory.uid}/expenses/${expenseUid}`).set({spent: expense.spent, date: expense.date})
        const newTotalSpentCategory = +(subCategory.totalSpent) + (expense.spent as number) 
        db().ref(`users/${userUid}/categories/${parentCategory.uid}/categories/${subCategory.uid}`).update({ totalSpent: newTotalSpentCategory })
      }
    } catch(e) {
      console.log("Error adding expense", e)
    }
  }

  const updateExpense = async (expense: Expense) => {
    try {
      await deleteExpense(expense.uid)

      const expenseUid = expense?.uid
      db().ref(`users/${userUid}/expenses/${expenseUid}`).set(expense)  

      const oldExpense = expenses.find((exp: Expense) => exp.uid === expense.uid) as Expense
      const diffSpent = expense.spent - oldExpense.spent
      const oldCategoryUid = oldExpense.categoryUid
      const isSameCategory = oldCategoryUid === expense.categoryUid
      let newSpent = isSameCategory ? diffSpent : expense.spent

      const categoryUid = expense.categoryUid
      const category = categories.find((category: Category) => category.uid === categoryUid) as Category
      if(!!category) {
        const oldCategory = findCategory(categories, oldExpense.categoryUid)
        const newCategoryIsOldParent = oldCategory?.parentCategoryUid === category.uid
        newSpent = newCategoryIsOldParent ? diffSpent : newSpent

        db().ref(`users/${userUid}/categories/${categoryUid}/expenses/${expenseUid}`).set({spent: expense.spent, date: expense.date})
        const newTotalSpent = +(category?.totalSpent as number) + (newSpent as number) 
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

        const oldCategory = findCategory(categories, oldExpense.categoryUid)
        const newCategoryIsOldChild = oldCategory?.categories?.some((c: any) => c.uid === categoryUid)
        const newChildSpent = newSpent
        const newParentSpent = newCategoryIsOldChild ? diffSpent : newSpent
        
        //Add expense to parent category
        db().ref(`users/${userUid}/categories/${parentCategory.uid}/expenses/${expenseUid}`).set({spent: expense.spent, date: expense.date})
        const newTotalSpentParentCategory = +(parentCategory.totalSpent) + (newParentSpent as number) 
        db().ref(`users/${userUid}/categories/${parentCategory.uid}`).update({ totalSpent: newTotalSpentParentCategory })

        //Add expense to category itself
        db().ref(`users/${userUid}/categories/${parentCategory.uid}/categories/${subCategory.uid}/expenses/${expenseUid}`).set({spent: expense.spent, date: expense.date})
        const newTotalSpentCategory = +(subCategory.totalSpent) + (newChildSpent as number) 
        db().ref(`users/${userUid}/categories/${parentCategory.uid}/categories/${subCategory.uid}`).update({ totalSpent: newTotalSpentCategory })
      }
    } catch(e) {
      console.log("Error updating expense", e)
    }
  }

  const deleteExpense = (expenseUid: string) => {
    try {
      const expense = expenses.find((exp: Expense) => exp.uid === expenseUid) as Expense
      db().ref(`users/${userUid}/expenses/${expenseUid}`).remove()

      const categoryUid = expense?.categoryUid
      const category = findCategory(categories, categoryUid)
      if(!category?.uid) return
      if(!category.parentCategoryUid) {
        db().ref(`users/${userUid}/categories/${categoryUid}/expenses/${expenseUid}`).remove()
        const newTotalSpent = +(category?.totalSpent as number) - (expense.spent as number) 
        db().ref(`users/${userUid}/categories/${categoryUid}`).update({ totalSpent: newTotalSpent })
      }
      else {
        const parentCategory = findCategory(categories, category.parentCategoryUid)        
        //Remove expense from parent category
        db().ref(`users/${userUid}/categories/${parentCategory.uid}/expenses/${expenseUid}`).remove()
        //Remove expense from category itself
        db().ref(`users/${userUid}/categories/${parentCategory.uid}/categories/${category.uid}/expenses/${expenseUid}`).remove()
        //Update total spent for parent category
        const newTotalSpentParentCategory = +(parentCategory.totalSpent) - (expense.spent as number) 
        db().ref(`users/${userUid}/categories/${parentCategory.uid}`).update({ totalSpent: newTotalSpentParentCategory })
        //Update total spent for category itself
        const newTotalSpentCategory = +(category.totalSpent) - (expense.spent as number) 
        db().ref(`users/${userUid}/categories/${parentCategory.uid}/categories/${category.uid}`).update({ totalSpent: newTotalSpentCategory })
      }
    } catch(e) {
      console.log("Error deleting expense", e)
    }
  }

  return {
    subscribeToExpenses,
    addExpense,
    updateExpense,
    deleteExpense
  }
}