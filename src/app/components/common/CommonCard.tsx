import { StyleSheet, Text, View } from 'react-native'
import React, { ReactNode } from 'react'
import { Colors } from '../../theme/colors'
import { Spacing } from '../../theme/spacing';

interface CommonCardProps {
  children: ReactNode;
}

const CommonCard = ({children }:CommonCardProps) => {
  return (
    <View style={styles.container}>
      {children}
    </View>
  )
}

export default CommonCard

const styles = StyleSheet.create({
    container:{
        elevation: 3,
        padding: 10,
        margin: Spacing.xxs,
        borderRadius: 10,
        backgroundColor: Colors.surface
    }
})