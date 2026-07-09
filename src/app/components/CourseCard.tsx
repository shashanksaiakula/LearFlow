import { Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Course } from '../models/course'

interface CourseCardProps {
  course: Course;
  onClick : () => void
}

export default function CourseCard({course, onClick} : CourseCardProps) {
  return (
    <TouchableOpacity style={styles.container} onPress={onClick}>
        <Text>{course.title}</Text>
        <Text>{course.description}</Text>
        <Text>{course.duration}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container:{
    padding: 16,
        marginVertical: 8,
        marginHorizontal: 16,
        borderRadius: 10,
        backgroundColor: "#FFF",
        elevation: 3
  }
})