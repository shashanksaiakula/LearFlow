import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React, { ReactNode } from 'react'
import LinearGradient from 'react-native-linear-gradient'
import { Colors } from '../../theme/colors';

interface CommomBackGround {
  children: ReactNode;
}

const CommomBackGround = ({children} : CommomBackGround) => {
  return (
               <LinearGradient
                colors={[
                   Colors.backgroundStart,
                   Colors.backgroundEnd
                ]}
                style={styles.container}
            >
                 <SafeAreaView style={styles.safeArea}>
                {children}
                </SafeAreaView>
            </LinearGradient>
  )
}

export default CommomBackGround

const styles = StyleSheet.create({
    container : {
        flex: 1,
        // padding: Spacing.
    },
    safeArea:{
         flex: 1
    }
})