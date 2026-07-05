import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import LoginScreen from '../screens/Login/LoginScreen'
import HomeScreen from '../screens/Home/HomeScreen'
import { RootStackParamList } from './types'


const stack = createStackNavigator<RootStackParamList>()

const AppNavigation = () => {
  return (
    <NavigationContainer>
        <stack.Navigator>
            <stack.Screen name='Login' component={LoginScreen}/>
            <stack.Screen name='Home' component={HomeScreen}/>
        </stack.Navigator>
    </NavigationContainer>
  )
}

export default AppNavigation