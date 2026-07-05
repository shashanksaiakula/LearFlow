import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import HomeScreen from '../screens/Home/HomeScreen'
import { RootStackParamList } from './types'

const stack = createStackNavigator<RootStackParamList>()
export default function MainStack() {
  return (
    <stack.Navigator>
        <stack.Screen name="Home" component={HomeScreen}/>
    </stack.Navigator>
  )
}

const styles = StyleSheet.create({})