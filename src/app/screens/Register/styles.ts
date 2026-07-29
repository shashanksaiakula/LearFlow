import { StyleSheet } from "react-native";
import { Spacing } from "../../theme/spacing";
import { Typography } from "../../theme/typography";
import { Colors } from "../../theme/colors";


const styles = StyleSheet.create({

    container: {
        flex: 1,
    },

    safeArea: {
        flex: 1,
    },

    flex: {
        flex: 1,
    },

    content: {
        flexGrow: 1,
        paddingHorizontal: Spacing.md,
        paddingTop: 60,
    },

    header: {
        alignItems: "center",
    },

    title: {
        ...Typography.h2,
        color: Colors.textPrimary,
        marginTop: Spacing.xs,
    },

    subtitle: {
        ...Typography.body1,
        color: Colors.textSecondary,
        marginTop: Spacing.xs,
        marginBottom: Spacing.md,
    },
    sideText: {
        color: Colors.primary,
        fontWeight: "800",
    },
    dividerStyle: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        marginVertical: Spacing.sm
    },
    dividerText: {
        ...Typography.body2,
        color: Colors.textSecondary

    },
    registerContainer: {
  flexDirection: "row",
  justifyContent: "center",
  marginVertical: Spacing.sm,
  // Creates an artificial safety gap at the bottom of the scroll view 
  // so text items don't get permanently obscured by the wave graphics
    marginBottom: 120, 
},
    accountText: {
        fontWeight: 600,
        color: Colors.textSecondary
    },
    registerText: {
        fontWeight: 800,
        color: Colors.primary
    },
    waveContainer: {
  position: "absolute",
  bottom: 0,
  left: 0,
  right: 0,
  height: 150,
  zIndex: 1, // Pushes it securely behind your interaction fields and buttons
},forgotContainer:{
    flex:1,
    width: "100%",
    flexDirection : "row",
    justifyContent: "space-between",
    alignItems: "center",
    alignContent: "center",
    marginBottom : Spacing.sm
}, switchContainer:{
    flex:1,
    flexDirection : "row",
    alignItems: "center"
},termsContainer:{
    flexDirection: "row",
    paddingVertical: Spacing.xxs,
}


});

export default styles;