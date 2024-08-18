import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  Keyboard,
  Alert,
} from "react-native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";

import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth"
import db from "@react-native-firebase/database"
import { Button, ButtonVariants } from "../Components/Button";
import { NavigationAppScreens } from "../Navigation/NavigationConstants";
import { useDispatch } from "react-redux";
import { setUserUid } from "../redux/slices/user";
import { CustomText } from "../Components/CustomText";

export const Register = () => {
  const dispatch = useDispatch()

  const [name, setName] = useState<string | undefined>();
  const [email, setEmail] = useState<string | undefined>();
  const [password, setPassword] = useState<string | undefined>();

  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  const createProfile = async (response: FirebaseAuthTypes.UserCredential) => {
    dispatch(setUserUid(response.user.uid))
    db().ref(`users/${response.user.uid}`).set({ name })
    db().ref(`users/${response.user.uid}/expenses`).set({ totalExpenses: 0 })
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
          navigation.replace(NavigationAppScreens.Main)
        }
      } catch (error) {
        console.error("Error on register an user: ", error)
      }
    }
  };

  return (
    <Pressable style={styles.contentView} onPress={Keyboard.dismiss}>
      <SafeAreaView style={styles.contentView}>
        <View style={styles.container}>
          <View style={styles.titleContainer}>
            <CustomText style={styles.titleText}>Register</CustomText>
          </View>
          <View style={styles.mainContent}>
            <TextInput
              style={styles.loginTextField}
              placeholder="Name"
              value={name}
              onChangeText={setName}
            />
            <TextInput
              style={styles.loginTextField}
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
              inputMode="email"
              autoCapitalize="none"
            />
            <TextInput
              style={styles.loginTextField}
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
          </View>
          <Button
            title="Sign Up"
            onPress={registerAndGoToMainFlow}
            variant={ButtonVariants.Primary}
          />
          <Button title="Go Back" onPress={navigation.goBack} variant={ButtonVariants.Secondary} />
        </View>
      </SafeAreaView>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  contentView: {
    flex: 1,
    backgroundColor: "white",
  },
  container: {
    flex: 1,
    marginHorizontal: 50,
    backgroundColor: "white",
    paddingTop: 20,
  },
  titleContainer: {
    flex: 1.2,
    justifyContent: "center",
  },
  titleText: {
    fontSize: 45,
    textAlign: "center",
    fontWeight: "200",
  },
  loginTextField: {
    borderBottomWidth: 1,
    height: 60,
    fontSize: 30,
    marginVertical: 10,
    fontWeight: "300",
  },
  mainContent: {
    flex: 6,
  },
});
