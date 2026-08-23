import { ActivityIndicator, ScrollView, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import TranscriptCard from '../../components/TranscriptCard';
import useTranscript from '../../hooks/useTranscript';
import NoteModal from '../../components/notebottommodal/NoteModal';
import { Strings } from '../../strings/String';
import { formatTime } from '../../utils/timeUtils';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../redux/store';
import { getNotes, postNotes } from '../../redux/thunk/notesThunk';

type TranscriptProps = {
  vidoeUrl: string;
  seekonPress: (seek: number) => void;
  currentTimeStamp: number;
  playResumeAction: (isPLay: boolean) => void,
  lessonId: string,
  courseId: string
};

export const TranscriptView = ({
  vidoeUrl,
  seekonPress,
  currentTimeStamp,
  playResumeAction,
  lessonId,
  courseId
}: TranscriptProps) => {
  // Discard 'activeIndex' from the hook as it is sending the wrong index
  const { loading, transcript, error } = useTranscript(vidoeUrl, currentTimeStamp);

  const scrollViewRef = useRef<ScrollView>(null);
  const previousIndexRef = useRef<number>(-1);
  const itemLayoutsRef = useRef<{ [key: number]: number }>({});
  const dispatch = useDispatch<AppDispatch>()

  const [definition, setDefinition] = useState('');
  const [word, setWord] = useState('');
  const [selectedWord, setSelectedWord] = useState<string | null>(null);
  const [isShowModal, setIsShowModal] = useState(false)
  const [timeStamp, setTimeStamp] = useState(0)
  // 1. Locally calculate the absolute correct active index based on timestamps
  const transcriptList = transcript?.transcript || [];
  const localActiveIndex = transcriptList.findIndex(
    item => currentTimeStamp >= Number(item.start) && currentTimeStamp <= Number(item.end)
  );

  async function handleSaveNote() {
    setWord("")
    setDefinition("")
    playResumeAction(false)
    setIsShowModal(false)
    setSelectedWord(null)
    await dispatch(postNotes({ courseCode: courseId, lessonCode: lessonId, selectedText: word, timestamp: timeStamp, note: definition })).unwrap()
    // }
    dispatch(getNotes({ courseCode: courseId, lessonCode: lessonId }))
  }

  function handelCancel() {
    setWord("")
    setDefinition("")
    setIsShowModal(false)
    playResumeAction(false)
    setSelectedWord(null)
    // setActiveCardId(null)
  }

  const openNoteModal = (selectedText: string, selectedTimeStamp = currentTimeStamp) => {
    const cleanedText = selectedText.trim();

    if (!cleanedText) {
      return;
    }

    setSelectedWord(cleanedText);
    setWord(cleanedText);
    setTimeStamp(selectedTimeStamp);
    setDefinition('Loading definition...');
    setIsShowModal(true);
  };

  const fetchMeaning = async (text: string) => {
    const selectedText = text.trim().replace(/(\w+)[.?]/g, '$1');
    if (!selectedText) {
      return;
    }

    openNoteModal(selectedText);

    try {
      const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${selectedText}`);
      const data = await response.json();
      const meaning = data?.[0]?.meanings?.[0]?.definitions?.[0]?.definition;

      if (meaning) {
        setDefinition(meaning);
      } else {
        setDefinition('No definition found.');
      }
    } catch (error) {
      setDefinition('Error fetching data.');
    }
  };

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
    <View>
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
                onClick={(seek) => {
                  console.log("seek us , ", seek)
                  seekonPress(seek)
                  setTimeStamp(seek)
                  playResumeAction(true)
                }}
                onLongPress={(selectedText, seek) => {
                  seekonPress(seek)
                  setTimeStamp(seek)
                  playResumeAction(true)
                  openNoteModal(selectedText, seek);
                  fetchMeaning(selectedText);
                }}
                isActive={isCurrentlyActive}
                selectedWord={selectedWord}
              />
            </View>
          );
        })}
      </ScrollView>
      <NoteModal
        cancelBtnAction={() => { handelCancel() }}
        saveBtnAction={() => handleSaveNote()}
        showModel={isShowModal}
        timeStamp={formatTime(timeStamp)}
        note={definition}
        onChangeValue={setDefinition}
        title={word || 'Note'}
      />
    </View>
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
