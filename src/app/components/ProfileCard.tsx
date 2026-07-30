import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import MaterialCommunityIcons from "@react-native-vector-icons/material-design-icons";
import { Colors } from '../theme/colors';


interface ProfileCardProps {
  onPress?: () => void
  rightIcon: React.ReactNode // Keeps the flexible node type
  titel: string
  subText: string
}

const ProfileCard = ({ onPress, rightIcon, titel, subText }: ProfileCardProps) => {
  return (
    <Pressable onPress={onPress} style={styles.container}>
      <View style={styles.iconStyle}>
      {rightIcon}
      </View> 
      {/* 1. Added layout views to structure your text strings */}
      <View style={styles.textContainer}>
        <Text style={styles.titleStyle}>{titel}</Text>
        <Text style={styles.subTextStyle}>{subText}</Text>
      </View>
      <MaterialCommunityIcons name='chevron-right'  size={22} color={Colors.secondary}/>
    </Pressable>
  )
}

export default ProfileCard

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: 'center', // Centers items vertically in the row
    justifyContent: 'space-between', // Pushes text left and icon right
    padding: 16,
  },
  textContainer: {
    flexDirection: 'column',
    flex: 1, // Ensures text takes up available space
  },
  titleStyle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  subTextStyle: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  iconStyle:{
    paddingRight: 12
  }
})
