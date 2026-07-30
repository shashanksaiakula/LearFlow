import { StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native'
import React, { ReactNode } from 'react'
import { Colors } from '../../theme/colors'
import { Spacing } from '../../theme/spacing'


type DividerProps={
  style? : StyleProp<ViewStyle>
}

export default function Divider({style} : DividerProps) {
  return (
    <View style={[styles.container,style]}>
        <View style={styles.container}/>
    </View>
  )
}

const styles = StyleSheet.create({
    container:{
        height: 2,
        backgroundColor : Colors.border,
        marginHorizontal : Spacing.xs,
        justifyContent: 'center'
    }
})