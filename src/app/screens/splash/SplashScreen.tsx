import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { ActivityIndicator } from 'react-native'
import { useDispatch } from 'react-redux';
import { checkAuthenticationRequested } from '../../redux/slices/authSlice';


export default function SplashScreen() {

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(checkAuthenticationRequested());
  }, [])

  return (
    <View style={styles.container}>
      <ActivityIndicator size='large' color='blue'/>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})