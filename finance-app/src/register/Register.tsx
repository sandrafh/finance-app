import { useNavigation } from '@react-navigation/native'
import React, { useState } from 'react'
import { Keyboard, Pressable, SafeAreaView, View } from 'react-native'
import type { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { useDispatch } from 'react-redux'

import { styles } from './RegisterStyles'
//External libraries
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth'
//Internal components
import { CustomButton, ButtonVariants } from '@components/CustomButton'
import { NavigationAppScreens } from '@navigation/NavigationConstants'
import { setUserUid } from '@redux/slices/user'
import { CustomText } from '@components/CustomText'
import { CustomInput } from '@components/CustomInput'
import { ProfileService } from '@services/ProfileService'

export const Register = () => {
  const dispatch = useDispatch()

  const { setUserName } = ProfileService()

  const [name, setName] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  const navigation = useNavigation<NativeStackNavigationProp<any>>()

  const createProfile = async (response: FirebaseAuthTypes.UserCredential) => {
    dispatch(setUserUid(response.user.uid))
    if (name) setUserName(name)
  }

  const registerAndGoToMainFlow = async () => {
    if (email && password) {
      try {
        const response = await auth().createUserWithEmailAndPassword(email, password)

        if (response.user) {
          await createProfile(response)
          navigation.replace(NavigationAppScreens.Tabs)
        }
      } catch (error) {
        console.error('Error on register an user: ', error)
      }
    }
  }

  return (
    <Pressable style={styles.contentView} onPress={Keyboard.dismiss}>
      <SafeAreaView style={styles.contentView}>
        <View style={styles.container}>
          <View style={styles.titleContainer}>
            <CustomText style={styles.titleText}>Register</CustomText>
          </View>
          <View style={styles.mainContent}>
            <CustomInput label="Name" placeholder="Name" value={name} onChangeText={setName} />
            <CustomInput
              label="Email"
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            <CustomInput
              label="Password"
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
          </View>
          <View style={styles.buttons}>
            <CustomButton title="Sign Up" onPress={registerAndGoToMainFlow} variant={ButtonVariants.Primary} />
            <CustomButton title="Go Back" onPress={navigation.goBack} variant={ButtonVariants.Secondary} />
          </View>
        </View>
      </SafeAreaView>
    </Pressable>
  )
}
