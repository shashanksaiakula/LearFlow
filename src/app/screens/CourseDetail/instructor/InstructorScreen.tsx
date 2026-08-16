import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Instructor } from '../../../models/Instructor'
import Avather from '../../../components/avathar/Avather'
import styles from './style'
import { Strings } from '../../../strings/String'
import CommonCard from '../../../components/common/CommonCard'
import MaterialDesignIcons from '@react-native-vector-icons/material-design-icons'

interface InstructorProps {
  instructor: Instructor
}

const InstructorScreen = ({ instructor }: InstructorProps) => {
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.conatainer}>
      <Avather isEditScreen={false} image={instructor?.image} />
      <View style={styles.rowConatiner}>
        <CommonCard>
          <Text style={styles.rowtextStyle}>Instructor Rating</Text>
          <Text style={styles.rowtextStyle}>⭐ {instructor.rating} </Text>
        </CommonCard>
        <CommonCard>
          <Text style={styles.rowtextStyle}>{Strings.students_enroller}</Text>
          <View style={styles.rowConatiner}>
            <MaterialDesignIcons
              name='account-multiple-outline'
              size={18}
            />
            <Text style={styles.rowtextStyle}>{instructor.totalStudents}</Text>
          </View>
        </CommonCard>
      </View>
      <CommonCard>
        <Text style={styles.nameStyle}>{instructor.name}</Text>
        <Text style={styles.bioStyle}>{instructor.bio}</Text>
      </CommonCard>
    </ScrollView>
  )
}

export default InstructorScreen
