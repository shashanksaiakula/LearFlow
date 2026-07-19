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
  useEffect(() => {
    dispatch(fetchLesson({ cousreId: courseId, lessonId: lessonID }))
  }, [dispatch, lessonID, courseId])

  const seekPress = useCallback((seek: number) => {
    videoRef.current?.seek(seek + 1)
  }, [])

  if (loading) {
    return <ActivityIndicator size={'large'} style={styles.indicatorStyle} />
  }

  if (error) {
    console.log("error is " + error)
    return <Text style={styles.errorStyle}>{error}</Text>
  }

  // console.log("vidoeplayer is "+ lesson?.videoType)
  return (
    <View style={styles.container}>
      <Text style={styles.WelcomeStyle}> {lesson?.title}</Text>
      {lesson && <LessonVideoPlayer lesson={lesson} videoRef={videoRef ?? null} onProgress={setCurrentSec} paused={isPaused} />}
      <LessonTab selectedTab={selectTab} onTabChange={setSelectTab} />

      {selectTab === 'video-list' && (
        <LessonList courseId={courseId} onClick={setLessonID} lessonId={lessonID} />
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
          }}
          lessonId ={ lessonId }
          courseId = { courseId }
        />
      )}

      {selectTab === 'transcript' && (
        <TranscriptView vidoeUrl={lesson?.videoLink} seekonPress={seekPress}
          currentTimeStamp={currentSec}
        />
      )}
    </View>
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
  },
  indicatorStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  WelcomeStyle: {
    width: "100%",
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    padding: 22,
    elevation: 3,
    backgroundColor: "#fff",

  }
})