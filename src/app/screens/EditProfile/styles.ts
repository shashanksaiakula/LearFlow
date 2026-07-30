import { StyleSheet } from "react-native";
import { Typography } from "../../theme/typography";
import { Colors } from "../../theme/colors";

const styles = StyleSheet.create({
    mainConayner:{
        flex: 1,
        marginBottom: 20
    },
     container: {
        flex: 1,
    },nameCointer:{
        width: "100%",
        alignItems:"center",
        paddingVertical: 10
    },nameStyle:{
        ...Typography.h2
    },
    emailStyle:{
        ...Typography.body2
    },persInfo:{
        padding: 10,
        ...Typography.body1,
        color: Colors.primary,
        fontWeight:"bold"
    },
    logoutBtm:{
        marginHorizontal: 10,
        paddingVertical :10,
        marginBottom: 10
    }
})
export default styles;
