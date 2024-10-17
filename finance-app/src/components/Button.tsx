import React, {ReactNode} from "react"

import {StyleSheet, TouchableOpacity} from "react-native"
import {colors} from "../constants/ColorsConstants"
import {CustomText} from "./CustomText"

export enum ButtonVariants {
  Primary = 'primary',
  Secondary = 'secondary',
  Danger = 'danger'
}

interface ButtonProps {
  title?: string
  variant: ButtonVariants
  onPress: () => void
  icon?: ReactNode
  style?: any
}

export const Button = ({ title, onPress, variant, icon, style }: ButtonProps) => {
  const containerStyle = () => {
    switch(variant) {
      case ButtonVariants.Primary:
        return styles.containerPrimary
      case ButtonVariants.Secondary:
        return styles.containerSecondary
      case ButtonVariants.Danger:
        return styles.containerDanger
      default:
        return styles.containerPrimary
    }
  }

  const textStyle = () => {
    switch(variant) {
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

  return (
    <TouchableOpacity onPress={onPress} style={[containerStyle(), style]}>
      {icon}
      {title && <CustomText style={textStyle()}>{title}</CustomText>}
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  containerPrimary: {
    height: 44,
    minWidth: 44,
    backgroundColor: colors.primary,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
  },
  containerSecondary: {
    height: 44,
    minWidth: 44,
    backgroundColor: colors.grey2,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
  },
  containerDanger: {
    height: 44,
    minWidth: 44,
    backgroundColor: colors.danger,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
  },
  textPrimary: {
    fontSize: 16,
    fontWeight: "bold",
    color: colors.white,
  },
  textSecondary: {
    fontSize: 16,
    fontWeight: "bold",
    color: colors.black,
  },
  textDanger: {
    fontSize: 16,
    fontWeight: "bold",
    color: colors.white,
  },
})
