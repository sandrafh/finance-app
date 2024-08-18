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
import { Button, ButtonVariants } from "../Components/Button";
import { NavigationAppScreens } from "../Navigation/NavigationConstants";
import { useDispatch } from "react-redux";
import { setUserUid } from "../redux/slices/user";
import { CustomText } from "../Components/CustomText";


export const Login = () => {
  const dispatch = useDispatch()
  
  const [email, setEmail] = useState<string | undefined>();
  const [password, setPassword] = useState<string | undefined>();

  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  const goToRegistration = () => {
    navigation.push(NavigationAppScreens.Register);
  };

  const goToMainFlow = async () => {
    if(email && password) {
      try {
        const response = await auth().signInWithEmailAndPassword(
          email,
          password
        )

        if(response.user) {
          dispatch(setUserUid(response.user.uid))
          navigation.replace(NavigationAppScreens.Main)
        }
      }
      catch(error) {
        console.error("Error on login: ", error)
      }
    }    
  };

  return (
    <Pressable style={styles.contentView} onPress={Keyboard.dismiss}>
      <SafeAreaView style={styles.contentView}>
        <View style={styles.container}>
          <View style={styles.titleContainer}>
            <CustomText style={styles.titleText}>Finance App</CustomText>
          </View>
          <View style={styles.mainContent}>
            <TextInput
              style={styles.loginTextField}
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              inputMode="email"
            />
            <TextInput
              style={styles.loginTextField}
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
          </View>
          <View style={styles.buttonsView}>
            <Button title="Login" onPress={goToMainFlow} variant={ButtonVariants.Primary} />
            <Button
              title="Sign Up"
              onPress={goToRegistration}
              variant={ButtonVariants.Secondary}
            />
          </View>          
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
    height: 44,
    fontSize: 18,
    marginVertical: 10,
    fontWeight: "300",
  },
  mainContent: {
    flex: 6,
  },
  buttonsView: {
    display: "flex",
    flexDirection: "column",
    gap: 8
  }
});
