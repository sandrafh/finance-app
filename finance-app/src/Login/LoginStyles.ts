import { StyleSheet } from "react-native";
import { colors } from "../constants/ColorsConstants";

export const styles = StyleSheet.create({
  contentView: {
    flex: 1,  
    backgroundColor: colors.black,  
  },
  container: {
    flex: 1,
    width: "100%",
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  imageContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    opacity: 0.8,
  },
  mainContent: {
    flex: 6,
    gap: 12
  },
  titleContainer: {
    flex: 1.2,
    justifyContent: "center",
  },
  titleText: {
    textAlign: "center",
    fontWeight: "300",
    fontSize: 40,
    color: colors.white,
  }, 
  buttonsView: {
    display: "flex",
    flexDirection: "column",
    gap: 8,
    marginBottom: 20,
  }
})