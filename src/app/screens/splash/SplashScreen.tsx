import { Image, StyleSheet, View } from 'react-native'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { checkAuthenticationRequested } from '../../redux/slices/authSlice';

export default function SplashScreen() {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(checkAuthenticationRequested());
  }, [])

  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/images/learFlow-loding.gif')}
        style={{ width: 200, height: 200 }}
      />
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
