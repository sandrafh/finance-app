import React, {  } from "react"
import { useDispatch } from "react-redux"
import { useNavigation } from "@react-navigation/native"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import {
  View,
  StyleSheet,
} from "react-native"
//Internal components
import { colors } from "@/src/constants/ColorsConstants"
import { Button, ButtonVariants } from "@/src/components/Button"
import { setUserUid } from "@/src/redux/slices/user"
import { NavigationAppScreens } from "@/src/navigation/NavigationConstants"


export const SettingsView = () => {
  const dispatch = useDispatch()
  const navigation = useNavigation<NativeStackNavigationProp<any>>()  

  const onPressLogout = () => {
    dispatch(setUserUid(""))
    navigation.replace(NavigationAppScreens.Login)
  }

  return (
    <View style={styles.container}> 
      <Button title="Logout" variant={ButtonVariants.Primary} onPress={onPressLogout}/>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bg,
    paddingVertical: 16
  }
})
