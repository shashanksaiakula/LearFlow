import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import LoginScreen from '../screens/Login/LoginScreen'



const stack = createStackNavigator()
export default function AuthStack() {
  return (
    <stack.Navigator>
        <stack.Screen name='Login' component={LoginScreen} />
    </stack.Navigator>
  )
}

const styles = StyleSheet.create({})