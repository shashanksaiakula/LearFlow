import { StyleSheet } from "react-native";
import { Typography } from "../../../theme/typography";

const styles = StyleSheet.create({
    nameStyle:{
        ...Typography.h2,
        fontWeight : "bold"
    },
    bioStyle:{
         ...Typography.body2,
        fontWeight : 400,
        textAlign: "center",
        padding: 10
    },
    rowConatiner:{
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: "center"
    },
    conatainer:{
        alignItems: "center"
    },
    rowtextStyle:{
         ...Typography.body2,
        fontWeight : "bold",
        textAlign: "center"
    }

})

export default styles