import { fontFamilies } from "../Constants/fonts"

export const getFontFamily = (
  weight: 'normal' | 'medium' | 'bold',
) => {
  const selectedFontFamily = fontFamilies.QUICKSAND;
  return selectedFontFamily[weight];
}