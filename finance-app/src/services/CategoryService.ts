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
    db().ref(`users/${userUid}/categories`).on('value', snapshot => {
      const data = snapshot.val()
      if(data) {
        const categories = Object.entries(data).map(([key, value]: any) => ({ ...value, uid: key }))
        dispatch(setCategories(categories))
      }
    })
  }

  const addCategory = (category: Partial<Category>) => {
    db().ref(`users/${userUid}/categories/${v4()}`).set(category)
  }

  return {
    subscribeToCategories,
    addCategory
  }
}