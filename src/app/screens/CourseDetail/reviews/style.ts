import { StyleSheet } from "react-native";
import { Colors } from "../../../theme/colors";
import { Typography } from "../../../theme/typography";

const styles = StyleSheet.create({
	listContent: {
		paddingBottom: 12,
	},
	summary: {
		flexDirection: "row",
		alignItems: "center",
		paddingVertical: 4,
	},
	averageBlock: {
		width: "32%",
		alignItems: "center",
		borderRightWidth: 1,
		borderRightColor: Colors.border,
		paddingRight: 8,
	},
	averageRating: {
		...Typography.h2,
		color: Colors.textPrimary,
		fontWeight: "800",
	},
	reviewCount: {
		...Typography.caption,
		color: Colors.textSecondary,
		marginTop: 4,
		textAlign: "center",
	},
	stars: {
		flexDirection: "row",
		alignItems: "center",
	},
	distribution: {
		flex: 1,
		paddingLeft: 14,
	},
	distributionRow: {
		flexDirection: "row",
		alignItems: "center",
		height: 22,
	},
	ratingLabel: {
		...Typography.caption,
		color: Colors.textSecondary,
		width: 12,
	},
	barTrack: {
		flex: 1,
		height: 6,
		backgroundColor: Colors.border,
		borderRadius: 3,
		marginHorizontal: 6,
		overflow: "hidden",
	},
	barFill: {
		height: "100%",
		backgroundColor: Colors.warning,
		borderRadius: 3,
	},
	ratingCount: {
		...Typography.caption,
		color: Colors.textSecondary,
		width: 18,
		textAlign: "right",
	},
	sectionTitle: {
		...Typography.h3,
		color: Colors.textPrimary,
		fontWeight: "700",
		marginHorizontal: 6,
		marginTop: 8,
		marginBottom: 2,
	},
	reviewHeader: {
		flexDirection: "row",
		alignItems: "center",
	},
	avatar: {
		width: 44,
		height: 44,
		borderRadius: 22,
		backgroundColor: Colors.primaryLight1,
	},
	avatarFallback: {
		width: 44,
		height: 44,
		borderRadius: 22,
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: Colors.primaryLight3,
	},
	avatarInitial: {
		...Typography.body1,
		color: Colors.primary,
		fontWeight: "800",
	},
	reviewerInfo: {
		flex: 1,
		marginLeft: 10,
	},
	reviewerName: {
		...Typography.body1,
		color: Colors.textPrimary,
		fontWeight: "700",
	},
	date: {
		...Typography.caption,
		color: Colors.textSecondary,
		alignSelf: "flex-start",
	},
	comment: {
		...Typography.body2,
		color: Colors.textSecondary,
		lineHeight: 21,
		marginTop: 12,
	},
	emptyTitle: {
		...Typography.body1,
		color: Colors.textPrimary,
		fontWeight: "700",
		textAlign: "center",
	},
	emptyText: {
		...Typography.body2,
		color: Colors.textSecondary,
		textAlign: "center",
		marginTop: 4,
	},
})

export default styles