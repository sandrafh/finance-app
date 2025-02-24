import { colors } from '@/src/constants/ColorsConstants';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    paddingVertical: 16,
  },
  card: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap: 8,    
    backgroundColor: colors.highlight,
    
    padding: 16,
    paddingRight: 24,
  },
  subCategoryCard: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',    
    
    padding: 16,
    paddingRight: 26,
    paddingLeft: 46,
  },
  subCategoryContainer: {
    marginLeft: 20
  },
  accordionArrow: {
    width: 44,
    height: 44,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }
})