import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Typography } from '../../theme/typography'
import { Colors } from '../../theme/colors'

type CommaonProps = {
    title: string,
    rightIcon?: React.ReactNode
    leftIcon?: React.ReactNode
    onPressleft?: () => void
    onPressRight?: () => void
}

const ComnonHeader = ({ title, rightIcon, leftIcon, onPressRight, onPressleft }: CommaonProps) => {
    return (
        <View style={styles.container}>
            <Pressable
                style={styles.iconStyle}
                onPress={onPressRight}
            >{rightIcon}</Pressable>
            <Text style={styles.textStyle}>{title}</Text>
            <Pressable
                style={styles.iconStyle}
                onPress={onPressleft}
            >{leftIcon}</Pressable>
        </View>
    )
}

export default ComnonHeader

const styles = StyleSheet.create({
    container: {
        width: "100%",
        flexDirection: 'row',
        paddingHorizontal: 10,
        justifyContent: 'space-between',
        height: "10%",
        alignItems: 'center'
    },
    textStyle: {
        flex: 1,
        ...Typography.h2,
        color: Colors.black,
        textAlign: 'center'
    }, iconStyle: {
        paddingHorizontal: 10
    }
})