import { ScrollView, Text, View } from 'react-native'
import React from 'react'
import { Instructor } from '../../../models/Instructor'
import Avather from '../../../components/avathar/Avather'
import styles from './style'
import CommonCard from '../../../components/common/CommonCard'
import MaterialDesignIcons from '@react-native-vector-icons/material-design-icons'
import { Colors } from '../../../theme/colors'

interface InstructorProps {
  instructor?: Instructor | null
}

const InstructorScreen = ({ instructor }: InstructorProps) => {
  if (!instructor) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>Instructor information is unavailable.</Text>
      </View>
    )
  }

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.conatainer}>
      <CommonCard>
        <View style={styles.profileHeader}>
          <Avather isEditScreen={false} image={instructor.image} />
          <Text style={styles.nameStyle}>{instructor.name}</Text>
          <View style={styles.roleBadge}>
            <MaterialDesignIcons name="school-outline" size={15} color={Colors.primary} />
            <Text style={styles.roleText}>Course instructor</Text>
          </View>
        </View>
        <Text style={styles.bioStyle}>{instructor.bio}</Text>
      </CommonCard>

      <View style={styles.statsRow}>
        <CommonCard>
          <View style={styles.statContent}>
            <MaterialDesignIcons name="star" size={22} color={Colors.warning} />
            <Text style={styles.statValue}>{instructor.rating.toFixed(1)}</Text>
            <Text style={styles.statLabel}>Rating</Text>
          </View>
        </CommonCard>
        <CommonCard>
          <View style={styles.statContent}>
            <MaterialDesignIcons name="account-multiple-outline" size={22} color={Colors.primary} />
            <Text style={styles.statValue}>{instructor.totalStudents.toLocaleString()}</Text>
            <Text style={styles.statLabel}>Students</Text>
          </View>
        </CommonCard>
      </View>

      <CommonCard>
        <Text style={styles.aboutTitle}>About the instructor</Text>
        <Text style={styles.aboutText}>{instructor.bio}</Text>
      </CommonCard>
    </ScrollView>
  )
}

export default InstructorScreen
