import { BaseToast, ErrorToast, InfoToast } from 'react-native-toast-message';
import { colors } from '../constants/ColorsConstants';

export const toastConfig = {
  success: (props) => (
    <BaseToast
      {...props}
      style={{ borderLeftColor: colors.success, backgroundColor: colors.lightSuccess }}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={{
        fontSize: 16,
        fontWeight: '400'
      }}
    />
  ),
  error: (props) => (
    <ErrorToast
      {...props}
      style={{ backgroundColor: colors.lightError, borderLeftColor: colors.error }}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={{
        fontSize: 16,
        fontWeight: '400'
      }}
    />
  ),
  warning: ({ props }) => (
    <BaseToast
      {...props}
      style={{ backgroundColor: colors.lightWarning, borderLeftColor: colors.warning }}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={{
        fontSize: 16,
        fontWeight: '400'
      }}
    />
  ),
  info: ({ props }) => (
    <InfoToast
      {...props}
      style={{ backgroundColor: colors.grey2, borderLeftColor: colors.grey3 }}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={{
        fontSize: 16,
        fontWeight: '400'
      }}
    />
  )
}