import React from "react"

import { TouchableOpacity, StyleSheet } from "react-native"
import { colors } from "../constants/ColorsConstants"

interface IconButtonProps {
  icon: any
  onPress: () => void
  backgroundColor?: string
}

export const IconButton = ({ icon, onPress, backgroundColor = 'transparent' }: IconButtonProps) => {
  return (
    <TouchableOpacity onPress={onPress} style={[{backgroundColor: backgroundColor}, styles.container]}>
      {icon}
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    height: 44,
    width: 44,
    justifyContent: "center",
    alignItems: "center",
    color: colors.white,
    borderRadius: 22,
  },
})
