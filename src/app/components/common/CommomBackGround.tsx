import { SafeAreaView, StatusBar, StyleSheet, Text, View } from 'react-native'
import React, { ReactNode } from 'react'
import LinearGradient from 'react-native-linear-gradient'
import { Colors } from '../../theme/colors';
import { Spacing } from '../../theme/spacing';

interface CommomBackGround {
  children: ReactNode;
}

const CommomBackGround = ({children} : CommomBackGround) => {
  return (
        <>
          <StatusBar
            translucent
            backgroundColor="transparent"
            barStyle="dark-content"
          />
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
            </>
  )
}

export default CommomBackGround

const styles = StyleSheet.create({
    container : {
        flex: 1,
        paddingTop: Spacing.md
    },
    safeArea:{
         flex: 1
    }
})