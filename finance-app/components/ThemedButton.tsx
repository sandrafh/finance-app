import { Pressable, View, type ViewProps, StyleSheet, Text } from 'react-native';

import { useThemeColor } from '@/hooks/useThemeColor';

export type ThemedButtonProps = ViewProps & {
    onPress: () => void
    title: string
    lightColor?: string;
    darkColor?: string;
};

export const ThemedButton = ({ style, lightColor, darkColor, onPress, title }: ThemedButtonProps) => {
  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'buttonBackground')
  const textColor = useThemeColor({ light: lightColor, dark: darkColor }, 'text')

  return (
    <Pressable style={[{ backgroundColor }, styles.button]} onPress={onPress}>
        <Text style={[{ color: textColor }, styles.text]} >{title}</Text>
    </Pressable>
  )
}

const styles = StyleSheet.create({
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 4,
        elevation: 3,
    },
    text: {
        fontSize: 16,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
    },
  })
