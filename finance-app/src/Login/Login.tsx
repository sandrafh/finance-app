import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  Pressable,
  Keyboard,
  ImageBackground,
} from "react-native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useDispatch } from "react-redux";

import { styles } from "./LoginStyles";

//External libraries
import auth from "@react-native-firebase/auth"
//Internal components
import { Button, ButtonVariants } from "../components/Button";
import { NavigationAppScreens } from "../navigation/NavigationConstants";
import { setUserUid } from "../redux/slices/user";
import { CustomInput } from "../components/CustomInput";
import { colors } from "../constants/ColorsConstants";
import { CustomText, FontSize } from "../components/CustomText";


export const Login = () => {
  const dispatch = useDispatch()
  
  const [email, setEmail] = useState<string | undefined>()
  const [password, setPassword] = useState<string | undefined>()

  const navigation = useNavigation<NativeStackNavigationProp<any>>()

  const goToRegistration = () => {
    navigation.push(NavigationAppScreens.Register)
  }

  const goToMainFlow = async () => {
    if(email && password) {
      try {
        const response = await auth().signInWithEmailAndPassword(
          email,
          password
        )

        if(response.user) {
          dispatch(setUserUid(response.user.uid))
          navigation.replace(NavigationAppScreens.Tabs)
        }
      }
      catch(error) {
        console.error("Error on login: ", error)
      }
    }    
  }

  return (
    <Pressable style={styles.contentView} onPress={Keyboard.dismiss}>     
      <SafeAreaView style={styles.contentView}>
        <ImageBackground
          source={require('../assets/bg-app.jpg')}
          resizeMode="cover"
          style={styles.imageContainer}
          imageStyle={styles.image}>
            <View style={styles.container}>
              <View style={styles.titleContainer}>
                <CustomText style={styles.titleText} fontSize={FontSize.XLarge}>Finance App</CustomText>
              </View>
              <View style={styles.mainContent}>
                <CustomInput
                  label="Email"
                  value={email}
                  onChangeText={setEmail}
                  placeholder="Email"
                  inputMode="email"
                  autoCapitalize="none"
                />
                <CustomInput
                  placeholder="Password"
                  label="Password"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={true}
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
        </ImageBackground>           
      </SafeAreaView>
    </Pressable>
  )
}


