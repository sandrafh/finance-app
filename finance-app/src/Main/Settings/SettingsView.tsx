import React, {  } from "react"
import {
  View,
  StyleSheet,
} from "react-native"

import { useNavigation } from "@react-navigation/native"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"


export const SettingsView = () => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>()

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>    
    </View>
  )
}

const styles = StyleSheet.create({
  buttonContainer: {
    margin: 20,
  },
})
