import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { FlatList } from 'react-native-gesture-handler'
import LessonCard from '../../components/LessonCard'
import useCousre from '../../hooks/useCousre'
import { Lesson } from '../../models/Lesson'

type LessonProps = {
    courseId: string,
    lessonId : string
    onClick: (lessonId: string) => void,
    lessons : Lesson[]
}

const LessonList = ({ onClick,lessonId,lessons }: LessonProps) => {

    console.log("list lesson is ",lessons)

    return (
        <View style={styles.container}>
            <FlatList
                data={lessons.data}
                keyExtractor={(item,index) => `${item._id}+${index}`}
                renderItem={({item}) =>
                    <LessonCard lesson={item} onClick={() => {
                        onClick(item.lessonCode)
                    }} isActive= {item._id === lessonId} />
                }
            />
        </View>
    )
}

export default LessonList

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

    }, titleTextStle: {
        padding: 10,
        fontSize: 22,
        fontWeight: "800"
    }
})