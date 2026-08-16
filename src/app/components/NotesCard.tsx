import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { formatTime, formatToLocalTime, parseTimeToSeconds } from '../utils/timeUtils'
import CommonIconWithLoder from './CommonIconWithLoder'
import { Colors } from '../theme/colors'
import { Spacing } from '../theme/spacing'
import { Typography } from '../theme/typography'

type NotesProps = {
  timeStamp: string
  text: string
  onClick: (seek: number) => void,
  isSelected: boolean
  onSelectActive: () => void
  editClickHandel?: () => void
  deleteClickHandel?: () => void
  isLodingDelete?: boolean
  isLodingEdit?: boolean,
  date: string
}


const NotesCard = ({ timeStamp, onClick, text, onSelectActive, isSelected, editClickHandel, deleteClickHandel, isLodingDelete, isLodingEdit, date }: NotesProps) => {
  return (
    <TouchableOpacity style={[styles.card, isSelected && { borderLeftColor: Colors.primary, borderLeftWidth: 5, }]} onPress={() => onClick(parseTimeToSeconds(timeStamp))}

      onLongPress={onSelectActive}
    >
      <View style={styles.timeStampStyle}>
        <Text style={styles.timeStyle}>{formatTime(parseInt(timeStamp))}</Text>
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.textStyle}>{text}</Text>
        <Text style={styles.dateStyle}>{formatToLocalTime(date)}</Text>
      </View>
      {isSelected && <View style={styles.icons}>
        <View style={{ justifyContent: 'center', flexDirection: 'row', alignItems: 'center' }}>
          <CommonIconWithLoder icon='pencil-outline' loding={isLodingEdit ?? false} onPress={editClickHandel} size={28} />
          <CommonIconWithLoder icon='trash-can-outline' loding={isLodingDelete ?? false} onPress={deleteClickHandel} size={28} />
        </View>
      </View>
      }
    </TouchableOpacity>
  )
}

export default NotesCard

const styles = StyleSheet.create({
  card: {
    paddingHorizontal: 16,
    paddingVertical: 10, // Added to balance vertical padding evenly
    elevation: 4,
    borderRadius: 10,
    backgroundColor: "#FFF",
    margin: 5,
    flexDirection: 'row',
  },
  timeStyle: {
    ...Typography.caption,
    backgroundColor: Colors.primaryLight1,
    marginRight: Spacing.sm,
    padding: Spacing.xs,
    fontWeight: 600,
    borderRadius: 10,
    textAlign: 'right'
  },
  textContainer: {
    flex: 1, // Crucial: Absorbs remaining horizontal space and forces text wrapping
  },
  textStyle: {
    ...Typography.body1
  }, icons: {
    justifyContent: 'flex-end',
    flexDirection: 'row'
  },
  dateStyle: {
    ...Typography.caption,
    fontWeight: '300',
    textAlign: 'right'
  }, timeStampStyle: {
    justifyContent: 'flex-start',
  },
})