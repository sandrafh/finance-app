import React, {  } from "react"
import {
  View,
  StyleSheet,
} from "react-native"

import { useNavigation } from "@react-navigation/native"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import { colors } from "@/src/Constants/ColorsConstants"
import { Button, ButtonVariants } from "@/src/Components/Button"
import { NavigationAppScreens, NavigationSettingsScreens } from "@/src/Navigation/NavigationConstants"


export const SettingsView = () => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>()

  const onAddCategory = () => () => {
    navigation.navigate(NavigationAppScreens.AddCategory)
  }

  return (
    <View style={{ flex: 1, backgroundColor: colors.lightBlue }}>  
      <View style={styles.buttonContainer}>
        <Button title="Add Category" onPress={onAddCategory()} variant={ButtonVariants.Primary} />
      </View>        
    </View>
  )
}

const styles = StyleSheet.create({
  buttonContainer: {
    margin: 20,
  },
})
