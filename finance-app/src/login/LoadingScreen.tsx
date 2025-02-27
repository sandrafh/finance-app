import React, { useEffect } from 'react'

import { StyleSheet, View } from 'react-native'

import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'

import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth'
import { NavigationAppScreens } from '../navigation/NavigationConstants'
import { CustomText } from '../components/CustomText'
import { useDispatch } from 'react-redux'
import { setUserUid } from '../redux/slices/user'

export const LoadingScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>()
  const dispatch = useDispatch()

  const onAuthStateChanged = (user: FirebaseAuthTypes.User | null) => {
    setTimeout(() => {
      if (user) {
        dispatch(setUserUid(user.uid))
        navigation.replace(NavigationAppScreens.Tabs)
      } else {
        navigation.replace(NavigationAppScreens.Login)
      }
    })
  }

  useEffect(() => {
    const subscribe = auth().onAuthStateChanged(onAuthStateChanged)
    return subscribe
  }, [])

  return (
    <View style={styles.container}>
      <CustomText style={styles.loadingText}>Loading</CustomText>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  loadingText: {
    fontSize: 70,
    fontWeight: '200',
    textAlign: 'center',
  },
})
