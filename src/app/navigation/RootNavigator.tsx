import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import AuthStack from './AuthStack'
import MainStack from './MainStack'
import { useSelector } from 'react-redux'
import { RootState } from '../redux/store'
import SplashScreen from '../screens/splash/SplashScreen'


export default function RootNavigator() {
   const { isLoggedIn, isInitializing } = useSelector((state: RootState) => state.auth);
  return (
   <NavigationContainer>
    {isInitializing ? <SplashScreen/> : isLoggedIn ? <MainStack/> : <AuthStack/>}
   </NavigationContainer>
  )
}

const styles = StyleSheet.create({})