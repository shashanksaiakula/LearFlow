import { StyleSheet } from "react-native"
import { Typography } from "../../theme/typography"
import { Colors } from "../../theme/colors"
import { Spacing } from "../../theme/spacing"

const styles = StyleSheet.create({
    errorStyle: {
        fontSize: 20,
        color: "red"
    },
    container: {
        flex: 1,
        margin: 6,
    },
    indicatorStyle: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }, titleTextStle: {
        ...Typography.body1,
        fontWeight: 800,
        padding: 5
    },
    thumbnail: {
        width: 120,
        height: 120,
        resizeMode: 'stretch',
        borderRadius: 10
    }, topContainer: {
        flexDirection: 'row',
        alignItems: "center"
    },discTextStle:{
         ...Typography.body2,
        padding: 5
    },topViewContentStyle:{
        flex:1,
        margin:5,
    }, otherText:{
         ...Typography.body2,
        padding: 5,
        fontWeight: 600
    },tabContainer:{
        width: "100%",
        flexDirection: 'row',
        alignItems: "center",
        justifyContent: "space-between",
        marginVertical:10,
        borderBottomWidth :2,
         borderColor : Colors.disabled,

    },tabText:{
         ...Typography.body1,
        padding: 5,
        fontWeight: 600
    },tabUnderLine:{
        fontWeight: 600,
        borderColor : Colors.primary,
        borderBottomWidth :4
    },bottomView:{
        width:"100%",
        flexDirection: "row",
        justifyContent: "space-evenly",
        backgroundColor: Colors.white,
        padding:10,
    }
})

export default styles