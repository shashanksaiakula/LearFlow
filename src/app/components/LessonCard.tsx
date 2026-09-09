import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { Lesson } from '../models/Lesson'
import { Typography } from '../theme/typography'
import { Spacing } from '../theme/spacing'
import CommonIconWithLoder from './CommonIconWithLoder'
import { Colors } from '../theme/colors'
import Divider from './Divider/Divider'
import { BASE_URL } from '../api/apiClinet'


interface LessonProps {
    lesson: Lesson,
    isActive: boolean
    onClick: () => void,
    index: number,
    currentLesson: string,
    completedList: string[],
    lastLessonPlayed: string,
    currentVideoSec: number,
    lastLessonPlayedPosition?: number
}

const LessonCard = ({ lesson, onClick, isActive, index, currentLesson, completedList, lastLessonPlayed, currentVideoSec, lastLessonPlayedPosition = 0 }: LessonProps) => {
    const [isExpanded, setIsExpanded] = useState(false)
    const isCompleted = completedList?.includes(lesson.lessonCode) ?? false

    const durationParts = lesson.duration?.split(':').map(Number) ?? []
    const durationInSeconds = durationParts.length > 1
        ? durationParts.reduce((total, part) => total * 60 + part, 0)
        : durationParts[0] ?? 0
    const savedPosition = lastLessonPlayed === lesson.lessonCode ? lastLessonPlayedPosition : 0
    const watchedSeconds = Math.max(currentVideoSec, savedPosition)
    const progress = isCompleted
        ? 100
        : isActive && durationInSeconds > 0
            ? Math.min(100, Math.max(0, (watchedSeconds / durationInSeconds) * 100))
            : 0

    const renderLessonIcon = (lessonCode: string) => {
        // 1. If it's the active lesson, show the play icon
        if (completedList?.includes(lessonCode)) {
            return <CommonIconWithLoder icon="check-circle-outline" loading={false} size={18} color={Colors.success} isBackground={false} />;
        }
        if (lesson.order === 1) {
            return <CommonIconWithLoder icon="play-circle-outline" loading={false} size={18} color={Colors.primary} isBackground={false} />;
        }
        if (lastLessonPlayed === lessonCode) {
            return <CommonIconWithLoder icon="play-circle-outline" loading={false} size={18} color={Colors.primary} isBackground={false} />;
        }

        return <CommonIconWithLoder icon="lock" loading={false} size={18} isBackground={false} color={Colors.iconsColor} />;
    };
    return (
        <TouchableOpacity onPress={onClick} activeOpacity={0.85} style={[styles.card, isActive && styles.activeCard,
        currentLesson === lesson.lessonCode && { borderLeftColor: Colors.primary, borderLeftWidth: 5 }]}>
            <View style={styles.mainContainer}>
                <View style={styles.thumbnailWrap}>
                    {lesson.thumbnail ? (
                        <Image
                            source={{ uri: `${BASE_URL}${lesson.thumbnail}` }}
                            style={styles.thumbnail}
                        />
                    ) : (
                        <View style={styles.thumbnailFallback}>
                            <CommonIconWithLoder
                                icon="play-circle-outline"
                                loading={false}
                                size={26}
                                color={Colors.primary}
                                isBackground={false}
                            />
                        </View>
                    )}
                    {/* <View style={styles.indexBadge}>
                        <Text style={styles.index}>{index}</Text>
                    </View> */}
                </View>
                <View style={styles.rapContent}>
                    <Text style={styles.lesstonTitleStyle} numberOfLines={2} ellipsizeMode="tail">{lesson.title}</Text>
                    <View style={styles.progressTrack}>
                        <View style={[styles.progressFill, { width: `${progress}%` }]} />
                    </View>
                    <View style={styles.metaRow}>
                        <Text style={styles.duration}>{lesson.duration}</Text>
                        <View style={styles.statusRow}>
                            {renderLessonIcon(lesson.lessonCode)}
                            <Text style={styles.statusText}>
                                {isCompleted ? '100% completed' : `${Math.round(progress)}% watched`}
                            </Text>
                        </View>
                    </View>
                </View>
                <View style={styles.chevron}>
                    <CommonIconWithLoder
                        loding={false}
                        icon={isExpanded ? "chevron-up" : "chevron-down"}
                        onPress={() => { setIsExpanded(!isExpanded) }}
                    />
                </View>
            </View>
            {(isExpanded) && <View>
                {/* <Divider /> */}
                <Text style={styles.description}>{lesson.description || 'No description available.'}</Text>
            </View>}
        </TouchableOpacity>
    )
}

export default LessonCard

const styles = StyleSheet.create({
    card: {
        padding: 10,
        elevation: 3,
        shadowColor: Colors.black,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 5,
        borderRadius: 14,
        backgroundColor: Colors.white,
        marginHorizontal: 4,
        marginVertical: 5,
        borderWidth: 1,
        borderColor: Colors.border,
    },
    activeCard: {
        backgroundColor: Colors.primaryLight1,
        borderColor: Colors.primary,
    },
    lesstonTitleStyle: {
        ...Typography.body1,

    },
    lesstonIdStyle: {

    }, mainContainer: {
        flexDirection: "row",
        alignItems: 'center',
    }, rapContent: {
        flex: 1,
        paddingHorizontal: Spacing.xs,
    }, indexView: {
        marginRight: Spacing.xs,
        justifyContent: 'center'

    }, index: {
        ...Typography.caption,
        fontWeight: "bold",
        textAlign: 'center',
        color: Colors.white
    },
    thumbnail: {
        width: 86,
        height: 64,
        resizeMode: 'cover',
        borderRadius: 10,
    },
    thumbnailWrap: {
        width: 86,
        height: 64,
        position: 'relative',
    },
    thumbnailFallback: {
        width: 86,
        height: 64,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.primaryLight3,
    },
    indexBadge: {
        position: 'absolute',
        left: 5,
        top: 5,
        minWidth: 22,
        height: 22,
        paddingHorizontal: 5,
        borderRadius: 11,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(15, 23, 42, 0.75)',
    },
    metaRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 7,
    },
    duration: {
        ...Typography.caption,
        color: Colors.textSecondary,
    },
    statusRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: Spacing.sm,
    },
    statusText: {
        ...Typography.caption,
        color: Colors.textSecondary,
        marginLeft: 4,
    },
    chevron: {
        paddingLeft: 2,
    },
    progressTrack: {
        height: 4,
        borderRadius: 2,
        overflow: 'hidden',
        marginTop: 10,
        backgroundColor: Colors.border,
    },
    progressFill: {
        height: '100%',
        borderRadius: 2,
        backgroundColor: Colors.primary,
    },
    description: {
        ...Typography.body2,
        lineHeight: 20,
        paddingTop: Spacing.sm,
        color: Colors.iconsColor
    }
})