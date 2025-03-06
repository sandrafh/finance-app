import { useDispatch, useSelector } from 'react-redux'
//External libraries
//@ts-ignore
import db from '@react-native-firebase/database'
//Internal components
import { getUserUid } from '@redux/slices/user'
import {
  CategoryBudgetTypeEnum,
  setCategoryBudgetType,
  setTotalIncome,
  setVisualization,
  VisualizationTypeEnum,
} from '@redux/slices/settings'

export const SettingsService = () => {
  const dispatch = useDispatch()
  const userUid = useSelector((state: any) => getUserUid(state))

  const subscribeToSettings = () => {
    try {
      db()
        .ref(`users/${userUid}/settings`)
        .on('value', (snapshot) => {
          const data = snapshot.val()
          if (data) {
            if (data.categoryBudgetType) {
              dispatch(setCategoryBudgetType(data.categoryBudgetType))
            }
            if (data.visualization) {
              dispatch(setVisualization(data.visualization))
            }
            if (data.totalIncome) {
              dispatch(setTotalIncome(data.totalIncome))
            }
          }
        })
    } catch (e) {
      console.error('Error subscribing to categories', e)
    }
  }

  const updateCategoryBudgetType = (categoryBudget: CategoryBudgetTypeEnum) => {
    try {
      dispatch(setCategoryBudgetType(categoryBudget))
      db().ref(`users/${userUid}/settings/categoryBudgetType`).set(categoryBudget)

      if (categoryBudget === CategoryBudgetTypeEnum.Amount) {
        dispatch(setTotalIncome('0'))
        db().ref(`users/${userUid}/settings/totalIncome`).set('0')
      }
    } catch (e) {
      console.error('Error updating category budget type', e)
    }
  }

  const updateVisualization = (visualization: VisualizationTypeEnum) => {
    try {
      dispatch(setVisualization(visualization))
      db().ref(`users/${userUid}/settings/visualization`).set(visualization)
    } catch (e) {
      console.error('Error updating visualization type', e)
    }
  }

  const updateTotalIncome = (totalIncome: string) => {
    try {
      dispatch(setTotalIncome(totalIncome))
      db().ref(`users/${userUid}/settings/totalIncome`).set(totalIncome)
    } catch (e) {
      console.error('Error updating total income', e)
    }
  }

  return {
    subscribeToSettings,
    updateCategoryBudgetType,
    updateVisualization,
    updateTotalIncome,
  }
}
