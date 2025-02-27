import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState, useEffect } from 'react'
import { colors } from '../constants/ColorsConstants'
import { CustomText } from './CustomText'
import { FontSize, FontWeight } from '../constants/Texts'

import PlusIcon from '@/src/assets/icons/plus.svg'
import MinusIcon from '@/src/assets/icons/minus.svg'

type OptionKey = 'plus' | 'minus'

interface ToggleInputProps {
  value: string
  onChangeText?: (value: string) => void
  label?: string
  keyboardType?: any
  autoFocus?: boolean
  placeholder?: string
  autoCapitalize?: any
  secureTextEntry?: boolean
  multiline?: boolean
  numberOfLines?: number
  disabled?: boolean
}

export const ToggleInput = (props: ToggleInputProps) => {
  const {
    value,
    onChangeText,
    label,
    keyboardType = 'default',
    autoFocus = false,
    placeholder = '',
    autoCapitalize = 'none',
    secureTextEntry = false,
    multiline = false,
    numberOfLines = 1,
    disabled = false,
  } = props

  const initialValue = parseFloat(value) || 0
  const [inputValue, setInputValue] = useState(Math.abs(initialValue).toString())
  const [showedOption, setShowedOption] = useState<OptionKey>('minus')

  const applySign = (text: string, sign: OptionKey) => {
    const numValue = parseFloat(text) || 0
    return sign === 'minus' ? (-Math.abs(numValue)).toString() : Math.abs(numValue).toString()
  }

  const toggleSign = () => {
    const newSign = showedOption === 'plus' ? 'minus' : 'plus'
    setShowedOption(newSign)

    if (onChangeText) {
      onChangeText(applySign(inputValue, newSign))
    }
  }

  const onFocus = () => {
    if (inputValue === '0') {
      setInputValue('')
    }
  }

  return (
    <View>
      {label && (
        <CustomText style={styles.label} fontSize={FontSize.Medium} fontWeight={FontWeight.Normal}>
          {label}
        </CustomText>
      )}
      <View style={styles.container}>
        <TouchableOpacity key={showedOption} style={styles.option} onPress={toggleSign}>
          {showedOption === 'plus' ? (
            <PlusIcon width={16} height={16} color={colors.grey0} />
          ) : (
            <MinusIcon width={16} height={16} color={colors.grey0} />
          )}
        </TouchableOpacity>
        <TextInput
          style={[{ height: 44 * numberOfLines }, { lineHeight: numberOfLines === 1 ? 20 : 32 }, styles.input]}
          placeholder={placeholder}
          value={inputValue}
          onChangeText={(text) => {
            // Ensure only one decimal separator is present
            const formattedText = text.replace(',', '.')
            setInputValue(formattedText)
            if (onChangeText) {
              onChangeText(applySign(formattedText, showedOption))
            }
          }}
          keyboardType={keyboardType}
          autoFocus={autoFocus}
          autoCapitalize={autoCapitalize}
          secureTextEntry={secureTextEntry}
          placeholderTextColor={colors.grey2}
          multiline={multiline}
          numberOfLines={numberOfLines}
          cursorColor={colors.white}
          selectionColor={colors.grey1}
          editable={!disabled}
          onFocus={onFocus}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  label: {
    color: colors.white,
    marginBottom: 8,
    marginLeft: 16,
  },
  input: {
    flex: 1,
    paddingHorizontal: 16,
    borderRadius: 25,
    backgroundColor: colors.bgInput,
    color: colors.white,
    fontSize: FontSize.Medium,
  },
  option: {
    backgroundColor: colors.bgInput,
    height: 44,
    width: 44,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 22,
  },
})
