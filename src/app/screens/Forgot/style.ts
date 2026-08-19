import { StyleSheet } from "react-native";
import { Typography } from "../../theme/typography";
import { Colors } from "../../theme/colors";
import { Spacing } from "../../theme/spacing";

const styles = StyleSheet.create({
    mainConayner: {
        flex: 1,
    },
    container: {
        flex: 1,
        marginTop : Spacing.sm,
        padding: Spacing.xxs
    }, nameCointer: {
        width: "100%",
        alignItems: "center",
        paddingVertical: 10,
        justifyContent: "center",
        paddingHorizontal: 40,
    }, nameStyle: {
        ...Typography.h2
    },
    emailStyle: {
        ...Typography.body2
    }, persInfo: {
        padding: 10,
        ...Typography.body1,
        color: Colors.primary,
        fontWeight: "bold"
    },
    logoutBtm: {
        marginHorizontal: 10,
        paddingVertical: 10,
        marginBottom: 10
    }, tiltStyle: {
        ...Typography.body1,
        fontWeight: "700"
    },bacontent:{
        marginVertical: Spacing.xl
    }
})
export default styles;
