import { View, TextInput, StyleSheet } from 'react-native'
import React from 'react'
import { colors } from '../constants/ColorsConstants'
import { CustomText, FontSize, FontWeight } from './CustomText'

interface InputProps {
  value: string
  onChangeText: (value: string) => void
  label?: string  
  inputMode?: any
  autoFocus?: boolean
  placeholder?: string
  autoCapitalize?: any
  secureTextEntry?: boolean
  multiline?: boolean
  numberOfLines?: number
}

export const CustomInput = (props: InputProps) => {
  const {
    value, 
    onChangeText, 
    label, 
    inputMode = "text", 
    autoFocus = false, 
    placeholder = "", 
    autoCapitalize = "none", 
    secureTextEntry = false,
    multiline = false,
    numberOfLines = 1
  } = props

  return (
    <View>
      {label && <CustomText style={styles.label} fontSize={FontSize.Medium} fontWeight={FontWeight.Normal}>{label}</CustomText>}
      <TextInput
        style={[{ height: 44*numberOfLines }, {lineHeight: numberOfLines === 1 ? 20 : 32}, styles.input]}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        inputMode={inputMode}
        autoFocus={autoFocus}
        autoCapitalize={autoCapitalize}
        secureTextEntry={secureTextEntry}
        placeholderTextColor={colors.grey2}
        multiline={multiline}
        numberOfLines={numberOfLines}
        cursorColor={colors.white}
        selectionColor={colors.grey1}
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
    paddingHorizontal: 16,
    borderRadius: 25,
    backgroundColor: colors.bgInput,
    color: colors.white,
    fontSize: FontSize.Medium
  }
})