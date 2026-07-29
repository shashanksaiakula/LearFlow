import { StyleSheet } from "react-native";
import { Spacing } from "../../theme/spacing";
import { Typography } from "../../theme/typography";
import { Colors } from "../../theme/colors";


const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginBottom: Spacing.sm,
  },

  label: {
    ...Typography.body2,
    color: Colors.textPrimary,
    marginBottom: Spacing.xs,
  },

  inputContainer: {
    flexDirection: "row",
    alignItems: "center",

    height: 56,

    borderWidth: 1,
    borderColor: Colors.border,

    borderRadius: 12,

    backgroundColor: Colors.background,

    paddingHorizontal: Spacing.md,
  },

  focusedInput: {
    borderColor: Colors.primary,
  },

  errorInput: {
    borderColor: Colors.error,
  },

  leftIcon: {
    marginRight: Spacing.sm,
  },

  rightIcon: {
    marginLeft: Spacing.sm,
  },

  input: {
    flex: 1,
    ...Typography.body1,
    color: Colors.textPrimary,
  },

  error: {
    marginTop: Spacing.xs,
    color: Colors.error,
    ...Typography.caption,
  },
});

export default styles;