import { Text } from 'react-native'
import { getFontFamily } from '../utils/fontFamily'

export enum FontWeight {
  Normal = 'normal',
  Bold = 'bold',
  Medium = 'medium'
}

export enum FontSize {
  Small = 12,
  Medium = 16,
  Large = 20,
  XLarge = 24
}

interface TextProps {
  style?: any
  fontSize?: FontSize
  fontWeight?: FontWeight
  children: string
}

export const CustomText = (props: TextProps) => {
  const {style, children, fontWeight = FontWeight.Normal, fontSize = FontSize.Medium, ...rest} = props

  return (
    <Text {...rest} style={[{fontFamily: getFontFamily(fontWeight)}, {fontSize: fontSize}, style]}>
      {children}
    </Text>
  )
}