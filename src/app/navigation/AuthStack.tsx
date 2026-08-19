import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import LoginScreen from '../screens/Login/LoginScreen'
import RegisterScreen from '../screens/Register'
import { AuthStackParamsList } from './types'
import ForgotScreen from '../screens/Forgot'
import EmailVerifcation from '../screens/emailVerification'
import ResetPasswordScreen from '../screens/Forgot/ResetPasswordScreen'



const stack = createStackNavigator<AuthStackParamsList>()
export default function AuthStack() {

  return (
    <stack.Navigator>
      <stack.Screen name='Login' component={LoginScreen} options={{ headerShown: false }} />
      <stack.Screen name='Register' component={RegisterScreen} options={{ headerShown: false }} />
      <stack.Screen name='Forgot' component={ForgotScreen} options={{ headerShown: false }} />
      <stack.Screen name='ResetPassword' component={ResetPasswordScreen} options={{ headerShown: false }} />
    </stack.Navigator>
  )
}

const styles = StyleSheet.create({})