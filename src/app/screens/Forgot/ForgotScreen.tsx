import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../../redux/store'
import { emailVerifyRequest, resendEmailRequest } from '../../redux/slices/authSlice'

const ForgotScreen = () => {
  const dispatch = useDispatch<AppDispatch>()
  useEffect(()=>{
    // dispatch(emailVerifyRequest({"token" :"7214" }))
    dispatch(resendEmailRequest({email : "shashanksai664@gmail.com"}))
  },[dispatch])
  return (
    <View>
      <Text>ForgotScreen</Text>
    </View>
  )
}

export default ForgotScreen

const styles = StyleSheet.create({})