import { StyleSheet } from "react-native";
import { Typography } from "../../theme/typography";
import { Colors } from "../../theme/colors";
import { Spacing } from "../../theme/spacing";

const styles = StyleSheet.create({
  rowContainer: {
    flexDirection: "row",
    height: "8%",
    alignItems: "center", // Vertically centers the tabs inside the 8% height container
    justifyContent: "space-evenly",
    marginVertical: Spacing.xs,
  },
  tabButton: {
    flex: 1, // Distributes equal width to both tabs
    height: "100%", // Tells the button to fill the rowContainer height
    alignItems: "center", // Horizontally centers the text
    justifyContent: "center", // Vertically centers the text
    marginHorizontal: Spacing.sm,
    borderRadius: 8,
  },
  seletedView: {
    backgroundColor: Colors.primaryLight3,
  },
  rowText: {
    textAlign: "center",
    ...Typography.body1,
    fontWeight: "bold",
  },
   indicatorStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
    errorStyle: {
    fontSize: 20,
    color: "red"
  },
});

export default styles;
