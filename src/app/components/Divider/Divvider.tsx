import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Colors } from '../../theme/colors'
import { Spacing } from '../../theme/spacing'

export default function Divvider() {
  return (
    <View style={styles.container}>
        <View style={styles.container}/>
    </View>
  )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        height: 2,
        backgroundColor : Colors.border,
        marginHorizontal : Spacing.xs,
        justifyContent: 'center'
    }
})