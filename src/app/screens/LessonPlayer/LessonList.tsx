import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { FlatList } from 'react-native-gesture-handler'
import LessonCard from '../../components/LessonCard'
import useCousre from '../../hooks/useCousre'

type LessonProps = {
    courseId: number,
    lessonId : number
    onClick: (lessonId: number) => void
}

const LessonList = ({ courseId, onClick,lessonId }: LessonProps) => {
    const { loading, error, courses } = useCousre(courseId)
    if (loading) {
        return <ActivityIndicator size={'large'} style={styles.indicatorStyle} />
    }

    if (error) {
        return <Text style={styles.errorStyle}>{error}</Text>
    }

    return (
        <View style={styles.container}>
            <FlatList
                data={courses?.lessons}
                keyExtractor={(item) => item.id.toString()}
                renderItem={(item) =>
                    <LessonCard lesson={item.item} onClick={() => {
                        onClick(item.item.id)
                    }} isActive= {item.item.id === lessonId} />
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