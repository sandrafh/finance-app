import { Text } from 'react-native'
import { getFontFamily } from '../utils/fontFamily'

export enum FontWeight {
  Normal = 'normal',
  Bold = 'bold',
  Medium = 'medium'
}

interface TextProps {
  style?: any
  fontWeight?: FontWeight
  children: string
}

export const CustomText = (props: TextProps) => {
  const {style, children, fontWeight = FontWeight.Normal, ...rest} = props

  return (
    <Text {...rest} style={[{fontFamily: getFontFamily(fontWeight)}, style]}>
      {children}
    </Text>
  )
}