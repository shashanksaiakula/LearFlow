import { StyleSheet } from "react-native";
import { Colors } from "../../theme/colors";
import { Typography } from "../../theme/typography";
import { Spacing } from "../../theme/spacing";

const styles = StyleSheet.create({
  indicatorStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
    errorStyle: {
    fontSize: 20,
    color: "red"
  },
categoryContainer: {
    backgroundColor: Colors.white,
    marginHorizontal: Spacing.xxs,
    height: 40,
    paddingHorizontal: Spacing.md,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginVertical : Spacing.xxs,
},
  
  // This styles ONLY the text inside the box
categoryText: {
    ...Typography.body1,
    color: "#333333",
    textAlign: "center",
    includeFontPadding: false,
},

})

export default styles;