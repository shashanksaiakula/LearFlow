import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import MaterialCommunityIcons from "@react-native-vector-icons/material-design-icons";
import { Colors } from '../../theme/colors';

type AvatherPeops ={
    isEditScreen : boolean,
    onPress? : ()=> void
}

const Avather = ({isEditScreen,onPress}: AvatherPeops) => {
    return (
        <Pressable onPress={onPress}
        disabled={!isEditScreen}
                 style={({ pressed }) => [
                    styles.container,
                {

                    opacity: pressed ? 0.85 : 1,
                    transform: [
                        {
                            scale: pressed ? 0.98 : 1,
                        },
                    ],
                },
            ]}
        >

            <View style={styles.avatherContainer}>
                <MaterialCommunityIcons
                    name= "account" 
                    color={Colors.primaryLight2}
                    size={120}
                    style={styles.avatherStyle}
                />
            </View>
            <View style={styles.smallAvatherContainer}>
                <MaterialCommunityIcons
                    name= {isEditScreen ? "pencil" :"camera-outline"}
                    color={Colors.primary}
                    size={22}
                    style={styles.smallAvatherStyle}
                />
            </View>
        </Pressable>
    )
}

export default Avather

const styles = StyleSheet.create({
    container: {
        alignContent: 'center',
        alignItems: 'center',
        position: 'relative', // Add this line
    },
    avatherContainer: {
        borderColor: Colors.primary,
        borderWidth: 2,
        borderRadius: 100,
        alignItems: 'center',
        justifyContent: 'center',
    },
    avatherStyle: {
        backgroundColor: Colors.surface,
        borderRadius: 100,
        margin: 5
    },
    smallAvatherStyle: {
        backgroundColor: Colors.surface,
        borderRadius: 16,
    }, smallAvatherContainer: {
        position: 'absolute',  // Add this line
        bottom: 0,             // Add this line
        right: '33%',          // Add this line to shift it over the avatar edge
        backgroundColor: Colors.surface, // Add this to cover the avatar lines behind it
        borderColor: Colors.primary,
        borderWidth: 2,
        borderRadius: 20,      // Change from 16 to 20 to make it circular
        width: 36,             // Add fixed width
        height: 36,            // Add fixed height
        alignItems: 'center',
        justifyContent: 'center',
    }
})