import { ActivityIndicator, Button, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
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


type LessonPlayerScreenProps = RouteProp<RootStackParamList, "LessonPlayer">

type LessonplayerNaigationProps = StackNavigationProp<RootStackParamList, "LessonPlayer">

type Props = {
    route : LessonPlayerScreenProps
    navigation : LessonplayerNaigationProps
}

const LessonPlayerScreen = ({route , navigation} : Props) => {
    const { lessonId, courseId } = route.params
    const dispatch = useDispatch<AppDispatch>()
    const {loading, lesson, error} = useSelector((state : RootState) => state.lesson)
    const [selectTab, setSelectTab] = useState<LessonTabType>("video-list")
   const videoRef = useRef<VideoRef>(null);
   const [currentSec, setCurrentSec] = useState(0)
    useEffect(() =>{
      dispatch(fetchLesson({cousreId : courseId, lessonId :lessonId}))
    },[dispatch, lessonId,courseId])

     if (loading) {
        return <ActivityIndicator size={'large'} style={styles.indicatorStyle} />
      }
    
      if (error) {
        console.log("error is "+ error)
        return <Text style={styles.errorStyle}>{error}</Text>
      }

      // console.log("vidoeplayer is "+ lesson?.videoType)
  return (
   <View style = {styles.container}>
        <Text style={styles.WelcomeStyle}> {lesson?.title}</Text>
        {lesson && <LessonVideoPlayer lesson={lesson} videoRef={videoRef?? null} onProgress={setCurrentSec}/>}      
      <LessonTab selectedTab={selectTab} onTabChange={setSelectTab} />
      {selectTab === 'video-list' && (
  <Text>Lessons View</Text>
)}

{selectTab === 'notes' && (
  <Text>Notes View</Text>
)}

{selectTab === 'transcript' && (
  <TranscriptView vidoeUrl={lesson?.videoLink} seekonPress={(seek)=>{
    videoRef.current?.seek(seek)
  }}
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