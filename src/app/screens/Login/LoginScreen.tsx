import React, { useEffect, useState } from "react";
import {
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  View,
} from "react-native";

import MaterialCommunityIcons from "@react-native-vector-icons/material-design-icons";
import LinearGradient from "react-native-linear-gradient";
import Logo from "../../components/logo/Logo";
import styles from "./style";
import { Input } from "../../components/Input";
import PrimaryButton from "../../components/PrimaryButton/PrimaryButton";
import { Colors } from "../../theme/colors";
import Divvider from "../../components/Divider/Divvider";
import SocialButton from "../../components/SocialButton/SocialButton";
import GoogleIcon from "../../assets/svg/GoolgeIcon";
import { Controller, useForm } from "react-hook-form";
import Waves from '../../assets/svg/wave.svg'

const LoginScreen = () => {

  const [showPassword, setShowPassword] = useState(false);

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
    console.log(data);
    reset()
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

                <Logo />

                <Text style={styles.title}>
                  Welcome Back
                </Text>

                <Text style={styles.subtitle}>
                  Continue your learning journey.
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
                    label="Email"
                    value={field.value}
                    onChangeText={field.onChange}
                    onBlur={field.onBlur}
                    leftIcon={
                      <MaterialCommunityIcons
                        name="email-outline"
                        color={Colors.textSecondary}
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
                    label="Password"
                    value={field.value}
                    onChangeText={field.onChange}
                    onBlur={field.onBlur}
                    leftIcon={
                      <MaterialCommunityIcons
                        name="lock-outline"
                        color={Colors.textSecondary}
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

              <Text style={styles.sideText}>Forogot Password?</Text>

              <PrimaryButton onPress={handleSubmit(onLogin)} title="Login" />

              <View style={styles.dividerStyle}>
                <Divvider />
                <Text style={styles.dividerText}>OR</Text>
                <Divvider />
              </View>

              <SocialButton
                title="Continue with Google"
                onClick={() => { }}
                icon={<GoogleIcon width={18} height={18} />}
              />

              <View style={styles.registerContainer}>
                <Text style={styles.accountText}>Don't have an account? </Text>
                <Text style={styles.registerText}>Register</Text>
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