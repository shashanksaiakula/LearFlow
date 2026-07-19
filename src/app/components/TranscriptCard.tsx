import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { memo } from 'react'
import { formatTime } from '../utils/timeUtils'

type transcriptCardProps={
    time : string
    text : string
    onClick : (seek: number)=> void,
    isActive : boolean
}

const TranscriptCard = memo(({time, text, onClick, isActive = false} : transcriptCardProps) => {
  const timeStamp = formatTime(parseInt(time))

  return (
    <TouchableOpacity style={[styles.card, isActive &&  {backgroundColor: "#E3F2FD"}]}  onPress={() => onClick(parseInt(time))}>
      <Text style={styles.timeStyle}>{timeStamp}</Text>
      {/* Wrapped in a View with flex: 1 to constrain horizontal expansion */}
      <View style={styles.textContainer}>
        <Text style={styles.textStyle}>{text}</Text>
      </View>
    </TouchableOpacity>
  )
},
//  (prevProps, nextProps) => {
//     console.log("COMPARE:", prevProps.text);

//     console.log({
//       sameTime: prevProps.time === nextProps.time,
//       sameText: prevProps.text === nextProps.text,
//       sameActive: prevProps.isActive === nextProps.isActive,
//       sameClick: prevProps.onClick === nextProps.onClick,
//     });

//     return (
//       prevProps.time === nextProps.time &&
//       prevProps.text === nextProps.text &&
//       prevProps.isActive === nextProps.isActive &&
//       prevProps.onClick === nextProps.onClick
//     );
//   }
)

export default TranscriptCard

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
