import {
    ActivityIndicator,
    StyleSheet,
    Text,
    FlatList
} from 'react-native';
import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store';
import { fetchTranscript } from '../../redux/thunk/transcriptThunk';
import TranscriptCard from '../../components/TranscriptCard';

type TranscriptProps = {
    vidoeUrl: string;
    seekonPress: (seek: number) => void;
    currentTimeStamp: number;
};

const TranscriptView = ({
    vidoeUrl,
    seekonPress,
    currentTimeStamp,
}: TranscriptProps) => {
    const dispatch = useDispatch<AppDispatch>();

    const { loading, transcript, error } = useSelector(
        (state: RootState) => state.transcript,
    );

    const flatListRef = useRef<FlatList>(null);

    // Remember the last scrolled index
    const previousIndexRef = useRef(-1);

    useEffect(() => {
        dispatch(
            fetchTranscript({
                videoUrl: vidoeUrl,
            }),
        );
    }, [vidoeUrl, dispatch]);

    /**
     * Auto Scroll
     */
    useEffect(() => {
        if (!transcript?.transcript?.length) {
            return;
        }

        const activeIndex = transcript.transcript.findIndex(
            item =>
                currentTimeStamp >= item.start &&
                currentTimeStamp <= item.end,
        );

        if (activeIndex === -1) {
            return;
        }

        // Already scrolled
        if (previousIndexRef.current === activeIndex) {
            return;
        }

        flatListRef.current?.scrollToIndex({
            index: activeIndex,
            animated: true,
            viewPosition: 0.5,
        });

        previousIndexRef.current = activeIndex;
    }, [currentTimeStamp, transcript]);

    if (loading) {
        return (
            <ActivityIndicator
                size="large"
                style={styles.indicatorStyle}
            />
        );
    }

    if (error) {
        console.log('error is ' + error);
        return <Text style={styles.errorStyle}>{error}</Text>;
    }

    return (
        <FlatList
            ref={flatListRef}
            data={transcript?.transcript}
            keyExtractor={(item) => item.start + "" + item.end}
            renderItem={({ item }) => (
                <TranscriptCard
                    time={item.start}
                    text={item.text}
                    onClick={seekonPress}
                    isActive={
                        currentTimeStamp >= item.start &&
                        currentTimeStamp <= item.end
                    }
                />
            )}
            onScrollToIndexFailed={(info) => {
                setTimeout(() => {
                    flatListRef.current?.scrollToIndex({
                        index: info.index,
                        animated: true,
                        viewPosition: 0.5,
                    });
                }, 300);
            }}
        />
    );
};

export default TranscriptView;

const styles = StyleSheet.create({
    indicatorStyle: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    errorStyle: {
        fontSize: 20,
        color: 'red',
    },
});