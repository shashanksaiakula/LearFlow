import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

interface SectionHeaderProprs {
    title : string
}

const SectionHeader = ({title} : SectionHeaderProprs) => {
  return (
    <View style = {styles.container}>
      <Text style ={styles.textStyle}>{title}</Text>
    </View>
  )
}

export default SectionHeader

const styles = StyleSheet.create({
    container :{
        padding : 10,
    },
    textStyle :{
        fontSize : 22,
        fontWeight : 'bold',
    }
})