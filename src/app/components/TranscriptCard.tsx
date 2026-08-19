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
  isActive: boolean;
};

const TranscriptCard = memo(
  ({
    time,
    text,
    onClick,
    isActive = false,
  }: TranscriptCardProps) => {

    const timeStamp = formatTime(parseInt(time));

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
        onPress={() => onClick(parseInt(time))}
      >

        <View style={styles.timeStampStyle}>
          <Text style={styles.timeStyle}>
            {timeStamp}
          </Text>
        </View>

        <View style={styles.textContainer}>
          <Text
            style={styles.textStyle}
            selectable={true}
            onLongPress={() => {
              onClick(parseInt(time))
            }}
          >
            {text}
          </Text>
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
  },

  textStyle: {
    ...Typography.body1,
    marginTop: Spacing.xs,
  },

  timeStampStyle: {
    justifyContent: 'flex-start',
  },
});