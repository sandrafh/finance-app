import { colors } from '@/src/constants/ColorsConstants';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: colors.lightBlue,
  },  
  buttonContainer: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    width: '100%',
  },
})