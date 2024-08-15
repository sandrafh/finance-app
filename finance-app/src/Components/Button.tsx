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
}

export const Button = ({ title, onPress, variant }: ButtonProps) => {
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
    <TouchableOpacity onPress={onPress} style={containerStyle()}>
      <Text style={textStyle()}>{title}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  containerPrimary: {
    height: 60,
    backgroundColor: colors.background1,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  containerSecondary: {
    height: 60,
    backgroundColor: colors.background2,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  containerTertiary: {
    height: 60,
    backgroundColor: colors.background3,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  textPrimary: {
    fontSize: 16,
    fontWeight: "bold",
    color: colors.textColor,
  },
  textSecondary: {
    fontSize: 16,
    fontWeight: "bold",
    color: colors.textColor,
  },
  textTertiary: {
    fontSize: 16,
    fontWeight: "bold",
    color: colors.black,
  },
})
