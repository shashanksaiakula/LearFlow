import React, { useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import YoutubePlayer from 'react-native-youtube-iframe';
import Video from 'react-native-video';
import { Lesson } from '../../models/Lesson';
import { getYoutubeVideoId } from '../../utils/youtubeUtils';

interface LessonVideoPlayerProps {
    lesson: Lesson;
}

const LessonVideoPlayer = ({
    lesson,
}: LessonVideoPlayerProps) => {

  const [isBuffering, setIsBuffering] =
  useState(false);

  console.log('video is ', lesson.videoLink);

  return (
    <View style={styles.videoContainer}>
  <Video
    source={{
      uri: lesson.videoLink,
    }}
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