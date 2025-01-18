import {useNavigation} from "@react-navigation/native";
import React, {useState} from "react";
import {ImageBackground, Keyboard, Pressable, SafeAreaView, View,} from "react-native";
import type {NativeStackNavigationProp} from "@react-navigation/native-stack";
import {useDispatch} from "react-redux";

import {styles} from "./LoginStyles";

//External libraries
import auth from "@react-native-firebase/auth"
import Toast from "react-native-toast-message";
//Internal components
import {Button, ButtonVariants} from "../components/Button";
import {NavigationAppScreens} from "../navigation/NavigationConstants";
import {setUserUid} from "../redux/slices/user";
import {CustomInput} from "../components/CustomInput";
import {CustomText} from "../components/CustomText";
import {FontSize} from "../constants/Texts";
import { ToastTypes } from "../constants/ToastConstants";


export const Login = () => {
  const dispatch = useDispatch()
  
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')

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
        Toast.show({
          type: ToastTypes.Error,
          text1: 'Email or password is incorrect'
        })
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
                  keyboardType="email-address"
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


