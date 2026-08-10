import React, { useCallback, useState } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import Video, { OnProgressData, VideoRef } from 'react-native-video';
import { Lesson } from '../../models/Lesson';
import { BASE_URL } from '../../api/apiClinet';

interface LessonVideoPlayerProps {
  lesson: Lesson;
  videoRef: VideoRef;
  onProgress: (currentTimeStamp: number) => void;
  paused: boolean;
}

const LessonVideoPlayer = ({
  lesson,
  videoRef,
  onProgress,
  paused,
}: LessonVideoPlayerProps) => {

  const [isBuffering, setIsBuffering] =
    useState(false);

  // const progress = useCallback((progress :OnProgressData) =>{
  //   onProgress(progress.currentTime);
  // },[onProgress])

  return (
    <View style={styles.videoContainer}>
      <Video
        source={{
          uri: `${BASE_URL}${lesson.videoUrl}`,
        }}
        ref={videoRef}
        style={styles.video}
        controls={true}
        paused={false}
        resizeMode="contain"
        onLoadStart={() => {
          setIsBuffering(true);
        }}
        onLoad={() => {
          setIsBuffering(false);
        }}
        onBuffer={({ isBuffering }) => {
          setIsBuffering(isBuffering);
        }}
        onError={error => {
          console.log('VIDEO ERROR', error);
        }}
        onProgress={(progress) => {
          onProgress(progress.currentTime);
        }}
         paused={paused} 
         
         />

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
  },
});