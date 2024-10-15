import { View, TouchableOpacity, StyleSheet } from "react-native"
import { colors } from "../constants/ColorsConstants"
import { CustomText } from "./CustomText"
import { FontSize } from "../constants/Texts"

export interface OptionsType {
  [key: string]: boolean
}

interface SwitchProps {
  options: OptionsType
  label?: string
  onPressOption: (key: string) => void
  fontSize?: FontSize
}

export const Switch = ({ options, label, onPressOption, fontSize = FontSize.Large }: SwitchProps) => {
  return (
    <View style={styles.switch}>
      {label && <CustomText style={styles.label}>{label}</CustomText>}
      <View style={styles.switchContainer}>
        {Object.entries(options).map(([key, value]: any) => (
          <TouchableOpacity key={key} style={[styles.switchOption, value && styles.selectedOption]} onPress={() => onPressOption(key)}>
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
    gap: 8,
  },
  switchContainer: {
    height: 44,
    display: "flex",
    flexDirection: "row",
    alignSelf: 'flex-start',
    justifyContent: 'center',
    alignItems: 'center', 
    backgroundColor: colors.bgInput,
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
  },
  label: {
    color: colors.white,
    marginLeft: 16,
  }
})