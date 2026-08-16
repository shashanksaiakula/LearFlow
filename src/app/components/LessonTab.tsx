import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Colors } from '../theme/colors';

export type LessonTabType =
  | 'notes'
  | 'transcript'
  | 'video-list';

interface LessonProps {
  selectedTab: string | null; 
  onTabChange: (selectedTab: LessonTabType) => void;
}

const LessonTab = ({ selectedTab, onTabChange }: LessonProps) => {
  return (
    <View style={styles.container}>
    
      <TouchableOpacity 
        onPress={() => onTabChange("video-list")} 
        style={[styles.TextStyle, selectedTab === "video-list" && styles.selectedStyle]}
      >
        <Text style={styles.TextLabelStyle}>Lessons</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        onPress={() => onTabChange("notes")}
        style={[styles.TextStyle, selectedTab === "notes" && styles.selectedStyle]}
      >
        <Text style={styles.TextLabelStyle}>Notes</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        onPress={() => onTabChange("transcript")}
        style={[styles.TextStyle, selectedTab === "transcript" && styles.selectedStyle]}
      >
        <Text style={styles.TextLabelStyle}>Transcript</Text>
      </TouchableOpacity>
    </View>
  )
}

export default LessonTab

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    width: "100%",
    marginVertical: 10,
    justifyContent: 'space-between',
    borderRadius: 8,
    paddingHorizontal: 10,
    borderBottomWidth : 2,
    borderBottomColor : Colors.disabled
  },
  selectedStyle: {
    borderBottomWidth: 3,
    borderBottomColor: Colors.primary
  },
  TextStyle: {
    padding: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  TextLabelStyle: {
    fontSize: 18,
    fontWeight: 'bold',
  }
})
