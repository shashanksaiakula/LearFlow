import { StyleSheet } from "react-native";
import { Colors } from "../../theme/colors";
import { Spacing } from "../../theme/spacing";
import { Typography } from "../../theme/typography";

export const styles = StyleSheet.create({
    mainConatainer: {
        flex: 1,
        marginTop: Spacing.md,
        marginVertical: Spacing.xs
    },
    imageStyle: {
        // height: "30%",
        backgroundColor: Colors.primaryLight1,
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
        alignContent: "center",
    }, otpContainer: {
        flexDirection: "row",
        justifyContent: "center",
        gap: 12,
        marginVertical: 20,
    },

    otpBox: {
        width: 55,
        height: 55,
        borderWidth: 1,
        borderColor: Colors.primary,
        borderRadius: 10,
        textAlign: "center",
        fontSize: 22,
        fontWeight: "bold",
    }, emailStyle: {
        ...Typography.h1,
        textAlign: "center",
        paddingTop: Spacing.xxl
    }, subStyle: {
        ...Typography.body2,
        textAlign: "center",
        fontWeight: 400
    }, mailEmailStyle: {
        ...Typography.body2,
        textAlign: "center",
        fontWeight: 800
    }
})

