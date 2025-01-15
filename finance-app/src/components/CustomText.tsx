import React from 'react'

import {Text} from 'react-native'
import {getFontFamily} from '../utils/fontFamily'
import {colors} from '../constants/ColorsConstants'
import {FontSize, FontWeight} from '../constants/Texts'

interface TextProps {
  style?: any
  fontSize?: FontSize
  fontWeight?: FontWeight
  children: string[] | string
}

export const CustomText = (props: TextProps) => {
  const {style, children, fontWeight = FontWeight.Normal, fontSize = FontSize.Medium, ...rest} = props

  return (
    <Text {...rest} style={[{fontFamily: getFontFamily(fontWeight), color: colors.white}, {fontSize: fontSize}, {borderRadius: 22}, style]}>
      {children}
    </Text>
  )
}
