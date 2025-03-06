import React from 'react'
import { StyleSheet, TextInput, View } from 'react-native'

import CrossIcon from '@assets/icons/cross.svg'

import { colors } from '@constants/ColorsConstants'
import { CustomText } from './CustomText'
import { FontSize, FontWeight } from '@constants/Texts'
import { IconButton } from './IconButton'

interface InputProps {
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
  onFocus?: () => void
  haveClearButton?: boolean
}

export const CustomInput = (props: InputProps) => {
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
    onFocus,
    haveClearButton = false,
  } = props

  return (
    <View>
      {label && (
        <CustomText style={styles.label} fontSize={FontSize.Medium} fontWeight={FontWeight.Normal}>
          {label}
        </CustomText>
      )}
      <View style={styles.inputContainer}>
        <TextInput
          style={[{ height: 44 * numberOfLines }, { lineHeight: numberOfLines === 1 ? 20 : 32 }, styles.input]}
          placeholder={placeholder}
          value={value}
          onChangeText={onChangeText}
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
        {haveClearButton && !!value && (
          <IconButton
            icon={<CrossIcon width={24} height={24} color={colors.grey1} />}
            onPress={() => onChangeText?.('')}
            backgroundColor={colors.bgInput}
          />
        )}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  label: {
    color: colors.white,
    marginBottom: 8,
    marginLeft: 16,
  },
  inputContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 8,
  },
  input: {
    flex: 1,
    paddingHorizontal: 16,
    borderRadius: 25,
    backgroundColor: colors.bgInput,
    color: colors.white,
    fontSize: FontSize.Medium,
  },
})
