import { Alert, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { FlatList } from 'react-native-gesture-handler'
import LessonCard from '../../components/LessonCard'
import { Lesson } from '../../models/Lesson'
import { Strings } from '../../strings/String'
import { Typography } from '../../theme/typography'
import { Spacing } from '../../theme/spacing'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../../redux/store'
import { getEnrolledCourse, updateEnrollent } from '../../redux/thunk/enrollThunk'

type LessonProps = {
    courseId: string,
    lessonId: string
    onClick: (lessonId: string) => void,
    lessons: Lesson[],
    completedList?: string[],
    lastLessonPlayedcode: string
    currentVideoSec: number,
    enrolledId: string
}

const LessonList = ({ onClick, lessonId, lessons, completedList, lastLessonPlayedcode, currentVideoSec, enrolledId }: LessonProps) => {
    const dispatch = useDispatch<AppDispatch>()

    const sortedLessons = lessons?.data
        ? [...lessons.data].sort((a, b) => a.lessonNumber - b.lessonNumber)
        : [];

    async function handleLastPlayedVider(lessonID: string) {
        if (!completedList?.includes(lessonId)) {
            await dispatch(updateEnrollent({
                id: enrolledId,
                lastPlayedLessonPosition: currentVideoSec,
                lastPlayedLessonCode: lessonId
            })).unwrap()
            await dispatch(getEnrolledCourse()).unwrap()
        } 
        if(completedList?.includes(lessonID) || lastLessonPlayedcode === lessonID){
        onClick(lessonID)
        } else {
            Alert.alert("please complete previous less to watch this lesson")
        }
    }


    return (
        <View style={styles.container}>
            <Text style={styles.titleStyle}>{Strings.all_lessons} {lessons.data.length}</Text>
            <FlatList
                data={sortedLessons}
                keyExtractor={(item, index) => `${item._id}+${index}`}
                renderItem={({ item }) =>
                    <LessonCard lesson={item} onClick={() => {
                        handleLastPlayedVider(item.lessonCode)
                    }}
                        isActive={item._id === lessonId}
                        index={item.order}
                        currentLesson={lessonId}
                        completedList={completedList}
                        lastLessonPlayed={lastLessonPlayedcode}
                    />
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
    }, titleStyle: {
        ...Typography.h2,
        fontWeight: 'bold',
        paddingHorizontal: Spacing.xxs
    }
})