import { StyleSheet, Text, Pressable, View } from 'react-native';
import React, { memo } from 'react';
import { formatTime } from '../utils/timeUtils';
import { Typography } from '../theme/typography';
import { Colors } from '../theme/colors';
import { Spacing } from '../theme/spacing';

type TranscriptCardProps = {
  time: string;
  text: string;
  onClick: (seek: number) => void;
  onLongPress?: (text: string, seek: number) => void;
  isActive: boolean;
  selectedWord?: string | null;
};

const TranscriptCard = memo(
  ({
    time,
    text,
    onClick,
    onLongPress,
    isActive = false,
    selectedWord = null,
  }: TranscriptCardProps) => {
    const timeStamp = formatTime(parseInt(time, 10));
    const words = text.split(/\s+/).filter(Boolean);

    const seek = parseInt(time, 10);

    return (
      <Pressable
        style={[
          styles.card,
          isActive && {
            borderLeftColor: Colors.primary,
            borderLeftWidth: 5,
            backgroundColor: Colors.primaryLight3,
          },
        ]}
        onPress={() => onClick(seek)}
      >
        <View style={styles.timeStampStyle}>
          <Text style={styles.timeStyle}>
            {timeStamp}
          </Text>
        </View>

        <View style={styles.textContainer}>
          {words.map((word, index) => {
            const isSelected = selectedWord?.toLowerCase() ===
              word.replace(/^[^\p{L}\p{N}]+|[^\p{L}\p{N}]+$/gu, '').toLowerCase();

            return (
              <Pressable
                key={`${word}-${index}-${time}`}
                hitSlop={4}
                onPress={() => onClick(seek)}
                onLongPress={() => {
                  onLongPress?.(word, seek);
                }}
                style={[
                  styles.wordButton,
                  isSelected && styles.selectedWordButton,
                ]}
              >
                <Text
                  style={[
                    styles.textStyle,
                    isSelected && styles.selectedTextStyle,
                  ]}
                >
                  {word}
                </Text>
              </Pressable>
            );
          })}
        </View>

      </Pressable>
    );
  },
);

export default TranscriptCard;

const styles = StyleSheet.create({
  card: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    elevation: 4,
    borderRadius: 10,
    backgroundColor: '#FFF',
    margin: 5,
    flexDirection: 'row',
  },

  timeStyle: {
    ...Typography.caption,
    backgroundColor: Colors.primaryLight1,
    marginRight: Spacing.sm,
    padding: Spacing.xs,
    fontWeight: '600',
    borderRadius: 10,
  },

  textContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
  },

  wordButton: {
    marginRight: 4,
    marginTop: 0,
    marginBottom: 0,
    paddingHorizontal: 1,
    paddingVertical: 0,
    borderRadius: 4,
  },

  selectedWordButton: {
    backgroundColor: Colors.primaryLight1,
    borderRadius: 6,
  },

  textStyle: {
    ...Typography.body1,
    marginTop: 0,
    color: Colors.text,
    lineHeight: 22,
  },

  selectedTextStyle: {
    color: Colors.primary,
    fontWeight: '600',
  },

  timeStampStyle: {
    justifyContent: 'flex-start',
  },
});