import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { memo } from 'react'
import { formatTime } from '../utils/timeUtils'
import { Typography } from '../theme/typography'
import { Colors } from '../theme/colors'
import { Spacing } from '../theme/spacing'

type transcriptCardProps={
    time : string
    text : string
    onClick : (seek: number)=> void,
    isActive : boolean
}

const TranscriptCard = memo(({time, text, onClick, isActive = false} : transcriptCardProps) => {
  const timeStamp = formatTime(parseInt(time))

  return (
    <TouchableOpacity style={[styles.card, isActive && { borderLeftColor: Colors.primary, borderLeftWidth: 5, backgroundColor : Colors.primaryLight3}]}  onPress={() => onClick(parseInt(time))}>
      <View style={styles.timeStampStyle}> 
      <Text style={styles.timeStyle}>{timeStamp}</Text>
      </View>
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
    flexDirection: 'row',
  },
  timeStyle: {
    ...Typography.caption,
    backgroundColor: Colors.primaryLight1,
    marginRight: Spacing.sm,
    padding: Spacing.xs,
    fontWeight: 600,
    borderRadius: 10,
  },
  textContainer: {
    flex: 1, // Crucial: Absorbs remaining horizontal space and forces text wrapping
  },
  textStyle: {
    ...Typography.body1,
    marginTop: Spacing.xs
  },timeStampStyle:{
    justifyContent : 'flex-start',
  }
})
