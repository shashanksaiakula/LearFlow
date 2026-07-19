import { ActivityIndicator, ScrollView, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useRef } from 'react';
import TranscriptCard from '../../components/TranscriptCard';
import useTranscript from '../../hooks/useTranscript';

type TranscriptProps = {
  vidoeUrl: string;
  seekonPress: (seek: number) => void;
  currentTimeStamp: number;
};

export const TranscriptView = ({
  vidoeUrl,
  seekonPress,
  currentTimeStamp,
}: TranscriptProps) => {
  // Discard 'activeIndex' from the hook as it is sending the wrong index
  const { loading, transcript, error } = useTranscript(vidoeUrl, currentTimeStamp);

  const scrollViewRef = useRef<ScrollView>(null);
  const previousIndexRef = useRef<number>(-1);
  const itemLayoutsRef = useRef<{ [key: number]: number }>({});

  // 1. Locally calculate the absolute correct active index based on timestamps
  const transcriptList = transcript?.transcript || [];
  const localActiveIndex = transcriptList.findIndex(
    item => currentTimeStamp >= item.start && currentTimeStamp <= item.end
  );

  useEffect(() => {
    // Guard clauses against empty states
    if (localActiveIndex === -1 || previousIndexRef.current === localActiveIndex) {
      return;
    }

    previousIndexRef.current = localActiveIndex;

    // 2. Fetch the true layout coordinate of the correct card
    const targetY = itemLayoutsRef.current[localActiveIndex];

    if (targetY !== undefined) {
      // Offset by 80px to center it cleanly below the top edge
      const scrollPosition = Math.max(0, targetY - 80);

      scrollViewRef.current?.scrollTo({
        y: scrollPosition,
        animated: true,
      });
    }
  }, [localActiveIndex]); // Re-run whenever the true calculated index changes

  if (loading) {
    return <ActivityIndicator size="large" style={styles.indicatorStyle} />;
  }

  if (error) {
    return <Text style={styles.errorStyle}>{error}</Text>;
  }

  return (
    <ScrollView 
      ref={scrollViewRef} 
      contentContainerStyle={styles.scrollContainer}
    >
      {transcriptList.map((item, index) => {
        // Evaluate active state inline using the exact same rule
        const isCurrentlyActive = index === localActiveIndex;

        return (
          <View
            key={`${item.start}_${item.end}_${index}`}
            onLayout={(event) => {
              itemLayoutsRef.current[index] = event.nativeEvent.layout.y;
            }}
          >
            <TranscriptCard
              time={item.start}
              text={item.text}
              onClick={seekonPress}
              isActive={isCurrentlyActive}
            />
          </View>
        );
      })}
    </ScrollView>
  );
};

export default TranscriptView;

const styles = StyleSheet.create({
  scrollContainer: {
    paddingBottom: 100, // Provides extra space at the bottom to allow last lines to scroll up
  },
  indicatorStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorStyle: {
    fontSize: 20,
    color: 'red',
    textAlign: 'center',
  },
});
