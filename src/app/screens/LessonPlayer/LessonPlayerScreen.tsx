import { ActivityIndicator, Button, StyleSheet, Text, View } from 'react-native'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { RootStackParamList } from '../../navigation/types'
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useDispatch, useSelector } from 'react-redux';
import { fetchLesson } from '../../redux/thunk/lessonThunk';
import { AppDispatch, RootState } from '../../redux/store';
import LessonTab, { LessonTabType } from '../../components/LessonTab';
import LessonVideoPlayer from './LessonVideoPlayer';
import TranscriptView from './TranscriptView';
import { VideoRef } from 'react-native-video';
import LessonList from './LessonList';
import NotesView from './NotesView';
import CommomBackGround from '../../components/common/CommomBackGround';
import { BASE_URL } from '../../api/apiClinet';
import { Spacing } from '../../theme/spacing';


type LessonPlayerScreenProps = RouteProp<RootStackParamList, "LessonPlayer">

type LessonplayerNaigationProps = StackNavigationProp<RootStackParamList, "LessonPlayer">

type Props = {
  route: LessonPlayerScreenProps
  navigation: LessonplayerNaigationProps
}

const LessonPlayerScreen = ({ route, navigation }: Props) => {
  const { lessonId, courseId } = route.params
  // const lessonID = useRef(lessonId)
  const [lessonID, setLessonID] = useState(lessonId)
  const dispatch = useDispatch<AppDispatch>()
  const { loading, lesson, error } = useSelector((state: RootState) => state.lesson)
  const [selectTab, setSelectTab] = useState<LessonTabType>("video-list")
  const videoRef = useRef<VideoRef>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [currentSec, setCurrentSec] = useState(0)
  const { lessons } = useSelector((state: RootState) => state.courses)
  const { user } = useSelector((state: RootState) => state.auth)
  const { enrollments, enrolled } = useSelector((state: RootState) => state.enroll)
  const [resumePosition, setResumePosition] = useState(
    route.params.currentLessonPosition ?? 0
  );

  useEffect(() => {
    dispatch(fetchLesson({ cousreId: courseId, lessonId: lessonID }))
  }, [dispatch, lessonID, courseId])

  //   useEffect(() => {
  // if (hasRestoredPosition.current) {
  //     return;
  //   }

  //   const targetPosition = route.params.currentLessonPosition ?? 0;

  //   if (targetPosition > 0 && videoRef.current) {
  //     videoRef.current.seek(targetPosition);
  //     hasRestoredPosition.current = true;
  //   }
  //   }, [route.params.currentLessonPosition]);

  const seekPress = useCallback((seek: number) => {
    videoRef.current?.seek(seek + 1)
  }, [])

  const enrolledId = enrollments?.filter(enroll => enroll.userId === user?._id)
    .find(course => (course.courseCode === courseId))
  console.log("enrolledis is 1 ", enrolledId?.completedLessonCode)
  if (loading) {
    return <ActivityIndicator size={'large'} style={styles.indicatorStyle} />
  }

  console.log("lesson screen is ", lesson?.title)

  if (error) {
    console.log("error is " + error)
    return <Text style={styles.errorStyle}>{error}</Text>
  }



  return (
    <CommomBackGround>
      <View style={styles.container}>
        {/* <ComnonHeader title={lesson?.title} /> */}
        {lesson &&
          <LessonVideoPlayer
            lesson={lesson}
            videoRef={videoRef}
            onProgress={setCurrentSec}
            paused={isPaused}
            lessons={lessons?.data}
            initialPosition={resumePosition}
            onLessonComplete={(lessonid) => {
              setResumePosition(0)
              setLessonID(lessonid)
            }}
            enrolledId={enrolledId?._id}
            progress={enrolled?.progress}
          />}
        <LessonTab selectedTab={selectTab} onTabChange={setSelectTab} />

        {selectTab === 'video-list' && (
          <LessonList
            onClick={setLessonID}
            lessonId={lessonID}
            lessons={lessons}
            completedList={enrolledId?.completedLessonCode}
            LastLessonPlayed={enrolled?.currentLessonCode}
          />
        )}

        {selectTab === 'notes' && (
          <NotesView
            currentTime={currentSec}
            playResumeAction={(action: boolean) => {
              setIsPaused(action)
            }}
            onClick={(timeStamp: number) => {
              console.log(" note", timeStamp)
              videoRef.current?.seek(timeStamp)
              setIsPaused(false)
            }}
            lessonId={lessonID}
            courseId={courseId}
          />
        )}

        {selectTab === 'transcript' && (
          <TranscriptView vidoeUrl={`${BASE_URL}${lesson?.videoUrl}`} seekonPress={seekPress}
            currentTimeStamp={currentSec}
          />
        )}
      </View>
    </CommomBackGround>
  )
}

export default LessonPlayerScreen

const styles = StyleSheet.create({
  errorStyle: {
    fontSize: 20,
    color: "red"
  },
  container: {
    flex: 1,
    marginTop: Spacing.sm,
  },
  indicatorStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})