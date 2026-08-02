import { SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { RootState } from '../../redux/store'
import { useDispatch, useSelector } from 'react-redux'
import ComnonHeader from '../../components/common/ComnonHeader'
import { Strings } from '../../strings/String'
import MaterialCommunityIcons from "@react-native-vector-icons/material-design-icons";
import { Colors } from '../../theme/colors'
import LinearGradient from 'react-native-linear-gradient'
import Avather from '../../components/avathar/Avather'
import CommonCard from '../../components/common/CommonCard'
import ProfileCard from '../../components/ProfileCard'
import Divider from '../../components/Divider/Divider'
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import OutLineButton from '../../components/common/OutLineButton'
import { ProfileStackParamList } from '../../navigation/types'
import { useNavigation } from '@react-navigation/native';
import PrimaryButton from '../../components/PrimaryButton/PrimaryButton'
import { Input } from '../../components/Input'
import styles from './styles'
import { Controller, useForm } from 'react-hook-form'
import { current } from '@reduxjs/toolkit'
import { changePasswordRequest } from '../../redux/slices/authSlice'

type EditNavigationProps = NativeStackNavigationProp<ProfileStackParamList>;


const ChangePasswordScreen = () => {

    const user = useSelector((state: RootState) => state.auth.user)
    const dispatch = useDispatch()
    const navigation = useNavigation<EditNavigationProps>()
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showCNewPassword, setShowNewPassword] = useState(false);
    const [showCConfNewPassword, setShowConfiNewPassword] = useState(false);


    const {
        control,
        handleSubmit,
        reset,
        watch,
        formState: { errors },
    } = useForm({
        defaultValues: {
            currentPassword: "",
            newPassword: "",
            confirmNewPassword: ""
        },
    });

    const cancelHandel = () => {
        reset()
        navigation.pop()
    }
    const handelPasswordChange = (data: any) => {
        console.log(data)
        dispatch(changePasswordRequest({oldPassword : data.currentPassword, newPassword : data.newPassword}))
        reset()
    }

    return (
        <>
            <LinearGradient
                colors={[
                    "#dce8f7",
                    "#FFFFFF",
                ]}
                style={[styles.container]}
            >
                <ScrollView style={styles.container}
                    contentContainerStyle={{ paddingBottom: 28 }}
                    showsVerticalScrollIndicator={false}
                >
                    <SafeAreaView style={styles.container}>
                        <ComnonHeader title={Strings.change_password}
                            rightIcon={
                                <MaterialCommunityIcons
                                    name="arrow-left"
                                    color={Colors.primary}
                                    size={26}
                                />
                            }
                            onPressRight={() => { navigation.pop() }}
                        />
                        <CommonCard>
                            <View style={styles.nameCointer}>
                                <MaterialCommunityIcons
                                    name="lock-reset"
                                    size={60}
                                    color={Colors.primary}
                                />
                                <Text style={styles.tiltStyle}>{Strings.change_your_password}</Text>
                                <Text style={{ textAlign: 'center' }}>{Strings.security_dont_share}</Text>
                            </View>
                            <Controller
                                control={control}
                                name='currentPassword'
                                rules={{
                                    required: "Current Password is required.",
                                    pattern: {
                                        value: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/,
                                        message:
                                            "Current Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number, and one special character.",
                                    },
                                }}
                                render={({ field }) => (
                                    <Input
                                        label={Strings.current_password}
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
                                                    showCurrentPassword
                                                        ? "eye-off-outline"
                                                        : "eye-outline"
                                                }
                                                size={22}
                                                color={Colors.textSecondary}
                                            />
                                        }
                                        secureTextEntry={!showCurrentPassword}
                                        rightIconPress={() => { setShowCurrentPassword(previous => !previous) }}
                                        error={errors.currentPassword?.message}
                                    />
                                )}
                            />

                            <Controller
                                control={control}
                                name='newPassword'
                                rules={{
                                    required: "New Password is required.",
                                    pattern: {
                                        value: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/,
                                        message:
                                            "New Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number, and one special character.",
                                    },
                                }}
                                render={({ field }) => (
                                    <Input
                                        label={Strings.new_password}
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
                                                    showCNewPassword
                                                        ? "eye-off-outline"
                                                        : "eye-outline"
                                                }
                                                size={22}
                                                color={Colors.textSecondary}
                                            />
                                        }
                                        secureTextEntry={!showCNewPassword}
                                        rightIconPress={() => { setShowNewPassword(previous => !previous) }}
                                        error={errors.newPassword?.message}
                                    />
                                )}
                            />
                            <Controller
                                control={control}
                                name='confirmNewPassword'
                                rules={{
                                    required: "Confirm New Password is required.",
                                    pattern: {
                                        value: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/,
                                        message:
                                            "Confirm Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number, and one special character.",
                                    },
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
                                                    showCConfNewPassword
                                                        ? "eye-off-outline"
                                                        : "eye-outline"
                                                }
                                                size={22}
                                                color={Colors.textSecondary}
                                            />
                                        }
                                        secureTextEntry={!showCConfNewPassword}
                                        rightIconPress={() => { setShowConfiNewPassword(previous => !previous) }}
                                        error={errors.confirmNewPassword?.message}
                                    />
                                )}
                            />
                        </CommonCard>
                        <View style={styles.logoutBtm}>
                            <PrimaryButton
                                title={Strings.update_password}
                                onPress={handleSubmit(handelPasswordChange)}
                            />
                            <OutLineButton color={Colors.primary} text={Strings.cancel}
                                onPress={cancelHandel}
                            />
                        </View>
                    </SafeAreaView>
                </ScrollView>

            </LinearGradient>
        </>
    )
}

export default ChangePasswordScreen

