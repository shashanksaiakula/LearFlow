import { ScrollView, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { AppDispatch, RootState } from '../../redux/store'
import { useDispatch, useSelector } from 'react-redux'
import ComnonHeader from '../../components/common/ComnonHeader'
import { Strings } from '../../strings/String'
import MaterialCommunityIcons from "@react-native-vector-icons/material-design-icons";
import { Colors } from '../../theme/colors'
import CommonCard from '../../components/common/CommonCard'
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import OutLineButton from '../../components/common/OutLineButton'
import { AuthStackParamsList, } from '../../navigation/types'
import { useNavigation } from '@react-navigation/native';
import PrimaryButton from '../../components/PrimaryButton/PrimaryButton'
import { Input } from '../../components/Input'
import { Controller, useForm } from 'react-hook-form'
import CommomBackGround from '../../components/common/CommomBackGround'
import { forgotPasswordRequest } from '../../redux/slices/authSlice'
import styles from './style'

type ForgitScreenNavigationProps = NativeStackNavigationProp<AuthStackParamsList>;


const ForgotScreen = () => {

  const user = useSelector((state: RootState) => state.auth.user)
  const dispatch = useDispatch<AppDispatch>()
  const navigation = useNavigation<ForgitScreenNavigationProps>()
  const { loading, message, error } = useSelector((state: RootState) => state.auth)



  const {
    control,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: ""
    },
  });

  // useEffect(() => {
  //   if (message && !error) {
  //     // Forgot password request was successful
  //     navigation.navigate("ResetPassword")
  //     reset()
  //   }
  // }, [message, error, navigation, reset])

  const cancelHandel = () => {
    reset()
    navigation.pop()
  }

  const handelPasswordChange = (data: any) => {
    console.log(data)
    navigation.navigate("ResetPassword")
    dispatch(forgotPasswordRequest(data))
  }

  return (
    <>
      <CommomBackGround>
        <ScrollView style={styles.container}
          contentContainerStyle={{ paddingBottom: 28 }}
          showsVerticalScrollIndicator={false}
        >
          <ComnonHeader title={Strings.forgot_password}
            rightIcon={
              <MaterialCommunityIcons
                name="arrow-left"
                color={Colors.iconsColor}
                size={26}
              />
            }
            onPressRight={() => { navigation.pop() }}
          />
          <View style={styles.bacontent}>
            <CommonCard>
              <View style={styles.nameCointer}>
                <MaterialCommunityIcons
                  name="email-newsletter"
                  size={60}
                  color={Colors.primary}
                />
                <Text style={styles.tiltStyle}>{Strings.reset_your_password}</Text>
                <Text style={{ textAlign: 'center' }}>{Strings.enter_email_address}</Text>
              </View>

              {error && (
                <Text style={{ color: 'red', marginBottom: 10, textAlign: 'center' }}>
                  {error}
                </Text>
              )}

              <Controller
                control={control}
                name='email'
                rules={{
                  required: "Email is required.",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Please enter a valid email."
                  }
                }}
                render={({ field }) => (
                  <Input
                    label={Strings.email}
                    value={field.value}
                    onChangeText={field.onChange}
                    onBlur={field.onBlur}
                    leftIcon={
                      <MaterialCommunityIcons
                        name="email"
                        color={Colors.primary}
                        size={22}
                      />
                    }
                    error={errors.email?.message}
                  />
                )}
              />
            </CommonCard>
            <View style={styles.logoutBtm}>
              <PrimaryButton
                title={Strings.send}
                onPress={handleSubmit(handelPasswordChange)}
                disabled={loading}
                loading={loading}
              />
              <OutLineButton color={Colors.primary} text={Strings.cancel}
                onPress={cancelHandel}
              />

            </View>
          </View>

        </ScrollView>

      </CommomBackGround>
    </>
  )
}

export default ForgotScreen

