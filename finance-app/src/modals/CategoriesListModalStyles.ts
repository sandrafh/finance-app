import {StyleSheet} from "react-native";

export const styles = StyleSheet.create({
  viewContainer: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignContent: 'center',
    justifyContent: 'center'
  },
  modal: {
    borderRadius: 20,
    paddingBottom: 32,
  },
  item: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    paddingHorizontal: 36,
  }
});
