import React from 'react'

import { StyleSheet, View } from 'react-native'
import { colors } from '../constants/ColorsConstants'
import { FontSize } from '../constants/Texts'
import { CustomText } from './CustomText'

interface IconButtonProps {
  text: string
  style?: any
}

export const InfoText = ({ text, style }: IconButtonProps) => {
  return (
    <View style={[styles.infoContainer, style]}>
      <CustomText style={styles.info} fontSize={FontSize.Small}>
        {text}
      </CustomText>
    </View>
  )
}

const styles = StyleSheet.create({
  infoContainer: {
    backgroundColor: colors.bgCard,
    borderRadius: 25,
    margin: 12,
    display: 'flex',
    alignItems: 'center',
  },
  info: {
    padding: 8,
  },
})
