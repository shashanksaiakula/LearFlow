import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { parseTimeToSeconds } from '../utils/timeUtils'

type NotesProps={
    timeStamp : string
    text : string
    onClick : (seek : number) => void
}


const NotesCard = ({timeStamp, onClick, text} : NotesProps) => {
  return (
    <TouchableOpacity style={[styles.card]}  onPress={()=> onClick(parseTimeToSeconds(timeStamp))}>
      <Text style={styles.timeStyle}>{timeStamp}</Text>
      <View style={styles.textContainer}>
        <Text style={styles.textStyle}>{text}</Text>
      </View>
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
    alignItems: 'center', // Aligns timestamp and text vertically in the center
    flexDirection: 'row',
  },
  timeStyle: {
    fontSize: 16,
    fontWeight: 'bold',
    paddingRight: 12, // Increased spacing between time and text
    width: 55, // Fixed width prevents layout shifts with varying time lengths
  },
  textContainer: {
    flex: 1, // Crucial: Absorbs remaining horizontal space and forces text wrapping
  },
  textStyle: {
    fontSize: 14,
    color: '#333',
    // Removed margins that conflict with row layout bounding
  }
})