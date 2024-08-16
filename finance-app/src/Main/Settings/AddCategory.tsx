import React, {  } from "react"
import {
  View,
  StyleSheet,
} from "react-native"

import { useNavigation } from "@react-navigation/native"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import { colors } from "@/src/Constants/ColorsConstants"
import { Button, ButtonVariants } from "@/src/Components/Button"
import { NavigationSettingsScreens } from "@/src/Navigation/NavigationConstants"


export const AddCategory = () => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>()

  const onAddCategory = () => () => {
    navigation.navigate(NavigationSettingsScreens.AddCategory)
  }

  return (
    <View style={{ flex: 1, backgroundColor: colors.lightBlue }}>  
      <View>
        
      </View>  
      
    </View>
  )
}

const styles = StyleSheet.create({
  buttonContainer: {
    margin: 20,
  },
})
