import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Strings } from '../strings/String'
import { Colors } from '../theme/colors'
import { Typography } from '../theme/typography'
import { Spacing } from '../theme/spacing'

interface SectionHeaderProprs {
  title: string,
  isShowViewAll?: boolean,
  onPress?: () => void
}

const SectionHeader = ({ title, isShowViewAll = true, onPress }: SectionHeaderProprs) => {
  return (
    <View style={styles.container}>
      <Text style={styles.textStyle}>{title}</Text>
      {isShowViewAll && <TouchableOpacity onPress={onPress}>
        <Text style={styles.viewStlye}>{Strings.view_all}</Text>
      </TouchableOpacity>}
    </View>
  )
}

export default SectionHeader

const styles = StyleSheet.create({
  container: {
    marginHorizontal: Spacing.sm,
    flexDirection: "row",
    justifyContent: 'space-between',
    marginTop: Spacing.sm
  },
  textStyle: {
    ...Typography.body1,
     fontWeight: "bold",
  },
  viewStlye: {
    ...Typography.body1,
    fontWeight: "bold",
    color: Colors.primary
  }
})