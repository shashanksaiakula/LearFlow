import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Lesson } from '../models/Lesson'


interface LessonProps {
    lesson : Lesson,
    isActive : boolean
    onClick : () => void 
}

const LessonCard = ({lesson, onClick, isActive} : LessonProps) => {
  return (
    <TouchableOpacity onPress={onClick} style= {[styles.card, isActive && {backgroundColor: "#E3F2FD"}]}>
            <Text style= {styles.lesstonTitleStyle}>{lesson.id} . {lesson.title}</Text>
         <View style={[styles.lessonTitel, {justifyContent : "space-between", paddingVertical: 10}]}>
        <Text>{lesson.duration}</Text>
        <Text>{lesson.completed ? "Completed" : "yet to start"}</Text>
        </View>
    </TouchableOpacity>
  )
}

export default LessonCard

const styles = StyleSheet.create({
    card:{
        padding: 16,
        elevation: 4,
         borderRadius: 10,
        backgroundColor: "#FFF",
        margin: 8,
    },
    lessonTitel:{
        flexDirection : "row"
    },
    lesstonTitleStyle:{
        padding : 10,
        fontSize : 16,
        fontWeight : "bold"
    },
    lesstonIdStyle:{

    }
})