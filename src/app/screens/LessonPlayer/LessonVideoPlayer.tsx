import React, {  useState } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import Video,{ VideoRef }  from 'react-native-video';
import { Lesson } from '../../models/Lesson';

interface LessonVideoPlayerProps {
    lesson: Lesson;
    videoRef : VideoRef
    onProgress : (currentTimeStamp : number) => void
}

const LessonVideoPlayer = ({
    lesson,
    videoRef,
    onProgress
}: LessonVideoPlayerProps) => {

  const [isBuffering, setIsBuffering] =
  useState(false);

  return (
    <View style={styles.videoContainer}>
  <Video
    source={{
      uri: lesson.videoLink,
    }}
    ref={videoRef}
    style={styles.video}
    controls= {false}
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