import React, { useEffect, useState } from "react";
import {
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Switch,
  Text,
  View,
} from "react-native";

import MaterialCommunityIcons from "@react-native-vector-icons/material-design-icons";
import { RouteProp, useNavigation } from '@react-navigation/native';
import LinearGradient from "react-native-linear-gradient";
import Logo from "../../components/logo/Logo";
import styles from "./style";
import { Input } from "../../components/Input";
import PrimaryButton from "../../components/PrimaryButton/PrimaryButton";
import { Colors } from "../../theme/colors";
import Divvider from "../../components/Divider/Divider";
import SocialButton from "../../components/SocialButton/SocialButton";
import GoogleIcon from "../../assets/svg/GoolgeIcon";
import AppleLogo from "../../assets/svg/applelogo.svg"
import { Controller, useForm } from "react-hook-form";
import Waves from '../../assets/svg/wave.svg'
import TextPressable from "../../components/common/TextPressable";
import { AuthStackParamsList } from "../../navigation/types";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Strings } from "../../strings/String";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store";
import { loginRequested } from "../../redux/slices/authSlice";
import Divider from "../../components/Divider/Divider";
import CommomBackGround from "../../components/common/CommomBackGround";

type AuthNavigationProp = NativeStackNavigationProp<AuthStackParamsList>;
const LoginScreen = () => {

  const [showPassword, setShowPassword] = useState(false);
  const [isEnabled, setIsEnabled] = useState(false)
  const navigation = useNavigation<AuthNavigationProp>()
  const dispatch = useDispatch<AppDispatch>()

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });


  const onLogin = (data: any) => {
    console.log(data.email);
    dispatch(loginRequested({ email: data.email, password: data.password, iskeepMeLogin: isEnabled }))
    reset()
  }

  const toggleSwitch = () => {
    setIsEnabled(!isEnabled)
  }

  return (
    <>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="dark-content"
      />

      <LinearGradient
        colors={[
          "#F8FBFF",
          "#FFFFFF",
        ]}
        style={styles.container}
      >
        <SafeAreaView style={styles.safeArea}>
          <KeyboardAvoidingView
            behavior={
              Platform.OS === "ios"
                ? "padding"
                : undefined
            }
            style={styles.flex}
          >
            <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.content}
            >
              <View style={styles.header}>
                <View style={{ width: "100%", alignItems: "flex-end" }}>
                  {/* <LoginLogo2 width={100} height={100}/> */}
                </View>
                <Logo />

              <Text style={styles.title}>
                {Strings.create_account}
              </Text>

              <Text style={styles.subtitle}>
                {Strings.join_learn_flow}
              </Text>

            </View>
            <Controller
              control={control}
              rules={{
                required: "Email is required.",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Please enter a valid email."
                }
              }}
              name="email"
              render={({ field, fieldState }) => (
                <Input
                  label={Strings.email}
                  value={field.value}
                  onChangeText={field.onChange}
                  onBlur={field.onBlur}
                  leftIcon={
                    <MaterialCommunityIcons
                      name="email-outline"
                      color={Colors.primary}
                      size={22}
                    />
                  }
                  error={fieldState.error?.message}
                />
              )}
            />
            <Controller
              control={control}
              name="password"
              rules={{
                required: "Password is required.",
                pattern: {
                  value: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/,
                  message:
                    "Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number, and one special character.",
                },
              }}
              render={({ field }) => (
                <Input
                  label={Strings.password}
                  value={field.value}
                  onChangeText={field.onChange}
                  onBlur={field.onBlur}
                  leftIcon={
                    <MaterialCommunityIcons
                      name="lock-outline"
                      color={Colors.primary}
                      size={22}
                    />
                  }
                  rightIcon={
                    <MaterialCommunityIcons
                      name={
                        showPassword
                          ? "eye-off-outline"
                          : "eye-outline"
                      }
                      size={22}
                      color={Colors.textSecondary}
                    />
                  }
                  secureTextEntry={!showPassword}
                  rightIconPress={() => { setShowPassword(previous => !previous) }}
                  error={errors.password?.message}
                />
              )}
            />
            <View style={styles.forgotContainer}>
              <View style={styles.switchContainer}>
                <Switch
                  trackColor={{ false: Colors.border, }}
                  thumbColor={isEnabled ? Colors.primary : Colors.white}
                  ios_backgroundColor="#3e3e3e"
                  onValueChange={toggleSwitch}
                  value={isEnabled}
                />
                <Text>{Strings.remember_me}</Text>
              </View>
              {/* <Text style={styles.sideText}>Forogot Password?</Text> */}
              <TextPressable text={Strings.forgot_password} onPress={() => {
                navigation.navigate("Forgot")
              }} />
            </View>
            <PrimaryButton onPress={handleSubmit(onLogin)} title={Strings.login} />

            <View style={styles.dividerStyle}>
              <Divider style={{ flex: 1 }} />
              <Text style={styles.dividerText}>{Strings.or}</Text>
              <Divider style={{ flex: 1 }} />
            </View>

            <SocialButton
              title={Strings.google_login}
              onClick={() => { }}
              icon={<GoogleIcon width={18} height={18} />}
            />

            <SocialButton
              title={Strings.apple_login}
              onClick={() => { }}
              icon={<AppleLogo width={20} height={20} />}
            />

            <View style={styles.registerContainer}>
              <Text style={styles.accountText}>{Strings.dont_have_any_account} </Text>
              {/* <Text style={styles.registerText}>Register</Text> */}
              <TextPressable text={Strings.register} onPress={() => {
                navigation.navigate("Register")
              }} />
            </View>
            <View style={styles.waveContainer} pointerEvents="none">
              <Waves width="100%" height="100%" fill="#EFF6FF" preserveAspectRatio="none" />
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
      </LinearGradient>
    </>
  );
};

export default LoginScreen;