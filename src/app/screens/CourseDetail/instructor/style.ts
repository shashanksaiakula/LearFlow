import { StyleSheet } from "react-native";
import { Colors } from "../../../theme/colors";
import { Typography } from "../../../theme/typography";

const styles = StyleSheet.create({
    nameStyle:{
        ...Typography.h2,
        color: Colors.textPrimary,
        fontWeight : "800",
        textAlign: "center",
        marginTop: 12,
    },
    bioStyle:{
         ...Typography.body2,
        color: Colors.textSecondary,
        textAlign: "center",
        lineHeight: 21,
        padding: 10,
        marginTop: 4,
    },
    statsRow:{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "stretch",
    },
    statContent:{
        minWidth: 125,
        alignItems: "center",
        paddingVertical: 4,
    },
    statValue:{
        ...Typography.h3,
        color: Colors.textPrimary,
        marginTop: 4,
    },
    statLabel:{
        ...Typography.caption,
        color: Colors.textSecondary,
        marginTop: 2,
    },
    conatainer:{
        paddingBottom: 16,
    },
    profileHeader:{
        alignItems: "center",
        paddingTop: 8,
    },
    roleBadge:{
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: Colors.primaryLight1,
        borderRadius: 14,
        paddingHorizontal: 10,
        paddingVertical: 5,
        marginTop: 8,
    },
    roleText:{
        ...Typography.caption,
        color: Colors.primary,
        fontWeight: "700",
        marginLeft: 5,
    },
    aboutTitle:{
        ...Typography.h3,
        color: Colors.textPrimary,
        marginBottom: 6,
    },
    aboutText:{
         ...Typography.body2,
        color: Colors.textSecondary,
        lineHeight: 21,
    },
    emptyContainer:{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        padding: 24,
    },
    emptyText:{
        ...Typography.body2,
        color: Colors.textSecondary,
        textAlign: "center",
    }

})

export default styles