import { ActivityIndicator, StyleSheet, TouchableOpacity, View } from 'react-native'
import React from 'react'
import MaterialDesignIcons from '@react-native-vector-icons/material-design-icons'
import { Spacing } from '../theme/spacing'
import { Colors } from '../theme/colors'

interface CommonIconwithLoderPropes {
    loding: boolean,
    icon: string,
    size?: number,
    color?: string,
    onPress? : ()=> void,
    isBackground? : boolean,
}


export default function CommonIconWithLoder({ icon, loding, color, size = 22,onPress,isBackground = true }: CommonIconwithLoderPropes) {
    return (
        <TouchableOpacity style={[styles.container, isBackground && styles.backgroundContainer]} onPress={onPress}>
            {loding ? (
                <ActivityIndicator size={size || "small"} color={color} />
            ) : (
                <MaterialDesignIcons name={icon} color={color} size={size || "small"} />
            )}
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
    }, backgroundContainer :{
         margin: 2,
        backgroundColor: Colors.primaryLight1,
        padding: 2,
        borderRadius: 5
    }
})
