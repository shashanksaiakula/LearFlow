import { StyleSheet } from "react-native";
import { Typography } from "../../theme/typography";
import { Colors } from "../../theme/colors";

const styles = StyleSheet.create({
     container: {
        flex: 1,
    },nameCointer:{
        width: "100%",
        alignItems:"center"
    },nameStyle:{
        ...Typography.h2
    },
    emailStyle:{
        ...Typography.body2
    },persInfo:{
        ...Typography.body1,
        color: Colors.primary,
        fontWeight:"bold"
    },
    logoutBtm:{
        marginHorizontal: 10,
        paddingVertical :10,
        
    }
})
export default styles;
