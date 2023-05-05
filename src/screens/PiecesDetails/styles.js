import { StyleSheet, Dimensions } from "react-native";
// screen sizing
const { width, height } = Dimensions.get("window");
// orientation must fixed
const SCREEN_WIDTH = width < height ? width : height;

const numColumns = 3;
// item size
const FURNITURE_ITEM_HEIGHT = 100;
const FURNITURE_ITEM_OFFSET = 10;
const FURNITURE_ITEM_MARGIN = FURNITURE_ITEM_OFFSET * 2;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    margin: FURNITURE_ITEM_OFFSET,
    marginTop: 30,
    width:
      (SCREEN_WIDTH - FURNITURE_ITEM_MARGIN) / numColumns -
      FURNITURE_ITEM_OFFSET,
    height: FURNITURE_ITEM_HEIGHT + 60,
  },
  title: {
    margin: 10,
    marginBottom: 5,
    color: "black",
    fontSize: 13,
    textAlign: "center",
  },
  photo: {
    width:
      (SCREEN_WIDTH - FURNITURE_ITEM_MARGIN) / numColumns -
      FURNITURE_ITEM_OFFSET,
    height: FURNITURE_ITEM_HEIGHT,
    borderRadius: 60,
  },
});

export default styles;
