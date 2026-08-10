import { ActivityIndicator, FlatList, Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import CommomBackGround from '../../components/common/CommomBackGround'
import ComnonHeader from '../../components/common/ComnonHeader'
import { Strings } from '../../strings/String'
import styles from './style'
import { Colors } from '../../theme/colors'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../redux/store'
import { getEnrolledCourse } from '../../redux/thunk/enrollThunk'
import ContinueLearningCard from '../../components/ContinueLearningCard'
import { Course } from '../../models/course'
import { EnrollmentStatus } from '../../models/Enrollment'
import { fetchCourses } from '../../redux/thunk/coursesThunk'
import { selectCombinedCourses, selectCompletedCourses, selectInProgressCourses } from '../../redux/selectors/courseSelectors'
import { StackNavigationProp } from '@react-navigation/stack'
import { RootStackParamList } from '../../navigation/types'

type MyLearningNauvationProps = StackNavigationProp<RootStackParamList>

type Props ={
    navigation : MyLearningNauvationProps
}

const MyLearnings = ({navigation}: Props) => {
    const [selectedTab, setSelectedTab] = useState(Strings.in_progress)
    const dispatch = useDispatch<AppDispatch>()
    const { loading, enrollments, error } = useSelector((state: RootState) => state.enroll)
    const { courses } = useSelector((state: RootState) => state.courses)
    const inProgressCourses  = useSelector(selectInProgressCourses)
    const completedCousrces  = useSelector(selectCompletedCourses)


    useEffect(() => {
        if(!enrollments)
        dispatch(getEnrolledCourse())
        if (!courses) {
            dispatch(fetchCourses())
        }
    }, [dispatch, courses])

    const hadelBtnClick = (select: string) => {
        setSelectedTab(select)
    }

const listData = selectedTab === Strings.in_progress ? inProgressCourses : completedCousrces;
    if (loading) {
        return <ActivityIndicator size={'large'} style={styles.indicatorStyle} />
    }

    if (error) {
        console.log("error is " + error)
        return <Text style={styles.errorStyle}>{error}</Text>
    }

    return (
        <CommomBackGround>
            <ComnonHeader title={Strings.my_learning} />
            <View style={styles.rowContainer}>
                <Pressable style={[styles.tabButton, selectedTab === Strings.in_progress && styles.seletedView]} onPress={() => { hadelBtnClick(Strings.in_progress) }}>
                    <Text style={[styles.rowText, selectedTab === Strings.in_progress && { color: Colors.primary }]}>{Strings.in_progress}</Text>
                </Pressable>
                <Pressable style={[styles.tabButton, selectedTab === Strings.completed && styles.seletedView]} onPress={() => { hadelBtnClick(Strings.completed) }}>
                    <Text style={[styles.rowText, selectedTab === Strings.completed && { color: Colors.primary }]}>{Strings.completed}</Text>
                </Pressable>
            </View>
            <FlatList
                data={listData}
                keyExtractor={(item, index) => `${item.id}${index}`}
                renderItem={({ item }) => (
                    <ContinueLearningCard continueLearning={{ title: item.title, progress: item.progress, thumbnail: item.thumbnail,isCompleted :(item.progress === 100) }} 
                    onPress={()=>{
                        navigation.navigate('LessonPlayer', {
                            courseId : item.courseCode,
                            lessonId : "lesson_001"
                        })
                    }}
                    />
                )}
            />
        </CommomBackGround>
    )
}

export default MyLearnings

