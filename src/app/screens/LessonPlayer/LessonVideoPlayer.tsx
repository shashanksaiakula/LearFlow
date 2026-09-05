import React, { useCallback, useState } from 'react';
import { ActivityIndicator, BackHandler, Platform, StyleSheet, View } from 'react-native';
import Video, { OnProgressData, VideoRef } from 'react-native-video';
import { Lesson } from '../../models/Lesson';
import { BASE_URL } from '../../api/apiClinet';
import CommonIconWithLoder from '../../components/CommonIconWithLoder';
import { Colors } from '../../theme/colors';
import { Spacing } from '../../theme/spacing';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { AppDispatch, RootState, useAppDispatch } from '../../redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { getEnrolledCourse, updateEnrollmentThunk } from '../../redux/thunk/enrollThunk';


interface LessonVideoPlayerProps {
  lesson: Lesson;
  videoRef: VideoRef;
  onProgress: (currentTimeStamp: number) => void;
  paused: boolean;
  initialPosition?: number,
  onLessonComplete: (nextLesson: string) => void,
  lessons: Lesson[],
  enrolledId: string,
  progress: number,
  isBackPressed: (isPressed: Boolean) => void,
  onSeekComplete?: () => void   // called when iOS finishes seeking, so parent can unpause
}


const LessonVideoPlayer = ({
  lesson,
  videoRef,
  onProgress,
  paused,
  initialPosition = 0,
  onLessonComplete,
  lessons,
  enrolledId,
  progress,
  isBackPressed,
  onSeekComplete
}: LessonVideoPlayerProps) => {

  console.log("is lesson is update ", lesson.lessonCode)
  const [isBuffering, setIsBuffering] =
    useState(false);
  const [currentSec, setCurrentSec] = useState<number>(0);
  const [isSeeking, setIsSeeking] = useState(false);

  // const progress = useCallback((progress :OnProgressData) =>{
  //   onProgress(progress.currentTime);
  // },[onProgress])

  const navigation = useNavigation()
  const dispatch = useDispatch<AppDispatch>()
  const nextLesson = lessons?.find(getLesson => getLesson.order === lesson.order + 1)

  useFocusEffect(
    useCallback(() => {
      const onHardwareBackPress = async () => {
        isBackPressed(true)
        await dispatch(
          updateEnrollmentThunk({
            id: enrolledId,
            currentLessonCode: lesson.lessonCode,
            currentLessonPosition: currentSec,
            progress: progress,

          })
        ).unwrap()

        await dispatch(getEnrolledCourse()).unwrap()
        // 2. Pop the screen to navigate back
        navigation.pop();

        // 3. Return true to tell React Native we handled the back action manually
        return true;
      };

      // Add the hardware back button event listener
      BackHandler.addEventListener('hardwareBackPress', onHardwareBackPress);

      // Clean up the event listener when leaving this screen
      // return () => {
      //   BackHandler.removeEventListener('hardwareBackPress', onHardwareBackPress);
      // };
    }, [dispatch, enrolledId, lesson?.lessonCode, currentSec, navigation])
  );

  return (
    <View style={styles.videoContainer}>
      <Video
        source={{
          uri: `${BASE_URL}${lesson.videoUrl}`,
        }}
        ref={videoRef}
        style={styles.video}
        controls={true}
        paused={paused || isSeeking}
        resizeMode="contain"
        onLoadStart={() => {
          setIsBuffering(true);
        }}
        onLoad={() => {
          if (initialPosition > 0) {
            if (Platform.OS === 'ios') {
              // On iOS, seeking inside onLoad stalls playback.
              // Set isSeeking=true so we temporarily pause, seek, then resume in onSeek.
              setIsSeeking(true);
            }
            videoRef.current?.seek(initialPosition);
          }
          setIsBuffering(false);
        }}
        onSeek={() => {
          // Called when any seek completes on iOS.
          // Clear isSeeking (initial-load seek) and notify parent (transcript/notes seeks).
          if (isSeeking) {
            setIsSeeking(false);
          }
          onSeekComplete?.();
        }}
        onBuffer={({ isBuffering }) => {
          setIsBuffering(isBuffering);
        }}
        onError={error => {
          console.log('VIDEO ERROR', error);
        }}
        onProgress={(progress) => {
          setCurrentSec(progress.currentTime)
          onProgress(progress.currentTime);
        }}
        //  paused={paused} 
        onEnd={async () => {
          setCurrentSec(0)


          const progress = Math.round((lesson.order / lessons.length) * 100)
          if (nextLesson === undefined) {
            return
          }
          await dispatch(updateEnrollmentThunk({
            id: enrolledId, currentLessonCode: nextLesson.lessonCode, currentLessonPosition: 0, progress: progress,
            completedLessonCode: lesson.lessonCode,
            lastPlayedLessonCode: nextLesson?.lessonCode,
            lastPlayedLessonPosition: 0
          })).unwrap()
          await dispatch(getEnrolledCourse()).unwrap()
          setCurrentSec(0)
          onLessonComplete(nextLesson.lessonCode)

        }}
      />
      <View style={styles.backArrow}>
        <CommonIconWithLoder icon="arrow-left" loding={false} isBackground={false} color={Colors.white} size={26} onPress={async () => {
          isBackPressed(true)
          console.log("cousre porgress ", progress)
          await dispatch(updateEnrollmentThunk({ id: enrolledId, currentLessonCode: lesson.lessonCode, currentLessonPosition: currentSec, progress: progress })).unwrap()
          await dispatch(getEnrolledCourse()).unwrap()
          setCurrentSec(0)
          navigation.pop()
        }} />
      </View>
      {isBuffering && (
        <View style={styles.loader}>
          <ActivityIndicator
            size="large"
          />
        </View>
      )}
    </View>
  );
};

export default LessonVideoPlayer;

const styles = StyleSheet.create({
  playerContainer: {
    width: '100%',
    backgroundColor: '#000',
  },

  video: {
    width: '100%',
    height: 220,
    backgroundColor: '#000',
  },

  errorContainer: {
    height: 220,
    justifyContent: 'center',
    alignItems: 'center',
  },
  videoContainer: {
    width: '100%',
    height: 220,
    backgroundColor: 'red',
  },
  loader: {
    ...StyleSheet.absoluteFill,
    justifyContent: 'center',
    alignItems: 'center',
  }, backArrow: {
    justifyContent: 'flex-start',
    overflow: 'hidden',
    position: 'absolute',
    margin: Spacing.xxs
  }
});