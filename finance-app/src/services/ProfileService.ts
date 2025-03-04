import { useDispatch, useSelector } from 'react-redux'
//External libraries
//@ts-ignore
import db from '@react-native-firebase/database'
//Internal components
import { getUserUid, setName } from '../redux/slices/user'

export const ProfileService = () => {
  const dispatch = useDispatch()
  const userUid = useSelector((state: any) => getUserUid(state))

  const subscribeToProfile = () => {
    try {
      db()
        .ref(`users/${userUid}/profile`)
        .on('value', (snapshot) => {
          const data = snapshot.val()
          if (data) {
            dispatch(setName(data?.name))
          }
        })
    } catch (e) {
      console.error('Error subscribing to profile', e)
    }
  }

  const setUserName = (name: string) => {
    try {
      dispatch(setName(name))
      db().ref(`users/${userUid}/profile`).update({ name })
    } catch (e) {
      console.error('Error setting user name', e)
    }
  }

  return {
    subscribeToProfile,
    setUserName,
  }
}
