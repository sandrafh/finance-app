import React, { FC } from "react"

import { TouchableOpacity, Text, StyleSheet } from "react-native"
import { colors } from "../Constants/ColorsConstants"

export enum ButtonVariants {
  Primary = 'primary',
  Secondary = 'secondary',
  Tertiary = 'tertiary'
}

interface ButtonProps {
  title: string
  variant: ButtonVariants
  onPress: () => void
  style?: any
}

export const Button = ({ title, onPress, variant, style }: ButtonProps) => {
  const containerStyle = () => {
    switch(variant) {
      case ButtonVariants.Primary:
        return styles.containerPrimary
      case ButtonVariants.Secondary:
        return styles.containerSecondary
      case ButtonVariants.Tertiary:
        return styles.containerTertiary
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
      case ButtonVariants.Tertiary:
        return styles.textTertiary
      default:
        return styles.textPrimary
    }
  }

  return (
    <TouchableOpacity onPress={onPress} style={[containerStyle(), style]}>
      <Text style={textStyle()}>{title}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  containerPrimary: {
    height: 44,
    backgroundColor: colors.primary,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  containerSecondary: {
    height: 44,
    backgroundColor: colors.secondary,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  containerTertiary: {
    height: 44,
    backgroundColor: colors.grey2,
    borderRadius: 8,
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
    color: colors.white,
  },
  textTertiary: {
    fontSize: 16,
    fontWeight: "bold",
    color: colors.black,
  },
})
