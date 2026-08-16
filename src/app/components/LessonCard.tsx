import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { Lesson } from '../models/Lesson'
import { Typography } from '../theme/typography'
import { Spacing } from '../theme/spacing'
import CommonIconWithLoder from './CommonIconWithLoder'
import { Colors } from '../theme/colors'
import Divider from './Divider/Divider'


interface LessonProps {
    lesson: Lesson,
    isActive: boolean
    onClick: () => void,
    index: number,
    currentLesson : string,
    completedList : string[],
    lastLessonPlayed : string
}

const LessonCard = ({ lesson, onClick, isActive, index, currentLesson,completedList,lastLessonPlayed }: LessonProps) => {
    const [isExpanded, setIsExpanded] = useState(false)
    //  const CompletedIndex = parseInt(currentLesson.slice(-1))
    
    function handleclickCard(){
        if(completedList.includes(lesson.lessonCode) || lastLessonPlayed === lesson.courseCode) {
            onClick()
        } else{
            console.log("plase complete older lesson to watch this")
        }
    }

    return (
        <TouchableOpacity onPress={handleclickCard} style={[styles.card, isActive && { backgroundColor: "#E3F2FD" }, 
        currentLesson=== lesson.lessonCode && { borderLeftColor: Colors.primary, borderLeftWidth: 5} ]}>
            <View style={styles.mainContainer}>
                <View style={styles.indexView}>
                    <Text style={styles.index}>{index}</Text>
                </View>
                <View style={styles.rapContent}>
                    <Text style={styles.lesstonTitleStyle} numberOfLines={2} ellipsizeMode="tail"  >{lesson.title}</Text>
                </View>
                <View >
                    <View style={{ justifyContent: 'center', flex: 1 }}>
                        { completedList.includes(lesson.lessonCode)? 
                        <CommonIconWithLoder icon='check-circle-outline' loding={false} size={18} color={Colors.success} isBackground={false} />
                        :
                        <CommonIconWithLoder icon='lock' loding={false} size={18} isBackground={false} color={Colors.iconsColor} />}
                    </View>
                </View>
                <View>
                    <Text style={{ paddingHorizontal: 2 }}>{lesson.duration}</Text>
                </View>
                <View>
                    <CommonIconWithLoder loding={false} icon="chevron-down" onPress={() => { setIsExpanded(!isExpanded) }} />
                </View>
            </View>
            {(isExpanded) && <View>
                <Divider />
                <Text style={styles.description}>{lesson.description}</Text>
            </View>}
        </TouchableOpacity>
    )
}

export default LessonCard

const styles = StyleSheet.create({
    card: {
        padding: 16,
        elevation: 4,
        borderRadius: 10,
        backgroundColor: Colors.white,
        margin: 5,
    },
    lessonTitel: {
        flexDirection: "row"
    },
    lesstonTitleStyle: {
        ...Typography.body1,

    },
    lesstonIdStyle: {

    }, mainContainer: {
        flexDirection: "row",
        justifyContent: 'space-between'
    }, rapContent: {
        flex: 1,
    }, indexView: {
        marginRight: Spacing.xs,
        justifyContent: 'center'

    }, index: {
        ...Typography.h3,
        fontWeight: "bold",
        textAlign: 'center',
        color: Colors.primaryLight2
    },
    thumbnail: {
        width: 90,
        height: 90,
        resizeMode: 'stretch',
        borderRadius: 10
    }, description: {

        color: Colors.iconsColor
    }
    // timeStyle: {
    //     ...Typography.caption
    // }
})