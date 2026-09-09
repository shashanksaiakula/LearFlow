import { ActivityIndicator, Button, Platform, StyleSheet, Text, View } from 'react-native'
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
import { fetchLessonsByCourse } from '../../redux/thunk/coursesThunk';


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
  const { loading: lessonLoading, lesson, error } = useSelector((state: RootState) => state.lesson)
  const [selectTab, setSelectTab] = useState<LessonTabType>("video-list")
  const videoRef = useRef<VideoRef>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [currentSec, setCurrentSec] = useState(0)
  const { lessons, loading: coursesLoading } = useSelector((state: RootState) => state.courses)
  const { user } = useSelector((state: RootState) => state.auth)
  const { enrollments, enrolled } = useSelector((state: RootState) => state.enroll)
  const [loder, setLoder] = useState(false)
  const [resumePosition, setResumePosition] = useState(
    route.params.currentLessonPosition ?? 0
  );

  useEffect(() => {
    // If lessons hasn't loaded yet, or it's empty, fetch the course lessons list
    if (courseId && (!lessons || !lessons.data)) {
      dispatch(fetchLessonsByCourse({ courseCode: courseId }));
    }
  }, [dispatch, courseId, lessons]);

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
    console.log("seek for trnc ", seek)
    // if (Platform.OS === 'ios') {
    //   // On iOS: pause → seek → onSeekComplete will unpause
    //   setIsPaused(true);
    // } else {
    //   setIsPaused(false);
    // }
    //  setIsPaused(false)
    videoRef.current?.seek(seek + 1)
  }, [])

  const enrolledId = enrollments?.filter(enroll => enroll.userId === user?._id)
    .find(course => (course.courseCode === courseId))
  console.log("enrolledis is 1 ", enrolledId?.lastPlayedLessonCode)
  if (lessonLoading || coursesLoading || !lessons || !lessons.data || !lesson) {
    return <ActivityIndicator size={'large'} style={styles.indicatorStyle} />
  }

  console.log("lesson screen is ", lesson?.title)

  if (error) {
    console.log("error is " + error)
    return <Text style={styles.errorStyle}>{error}</Text>
  }

  function handleLessoChages(
    lessonChangedId: string,
    lastPlayedCode?: string,
    lastPlayedPosition?: number
  ) {
    console.log("Clicked lesson:", lessonChangedId);
    console.log("Current server last played code:", lastPlayedCode);

    // Compare using the fresh arguments passed from the click event
    if (lastPlayedCode && lessonChangedId === lastPlayedCode) {
      setResumePosition(lastPlayedPosition ?? 0);
    } else {
      setResumePosition(0);
    }

    setLessonID(lessonChangedId);
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
            isBackPressed={setLoder}
            onSeekComplete={() => {
              // iOS: seek is done, now start playing
              setIsPaused(false)
            }}
          />}
        <LessonTab selectedTab={selectTab} onTabChange={setSelectTab} />

        {selectTab === 'video-list' && (
          <LessonList
            enrolledId={enrolledId?._id}
            onClick={(id) => handleLessoChages(id, enrolledId?.lastPlayedLessonCode, enrolledId?.lastPlayedLessonPosition)}
            lessonId={lessonID}
            lessons={lessons}
            completedList={enrolledId?.completedLessonCode}
            lastLessonPlayedcode={enrolledId?.lastPlayedLessonCode}
            lastLessonPlayedPosition={enrolledId?.lastPlayedLessonPosition}
            currentVideoSec={currentSec}

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
              if (Platform.OS === 'ios') {
                // On iOS: pause → seek → onSeekComplete will unpause
                setIsPaused(true);
              }
              videoRef.current?.seek(timeStamp)
            }}
            lessonId={lessonID}
            courseId={courseId}
          />
        )}

        {selectTab === 'transcript' && (
          <TranscriptView vidoeUrl={`${BASE_URL}${lesson?.videoUrl}`} seekonPress={seekPress}
            currentTimeStamp={currentSec}
            playResumeAction={(action: boolean) => {
              setIsPaused(action)
            }}
            lessonId={lessonID}
            courseId={courseId}
          />
        )}
      </View>
      {loder && <View style={{
        position: 'absolute',
        top: 10,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <ActivityIndicator size={'large'} />
      </View>}
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