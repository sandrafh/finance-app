import React from "react"

import { TouchableOpacity, StyleSheet } from "react-native"
import { colors } from "../Constants/ColorsConstants"

interface IconButtonProps {
  icon: any
  onPress: () => void
}

export const IconButton = ({ icon, onPress }: IconButtonProps) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      {icon}
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    height: 44,
    backgroundColor: "transparent",
    justifyContent: "center",
    alignItems: "center",
    color: colors.white
  },
})
