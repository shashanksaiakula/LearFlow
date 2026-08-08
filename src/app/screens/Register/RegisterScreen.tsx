import React, { useEffect, useState } from "react";
import {
    ImageBackground,
    KeyboardAvoidingView,
    Platform,
    Pressable,
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
import { Input } from "../../components/Input";
import PrimaryButton from "../../components/PrimaryButton/PrimaryButton";
import { Colors } from "../../theme/colors";
import Divvider from "../../components/Divider/Divider";
import { Controller, useForm } from "react-hook-form";
import Waves from '../../assets/svg/wave.svg'
import TextPressable from "../../components/common/TextPressable";
import { AuthStackParamsList } from "../../navigation/types";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Strings } from "../../strings/String";
import styles from "./styles";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store";
import { registerRequest } from "../../redux/slices/authSlice";
import CommomBackGround from "../../components/common/CommomBackGround";

type AuthNavigationProp = NativeStackNavigationProp<AuthStackParamsList>;
const RegisterScreen = () => {

    const [showPassword, setShowPassword] = useState(false);
    const [changeshowPassword, setChangeShowPassword] = useState(false);
    const [isEnabled, setIsEnabled] = useState(false)
    const navigation = useNavigation<AuthNavigationProp>()
    const dispach = useDispatch<AppDispatch>()

    const {
        control,
        handleSubmit,
        reset,
        watch,
        formState: { errors },
    } = useForm({
        defaultValues: {
            name: "",
            email: "",
            password: "",
            confirmPassword: ""
        },
    });


    const onRegister = (data: any) => {
        console.log(data);
        dispach(registerRequest({ name: data.name, email: data.email, password: data.password }))
        navigation.navigate("Login")
        reset()
    }

    const handleCheckBox = () => {
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
                                    required: "Name is required.",

                                }}
                                name="name"
                                render={({ field, fieldState }) => (
                                    <Input
                                        label={Strings.full_name}
                                        value={field.value}
                                        onChangeText={field.onChange}
                                        onBlur={field.onBlur}
                                        leftIcon={
                                            <MaterialCommunityIcons
                                                name="account-outline"
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
                            <Controller
                                control={control}
                                name="confirmPassword"
                                rules={{
                                    required: "Confirming Password is required.",
                                    validate: (value) =>
                                        value === watch("password") || "Passwords do not match."
                                }}
                                render={({ field }) => (
                                    <Input
                                        label={Strings.confirm_password}
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
                                                    changeshowPassword
                                                        ? "eye-off-outline"
                                                        : "eye-outline"
                                                }
                                                size={22}
                                                color={Colors.textSecondary}
                                            />
                                        }
                                        secureTextEntry={!changeshowPassword}
                                        rightIconPress={() => { setChangeShowPassword(previous => !previous) }}
                                        error={errors.confirmPassword?.message}
                                    />
                                )}
                            />
                            <View style={styles.termsContainer}>
                                <Pressable onPress={handleCheckBox}>
                                    <MaterialCommunityIcons
                                        name={isEnabled ? "checkbox-marked" : "checkbox-blank-outline"}
                                        color={isEnabled ? Colors.primary : Colors.secondary}
                                        size={24}
                                        style={{ paddingHorizontal: 5 }}
                                    />
                                </Pressable>
                                <Text>{Strings.i_aggre_to} </Text>
                                <TextPressable text={Strings.terms} onPress={() => { }} />
                                <Text>{Strings.and} </Text>
                                <TextPressable text={Strings.policy} onPress={() => { }} />
                            </View>
                            <PrimaryButton disabled={!isEnabled} onPress={handleSubmit(onRegister)} title={Strings.create_account} />

                            <View style={styles.dividerStyle}>
                                <Divvider style={{ flex: 1 }} />
                                <Text style={styles.dividerText}>{Strings.or}</Text>
                                <Divvider style={{ flex: 1 }} />
                            </View>

                            <View style={styles.registerContainer}>
                                <Text style={styles.accountText}>{Strings.already_have_acc} </Text>
                                {/* <Text style={styles.registerText}>Register</Text> */}
                                <TextPressable text={Strings.login} onPress={() => {
                                    navigation.navigate("Login")
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

export default RegisterScreen;