import React, {  } from "react"
import {
  View,
  StyleSheet,
} from "react-native"

import { useNavigation } from "@react-navigation/native"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import { colors } from "@/src/constants/ColorsConstants"


export const SettingsView = () => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>()  

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg }}> 
    </View>
  )
}

const styles = StyleSheet.create({
 
})
