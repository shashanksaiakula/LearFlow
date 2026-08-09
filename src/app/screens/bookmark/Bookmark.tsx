import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import CommomBackGround from '../../components/common/CommomBackGround'
import ComnonHeader from '../../components/common/ComnonHeader'
import { Strings } from '../../strings/String'
import styles from './styles'

const Bookmark = () => {
  return (
    <View style={styles.mainContainer}>
      <CommomBackGround>
        <ComnonHeader title={Strings.bookmark}/>
      </CommomBackGround>
    </View>
  )
}

export default Bookmark
