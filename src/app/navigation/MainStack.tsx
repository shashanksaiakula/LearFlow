import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import HomeScreen from '../screens/Home/HomeScreen'
import { RootStackParamList } from './types'
import CourseDetialsScreen from '../screens/CourseDetail/CourseDetialsScreen'
import LessonPlayerScreen from '../screens/LessonPlayer/LessonPlayerScreen'

const stack = createStackNavigator<RootStackParamList>()
export default function MainStack() {
  return (
    <stack.Navigator>
        <stack.Screen name="Home" component={HomeScreen} options={{headerShown : false}}/>
        <stack.Screen name="CourseDetails" component={CourseDetialsScreen}  options={{headerShown : false}}/>
        <stack.Screen name="LessonPlayer" component={LessonPlayerScreen}  options={{headerShown : false}}/>
    </stack.Navigator>
  )
}

const styles = StyleSheet.create({})