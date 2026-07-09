import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { RootStackParamList } from '../../navigation/types'
import { RouteProp } from '@react-navigation/native';


type CoueseDetailScreenProps = RouteProp<RootStackParamList, "CourseDetails"> 

type Props = {
    route : CoueseDetailScreenProps
}

const CourseDetialsScreen = ({route} : Props) => {
    const {courseId} = route.params
  return (
    <View>
        <Text>CourseDetialsScreen</Text>
        <Text>{courseId}</Text>
    </View>
  )
}

export default CourseDetialsScreen

const styles = StyleSheet.create({})