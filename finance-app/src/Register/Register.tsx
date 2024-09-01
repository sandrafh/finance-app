import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  Pressable,
  Keyboard,
} from "react-native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useDispatch } from "react-redux";

import { styles } from "./RegisterStyles";
//External libraries
import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth"
import db from "@react-native-firebase/database"
//Internal components
import { Button, ButtonVariants } from "../components/Button";
import { NavigationAppScreens } from "../navigation/NavigationConstants";
import { setUserUid } from "../redux/slices/user";
import { CustomText } from "../components/CustomText";
import { CustomInput } from "../components/CustomInput";

export const Register = () => {
  const dispatch = useDispatch()

  const [name, setName] = useState<string | undefined>()
  const [email, setEmail] = useState<string | undefined>()
  const [password, setPassword] = useState<string | undefined>()

  const navigation = useNavigation<NativeStackNavigationProp<any>>()

  const createProfile = async (response: FirebaseAuthTypes.UserCredential) => {
    dispatch(setUserUid(response.user.uid))
    db().ref(`users/${response.user.uid}`).set({ name })
  }

  const registerAndGoToMainFlow = async () => {
    if(email && password) {
      try {
        const response = await auth().createUserWithEmailAndPassword(
          email, 
          password
        )

        if (response.user) {
          await createProfile(response)
          navigation.replace(NavigationAppScreens.Tabs)
        }
      } catch (error) {
        console.error("Error on register an user: ", error)
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
            <CustomInput
              label="Name"
              placeholder="Name"
              value={name}
              onChangeText={setName}
            />
            <CustomInput
              label="Email"
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
              inputMode="email"
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
            <Button
              title="Sign Up"
              onPress={registerAndGoToMainFlow}
              variant={ButtonVariants.Primary}
            />
            <Button 
              title="Go Back" 
              onPress={navigation.goBack} 
              variant={ButtonVariants.Secondary} 
            />
          </View>          
        </View>
      </SafeAreaView>
    </Pressable>
  )
}