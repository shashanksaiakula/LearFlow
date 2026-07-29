import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Colors } from '../../theme/colors'
import { Typography } from '../../theme/typography'

const TitleComponent = () => {
    return (
        <View style={styles.titleConstainer}>
            <Text style={styles.titleStyle}>Learn</Text>
            <Text style={[styles.titleStyle, { color: Colors.primary }]}>Flow</Text>
        </View>
    )
}

export default TitleComponent

const styles = StyleSheet.create({
      titleStyle: {
        ...Typography.h1,
        fontWeight: '700',
      },
        titleConstainer:{
    flexDirection : "row"
  }
})