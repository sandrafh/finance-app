import React, { ReactNode } from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'
import { colors } from '@constants/ColorsConstants'
import { CustomText } from './CustomText'
import { FontSize } from '@constants/Texts'

export enum ButtonVariants {
  Primary = 'primary',
  Secondary = 'secondary',
  Outlined = 'outlined',
  Danger = 'danger',
}

export enum ButtonSizes {
  Small = 'small',
  Medium = 'medium',
  Large = 'large',
}

interface CustomButtonProps {
  title?: string
  variant: ButtonVariants
  onPress: () => void
  size?: ButtonSizes
  icon?: ReactNode
  rightIcon?: ReactNode
  style?: any
  disabled?: boolean
}

export const CustomButton = ({
  title,
  onPress,
  variant,
  size = ButtonSizes.Medium,
  icon,
  rightIcon,
  style,
  disabled = false,
}: CustomButtonProps) => {
  const containerStyle = () => {
    switch (variant) {
      case ButtonVariants.Primary:
        return styles.containerPrimary
      case ButtonVariants.Secondary:
        return styles.containerSecondary
      case ButtonVariants.Danger:
        return styles.containerDanger
      case ButtonVariants.Outlined:
        return styles.containerOutlined
      default:
        return styles.containerPrimary
    }
  }

  const textStyle = () => {
    switch (variant) {
      case ButtonVariants.Primary:
        return styles.textPrimary
      case ButtonVariants.Secondary:
        return styles.textSecondary
      case ButtonVariants.Danger:
        return styles.textDanger
      default:
        return styles.textPrimary
    }
  }

  const containerSizeStyle = () => {
    switch (size) {
      case ButtonSizes.Small:
        return styles.sizeSmall
      case ButtonSizes.Medium:
        return styles.sizeMedium
      case ButtonSizes.Large:
        return styles.sizeLarge
      default:
        return styles.sizeMedium
    }
  }

  const textSizeStyle = () => {
    switch (size) {
      case ButtonSizes.Small:
        return FontSize.Small
      case ButtonSizes.Medium:
        return FontSize.Medium
      case ButtonSizes.Large:
        return FontSize.Large
      default:
        return FontSize.Medium
    }
  }

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[containerStyle(), containerSizeStyle(), style, disabled && styles.disabled]}
      disabled={disabled}
    >
      {icon}
      {title && (
        <CustomText style={textStyle()} fontSize={textSizeStyle()}>
          {title}
        </CustomText>
      )}
      {rightIcon}
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  containerPrimary: {
    backgroundColor: colors.primary,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    gap: 6,
    shadowColor: colors.shadowPrimary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 6,
    elevation: 5,
  },
  containerSecondary: {
    backgroundColor: colors.bgButtonSecondary,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    gap: 6,
    shadowColor: colors.shadowSecondary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 6,
    elevation: 5,
  },
  containerDanger: {
    backgroundColor: colors.danger,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    gap: 6,
    shadowColor: colors.shadowDanger,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 6,
    elevation: 5,
  },
  containerOutlined: {
    backgroundColor: colors.transparent,
    borderRadius: 25,
    borderColor: colors.grey3,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    gap: 6,
    shadowColor: colors.shadowWhite, // Subtle glow effect
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 4,
  },

  textPrimary: {
    fontWeight: 'bold',
    color: colors.white,
  },
  textSecondary: {
    fontWeight: 'bold',
    color: colors.black,
  },
  textDanger: {
    fontWeight: 'bold',
    color: colors.white,
  },
  sizeSmall: {
    height: 32,
    minWidth: 32,
  },
  sizeMedium: {
    height: 44,
    minWidth: 44,
  },
  sizeLarge: {
    height: 56,
    minWidth: 56,
  },
  disabled: {
    opacity: 0.5,
  },
})
