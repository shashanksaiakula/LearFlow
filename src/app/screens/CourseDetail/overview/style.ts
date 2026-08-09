import { StyleSheet } from "react-native";
import { Typography } from "../../../theme/typography";
import { Colors } from "../../../theme/colors";

const styles = StyleSheet.create({
    tilteStyle:{
        ...Typography.body1,
        fontWeight: 800,
    },
    constainer:{flexDirection: 'row', padding:5,
        justifyContent:"center",
        alignItems: "center"
    },
    text:{
        padding:5
    },iconStyle:{
        backgroundColor: Colors.primary,
        borderRadius: 10,

    }
})

export default styles