import { ActivityIndicator, FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { RootStackParamList } from '../../navigation/types'
import { RouteProp } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { requestCoueseById } from '../../redux/slices/courseSlicer';
import { RootState } from '../../redux/store';
import LessonCard from '../../components/LessonCard';
import { StackNavigationProp } from '@react-navigation/stack';


type CoueseDetailScreenProps = RouteProp<RootStackParamList, "CourseDetails"> 

type CoursesDetailsScreenNavigationProps = StackNavigationProp<RootStackParamList, "CourseDetails"> 

type Props = {
    route : CoueseDetailScreenProps
    navigation : CoursesDetailsScreenNavigationProps
}

const CourseDetialsScreen = ({route, navigation} : Props) => {
  const {courses, error, loading} = useSelector((state : RootState) => state.courses)
  const {courseId} = route.params
  const dispatch = useDispatch()

  useEffect(()=>{
    dispatch(requestCoueseById(courseId))
},[courseId])

  if (loading) {
    return <ActivityIndicator size={'large'} style={styles.indicatorStyle} />
  }

  if (error) {
    return <Text style={styles.errorStyle}>{error}</Text>
  }
    
  return (
    <View style ={styles.container}>
      <Text style={styles.WelcomeStyle}>{courses?.title}</Text>
      <Text style ={styles.titleTextStle}>Instructor : {courses?.instructor}</Text>
      <Text style ={styles.titleTextStle}>Rating : {courses?.rating} ⭐</Text>
      <Text style ={styles.titleTextStle}>Total Duration : {courses?.duration}</Text>
      <Text style ={styles.titleTextStle}>Total Lessons : {courses?.lessons.length}</Text>
      <FlatList
      data={courses?.lessons}
      keyExtractor={(item) => item.id.toString()}
      renderItem={(item) => 
        <LessonCard lesson={item.item} onClick={()=>{
          navigation.navigate("LessonPlayer", {
            lessonId : item.item.id,
            courseId : courseId
          })
        }} />
      }
      />
    </View>
  )
}

export default CourseDetialsScreen

const styles = StyleSheet.create({
    errorStyle: {
    fontSize: 20,
    color: "red"
  },
  container: {
    flex: 1,
    padding: 6,
  },
  indicatorStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
    WelcomeStyle: {
    width: "100%",
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold',
    padding: 22,
    elevation: 3,
    backgroundColor: "#fff",

  },titleTextStle:{
    padding: 10,
    fontSize: 22,
    fontWeight: "800"
  }
})