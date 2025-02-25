import { useDispatch, useSelector } from "react-redux"
//External libraries
//@ts-ignore
import { v4 } from 'uuid';
import db from "@react-native-firebase/database"
//Internal components
import { Category } from "../constants/Category"
import { getUserUid } from "../redux/slices/user"
import { setCategories } from "../redux/slices/category"

export const CategoryService = () => {
  const dispatch = useDispatch()
  const userUid = useSelector((state: any) => getUserUid(state))

  const subscribeToCategories = () => {
    try {
      db().ref(`users/${userUid}/categories`).on('value', snapshot => {
        const data = snapshot.val()
        if(data) {
          const categories = Object.entries(data).map(([key, value]: any) => ({ ...value, uid: key }))
          categories.forEach(category => {
            if(!!category?.expenses) {
              category.expenses = Object.entries(category.expenses).map(([key, value]: any) => ({ ...value, uid: key }))
            }
            if(!!category?.categories) {
              category.categories = Object.entries(category.categories).map(([key, value]: any) => ({ ...value, uid: key }))
              category.categories.forEach((category: any) => {
                if(!!category.expenses) {
                  category.expenses = Object.entries(category.expenses).map(([key, value]: any) => ({ ...value, uid: key }))
                }
              })
            }
          })
          dispatch(setCategories(categories))
        }
        else dispatch(setCategories([]))
      })
    } catch(e) {
      console.error("Error subscribing to categories", e)
    }    
  }

  const addCategory = (category: Partial<Category>) => {
    try {
      if(category.parentCategoryUid) {
        db().ref(`users/${userUid}/categories/${category.parentCategoryUid}/categories/${v4()}`).set(category)
        return
      }
      db().ref(`users/${userUid}/categories/${v4()}`).set(category)
    } catch(e) {
      console.error("Error adding category", e)
    }    
  }

  const updateCategory = (category: Partial<Category>) => {
    console.log("updateCategory", category)
    try {
      if(category.parentCategoryUid) {
        db().ref(`users/${userUid}/categories/${category.parentCategoryUid}/categories/${category.uid}`).update(category)
        return
      }
      db().ref(`users/${userUid}/categories/${category.uid}`).update(category)
    } catch(e) {
      console.error("Error updating category", e)
    }    
  }

  const deleteCategory = (category: Category) => {
    try {
      if(category.parentCategoryUid) {
        db().ref(`users/${userUid}/categories/${category.parentCategoryUid}/categories/${category.uid}`).remove()
        return
      }
      db().ref(`users/${userUid}/categories/${category.uid}`).remove()
    } catch(e) {
      console.error("Error deleting category", e)
    }
  }

  return {
    subscribeToCategories,
    addCategory,
    updateCategory,
    deleteCategory
  }
}