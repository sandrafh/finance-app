import { View, TouchableOpacity, StyleSheet } from "react-native"
import { colors } from "../constants/ColorsConstants"
import { CustomText, FontSize } from "./CustomText"

export interface OptionsType {
  [key: string]: boolean
}

interface SwitchProps {
  options: OptionsType
  title: string
  onPressOption: (key: string) => void
  fontSize?: FontSize
}

export const Switch = ({ options, title, onPressOption, fontSize = FontSize.Large }: SwitchProps) => {
  return (
    <View style={styles.switch}>
      <CustomText>{title}</CustomText>
      <View style={styles.switchContainer}>
        {Object.entries(options).map(([key, value]: any) => (
          <TouchableOpacity style={[styles.switchOption, value && styles.selectedOption]} onPress={() => onPressOption(key)}>
            <CustomText fontSize={fontSize}>{key}</CustomText>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  switch: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    gap: 12,
  },
  switchContainer: {
    height: 44,
    display: "flex",
    flexDirection: "row",
    alignSelf: 'flex-start',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 16,
    backgroundColor: colors.grey3,
    borderRadius: 22
  },
  switchOption: {
    height: 44,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: 'flex-start',
    borderRadius: 22,    
    overflow: "hidden",
    paddingHorizontal: 16
  },
  selectedOption: {
    backgroundColor: colors.primary,
  }
})