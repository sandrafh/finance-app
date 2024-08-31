import { View, TextInput, StyleSheet } from 'react-native'
import React from 'react'
import { colors } from '../constants/ColorsConstants'
import { CustomText, FontSize, FontWeight } from './CustomText'

interface TextProps {
  style?: any
  label?: string
  value?: string
  onChangeText?: (value: string) => void
  inputMode?: any
  autoFocus?: boolean
  placeholder?: string
  autoCapitalize?: any
  secureTextEntry?: boolean
}

export const CustomInput = (props: TextProps) => {
  const {style, value, onChangeText, label, inputMode = "text", autoFocus = false, placeholder = "", autoCapitalize = "none", secureTextEntry = false} = props

  return (
    <View>
      {label && <CustomText style={styles.label} fontSize={FontSize.Medium} fontWeight={FontWeight.Normal}>{label}</CustomText>}
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        inputMode={inputMode}
        autoFocus={autoFocus}
        autoCapitalize={autoCapitalize}
        secureTextEntry={secureTextEntry}
        placeholderTextColor={colors.grey2}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  label: {
    color: colors.white,
    marginBottom: 8,
    marginLeft: 16,
  },
  input: {
    height: 44,
    paddingHorizontal: 16,
    borderRadius: 25,
    backgroundColor: colors.bgInput,
    color: colors.white,
  }
});