import { useDispatch, useSelector } from "react-redux"
//External libraries
//@ts-ignore
import db from "@react-native-firebase/database"
//Internal components
import { getUserUid } from "../redux/slices/user"
import { CategoryBudgetTypeEnum, setCategoryBudgetType } from "../redux/slices/settings";

export const SettingsService = () => {
  const dispatch = useDispatch()
  const userUid = useSelector((state: any) => getUserUid(state))

  const subscribeToSettings = () => {
    try {
      db().ref(`users/${userUid}/settings`).on('value', snapshot => {
        const data = snapshot.val()
        if(data) {
        }
      })
    } catch(e) {
      console.log("Error subscribing to categories", e)
    }    
  }

  const updateCategoryBudget = (categoryBudget: CategoryBudgetTypeEnum) => {
    try {
      dispatch(setCategoryBudgetType(categoryBudget))
      db().ref(`users/${userUid}/settings/categoryBudgetType`).set(categoryBudget)
    } catch(e) {
      console.log("Error updating category budget type", e)
    }    
  }

  return {
    subscribeToSettings,
    updateCategoryBudget
  }
}