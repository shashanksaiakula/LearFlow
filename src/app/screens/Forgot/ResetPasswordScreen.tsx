import { ScrollView, Text, View } from 'react-native'
import React, { useState, useEffect } from 'react'
import { AppDispatch, RootState } from '../../redux/store'
import { useDispatch, useSelector } from 'react-redux'
import ComnonHeader from '../../components/common/ComnonHeader'
import { Strings } from '../../strings/String'
import MaterialCommunityIcons from "@react-native-vector-icons/material-design-icons";
import { Colors } from '../../theme/colors'
import CommonCard from '../../components/common/CommonCard'
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import OutLineButton from '../../components/common/OutLineButton'
import { AuthStackParamsList, ProfileStackParamList } from '../../navigation/types'
import { useNavigation } from '@react-navigation/native';
import PrimaryButton from '../../components/PrimaryButton/PrimaryButton'
import { Input } from '../../components/Input'
import { Controller, useForm } from 'react-hook-form'
import CommomBackGround from '../../components/common/CommomBackGround'
import { resetPasswordRequest } from '../../redux/slices/authSlice'
import styles from './style'

type ResetPasswordNavigationProps = NativeStackNavigationProp<AuthStackParamsList>;


const ResetPasswordScreen = () => {

    const user = useSelector((state: RootState) => state.auth.user)
    const dispatch = useDispatch<AppDispatch>()
    const navigation = useNavigation<ResetPasswordNavigationProps>()
    const {
        resetPasswordLoading,
        resetPasswordMessage,
        resetPasswordError,
    } = useSelector((state: RootState) => state.auth)

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
            token: "",
            newPassword: "",
            confirmNewPassword: ""
        },
    });

    const newPassword = watch('newPassword');

    useEffect(() => {
        if (resetPasswordMessage && !resetPasswordError) {
            navigation.replace("Login")
            reset()
        }
    }, [resetPasswordMessage, resetPasswordError, navigation, reset])

    const cancelHandel = () => {
        reset()
        navigation.pop()
    }

    const handelPasswordChange = (data: any) => {
        // Validate that passwords match
        if (data.newPassword !== data.confirmNewPassword) {
            return
        }
        
        // Send only token and newPassword to API
        dispatch(resetPasswordRequest({
            token: data.token,
            newPassword: data.newPassword
        }))
    }

    return (
        <>
            <CommomBackGround>
                <ScrollView style={styles.container}
                    contentContainerStyle={{ paddingBottom: 28 }}
                    showsVerticalScrollIndicator={false}
                >
                    <ComnonHeader title={Strings.reset_password}
                        rightIcon={
                            <MaterialCommunityIcons
                                name="arrow-left"
                                color={Colors.iconsColor}
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

                        {resetPasswordError && (
                            <Text style={{ color: 'red', marginBottom: 10, textAlign: 'center' }}>
                                {resetPasswordError}
                            </Text>
                        )}

                        <Controller
                            control={control}
                            name='token'
                            rules={{
                                required: "token is required.",

                            }}
                            render={({ field }) => (
                                <Input
                                    label={Strings.token}
                                    value={field.value}
                                    onChangeText={field.onChange}
                                    onBlur={field.onBlur}
                                    leftIcon={
                                        <MaterialCommunityIcons
                                            name="key"
                                            color={Colors.primary}
                                            size={22}
                                        />
                                    }
                                    error={errors.token?.message}
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
                                validate: (value) => {
                                    if (value !== newPassword) {
                                        return "Passwords do not match"
                                    }
                                    return true
                                }
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
                            title={Strings.change_password}
                            onPress={handleSubmit(handelPasswordChange)}
                            loadingTitle="Resetting password..."
                            disabled={resetPasswordLoading}
                            loading={resetPasswordLoading}
                        />
                        <OutLineButton color={Colors.primary} text={Strings.cancel}
                            onPress={cancelHandel}
                        />
                    </View>
                </ScrollView>

            </CommomBackGround>
        </>
    )
}

export default ResetPasswordScreen