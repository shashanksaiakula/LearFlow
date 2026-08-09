import { ScrollView, Text, View } from 'react-native'
import React from 'react'
import styles from './style'
import { Strings } from '../../../strings/String'
import MaterialDesignIcons from '@react-native-vector-icons/material-design-icons'
import { Colors } from '../../../theme/colors'
import CommonCard from '../../../components/common/CommonCard'

type OverViewProps = {
  description: string,
  whatYouWillLearn: string[]
}

const Overview = ({ description, whatYouWillLearn }: OverViewProps) => {
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <Text style={styles.tilteStyle}>{Strings.overview}</Text>
      <CommonCard>
        <Text>{description}</Text>
      </CommonCard>

      <Text style={styles.tilteStyle}>{Strings.what_you_will_learn}</Text>
      <CommonCard>
        {/* Replaced FlatList with an array map styled with padding */}
        <View style={{ padding: 10 }}>
          {whatYouWillLearn.map((item, index) => (
            <View key={index} style={styles.constainer}>
              <View>
                <MaterialDesignIcons 
                  name='check' 
                  size={22} 
                  color={Colors.primaryLight1} 
                  style={styles.iconStyle} 
                />
              </View>
              <Text style={styles.text}>{item}</Text>
            </View>
          ))}
        </View>
      </CommonCard>
    </ScrollView>
  )
}

export default Overview
