import React, { useEffect, useState } from "react";

import { View, Text, StyleSheet } from "react-native";

import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth'
import { NavigationAppScreens } from "../Navigation/NavigationConstants";

export const LoadingScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  const onAuthStateChanged = (user: FirebaseAuthTypes.User | null) => {
    setTimeout(() => {
      if(user) {
        navigation.replace(NavigationAppScreens.Main)
      } 
      else {
        navigation.replace(NavigationAppScreens.Login)
      }
    })
  }

  useEffect(() => {
    const subscribe = auth().onAuthStateChanged(onAuthStateChanged)
    return subscribe
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.loadingText}>Loading</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  loadingText: {
    fontSize: 70,
    fontWeight: "200",
    textAlign: "center",
  },
});
