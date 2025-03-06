import React from 'react'

import { StyleSheet, TouchableOpacity } from 'react-native'
import { colors } from '@constants/ColorsConstants'

interface IconButtonProps {
  icon: any
  onPress: () => void
  backgroundColor?: string
  style?: any
}

export const IconButton = ({ icon, onPress, backgroundColor = 'transparent', style }: IconButtonProps) => {
  return (
    <TouchableOpacity onPress={onPress} style={[{ backgroundColor: backgroundColor }, style, styles.container]}>
      {icon}
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    height: 44,
    width: 44,
    justifyContent: 'center',
    alignItems: 'center',
    color: colors.white,
    borderRadius: 22,
  },
})
