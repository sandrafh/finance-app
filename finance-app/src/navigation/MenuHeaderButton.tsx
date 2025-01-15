import React from "react";

import SettingsIcon from '../assets/icons/settings.svg';

import { IconButton } from "../components/IconButton";
import { colors } from "../constants/ColorsConstants";
import { NavigationAppScreens } from "./NavigationConstants";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "react-native-screens/lib/typescript/native-stack/types";

export const MenuHeaderButton = () => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>()

  return (
    <IconButton 
      icon={<SettingsIcon width={24} color={colors.grey1} />} 
      onPress={() => {
        navigation.navigate(NavigationAppScreens.SettingsView)
      }} 
      backgroundColor={colors.bgCard}
    />
  );
}