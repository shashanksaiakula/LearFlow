import { Image, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Course } from '../models/course'
import { Colors } from '../theme/colors';
import { Typography } from '../theme/typography';
import { Strings } from '../strings/String';
import { BASE_URL } from '../api/apiClinet';
import CommonIconWithLoder from './CommonIconWithLoder';

interface CourseCardProps {
  course: Course;
  onClick: () => void,
  isBoomarked? : boolean,
  bookmarkPressed?: ()=>void,
  isLoding? : boolean
}

export default function CourseCard({ course, onClick, isBoomarked, bookmarkPressed,isLoding }: CourseCardProps) {

  console.log("level is ",course.level)
  let leveColor = ""
  if (course.level === Strings.beginner) {
    leveColor = Colors.success
  } else if (course.level === Strings.intermediate) {
    leveColor = Colors.warning
  } else {
    leveColor = Colors.danger
  }

  return (
    <TouchableOpacity style={styles.container} onPress={onClick}>
      <View>
        <Image source={{ uri: `${BASE_URL}${course.thumbnail}` }}
          style={styles.thumbnail}
        />
      </View>
      <View style={{ flex: 1, }}>
        <Text style={styles.titleStyle}>{course.title}</Text>
        <View style={styles.bottomTextSyle}>
          <Text style={styles.bottomText} >{course.totalLessons} {Strings.lessons}</Text>
          <Text style={[styles.bottomText, { color: leveColor }]}>{course.level}</Text>
        </View>
      </View>
        <CommonIconWithLoder
          icon={isBoomarked ? 'bookmark' :'bookmark-outline'}
          size={28}
          color={isBoomarked ? Colors.primary : Colors.iconsColor}
          loding={isLoding ?? false}
          isBackground = {false}
          onPress={bookmarkPressed}
        />
      </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 10,
    backgroundColor: "#FFF",
    elevation: 3,
    flexDirection: "row",
    justifyContent: 'space-between',
    alignItems: 'center',
  }, bottomTextSyle: {
    flex: 1,
    flexDirection: "row",
    justifyContent: 'space-evenly',
    alignItems: 'flex-end'
  },
  thumbnail: {
    width: 90,
    height: 90,
    resizeMode: 'stretch',
    borderRadius: 10
  }, titleStyle: {
    ...Typography.body1,
    fontWeight: "bold",
    padding: 10
  }, bottomText: {
    ...Typography.body2,
    color: Colors.iconsColor,
    fontWeight: "bold"
  }
})