import { Image, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Course } from '../models/course'
import MaterialDesignIcons from '@react-native-vector-icons/material-design-icons';
import { Colors } from '../theme/colors';
import { Typography } from '../theme/typography';
import { Strings } from '../strings/String';
import { BASE_URL } from '../api/apiClinet';

interface MyCousrseCard {
  course: Course;
  onClick: () => void,
  isBoomarked? : boolean,
  bookmarkPressed?: ()=>void
}

export default function MyCousrseCard({ course, onClick, isBoomarked, bookmarkPressed }: MyCousrseCard) {

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
        <Image source={{ uri: `${BASE_URL}${course.bannerImage}` }}
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
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 8,
    marginVertical: 2,
    marginHorizontal: 5,
    borderRadius: 10,
    backgroundColor: "#FFF",
    elevation: 3,
  }, bottomTextSyle: {
    flex: 1,
    flexDirection: "row",
    justifyContent: 'space-evenly',
    alignItems: 'flex-end'
  },
  thumbnail: {
    width: "100%",
    height: 120,
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