import { StyleSheet } from "react-native";
import { Colors } from "../../theme/colors";
import { Spacing } from "../../theme/spacing";
import { Typography } from "../../theme/typography";

const styles = StyleSheet.create({
  // ===== Shared scroll content wrapper =====
  content: {
    flexGrow: 1,
    paddingHorizontal: Spacing.md,
    paddingBottom: Spacing.lg,
    marginBottom : Spacing.md
  },

  // ===== Checkout =====
  summaryCard: {
    marginTop: Spacing.md,
    backgroundColor: Colors.background,
    borderRadius: 16,
    padding: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: Spacing.xs,
  },
  summaryLabel: {
    ...Typography.body2,
    color: Colors.textSecondary,
    flexShrink: 1,
  },
  summaryValue: {
    ...Typography.body2,
    color: Colors.textPrimary,
    fontWeight: "600",
    marginLeft: Spacing.sm,
    flexShrink: 1,
    textAlign: "right",
  },
  divider: {
    height: 1,
    backgroundColor: Colors.border,
    marginVertical: Spacing.sm,
  },
  amountRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: Spacing.xs,
  },
  amountTitle: {
    ...Typography.h3,
    color: Colors.textPrimary,
  },
  amountValue: {
    ...Typography.h2,
    color: Colors.primary,
    fontWeight: "700",
  },
  secureNoteRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: Spacing.md,
    gap: Spacing.xs,
  },
  secureNoteText: {
    ...Typography.caption,
    color: Colors.textSecondary,
  },
  bottomButtonContainer: {
    marginTop: Spacing.lg,
  },

  // ===== Payment (methods + form) =====
  payTotalCard: {
    marginTop: Spacing.md,
    backgroundColor: Colors.background,
    borderRadius: 16,
    padding: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.border,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  payTotalLabel: {
    ...Typography.body1,
    color: Colors.textSecondary,
  },
  payTotalValue: {
    ...Typography.h2,
    color: Colors.textPrimary,
    fontWeight: "700",
  },
  sectionTitle: {
    ...Typography.h3,
    color: Colors.textPrimary,
    marginTop: Spacing.lg,
    marginBottom: Spacing.sm,
  },
  methodRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: Spacing.sm,
  },
  methodChip: {
    flex: 1,
    alignItems: "center",
    backgroundColor: Colors.background,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 12,
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.xs,
  },
  methodChipActive: {
    borderColor: Colors.primary,
    backgroundColor: Colors.primaryLight1,
  },
  methodChipLabel: {
    ...Typography.caption,
    color: Colors.textSecondary,
    marginTop: Spacing.xxs,
    textAlign: "center",
  },
  methodChipLabelActive: {
    color: Colors.primary,
    fontWeight: "600",
  },
  formCard: {
    marginTop: Spacing.md,
    backgroundColor: Colors.background,
    borderRadius: 16,
    padding: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  row: {
    flexDirection: "row",
    gap: Spacing.sm,
  },
  rowInput: {
    flex: 1,
  },
  cardBrandRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    marginBottom: Spacing.sm,
    gap: Spacing.xs,
  },
  errorBox: {
    backgroundColor: Colors.successbackground,
    borderRadius: 10,
  },
  errorText: {
    ...Typography.body2,
    color: Colors.error,
    paddingVertical: Spacing.xs,
    textAlign: "center",
  },

  // ===== Success =====
  successContainer: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: Spacing.md,
  },
  successIconWrap: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: Colors.successbackground,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: Spacing.lg,
  },
  successTitle: {
    ...Typography.h1,
    color: Colors.textPrimary,
    marginBottom: Spacing.xs,
  },
  successSubtitle: {
    ...Typography.body1,
    color: Colors.textSecondary,
    textAlign: "center",
    marginBottom: Spacing.lg,
  },
  successCard: {
    width: "100%",
    backgroundColor: Colors.background,
    borderRadius: 16,
    padding: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.border,
    marginBottom: Spacing.lg,
  },
  successCardRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: Spacing.xs,
  },
  successCardLabel: {
    ...Typography.body2,
    color: Colors.textSecondary,
  },
  successCardValue: {
    ...Typography.body2,
    color: Colors.textPrimary,
    fontWeight: "600",
  },
});

export default styles;