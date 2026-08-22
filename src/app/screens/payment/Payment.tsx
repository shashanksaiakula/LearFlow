import { KeyboardAvoidingView, Platform, ScrollView, Text, View } from 'react-native'
import React, { useState } from 'react'
import { RootStackParamList } from '../../navigation/types'
import { StackNavigationProp } from '@react-navigation/stack'
import CommomBackGround from '../../components/common/CommomBackGround'
import styles from './styles'
import PrimaryButton from '../../components/PrimaryButton/PrimaryButton'
import { Strings } from '../../strings/String'
import ComnonHeader from '../../components/common/ComnonHeader'
import MaterialDesignIcons from '@react-native-vector-icons/material-design-icons'
import { Colors } from '../../theme/colors'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../redux/store'
import { enrollIntoCourse, getEnrolledCourse } from '../../redux/thunk/enrollThunk'
import { RouteProp } from '@react-navigation/native'
import { deleteBookmark } from '../../redux/thunk/thunkBookmark'
import { Input } from '../../components/Input'
import { Controller, useForm } from 'react-hook-form'
import { Pressable } from 'react-native'
import { Spacing } from '../../theme/spacing'
import {
    formatCardNumber,
    formatExpiry,
    isValidCardNumber,
    isValidCvv,
    isValidExpiry,
    toRupee,
} from '../../utils/paymentUtils'

type PaymentScreenProps = RouteProp<RootStackParamList, "Payment">
type PaymentScreenPropsNavigationProps = StackNavigationProp<RootStackParamList, "Payment">

type Props = {
    route: PaymentScreenProps
    navigation: PaymentScreenPropsNavigationProps
}

type PaymentMethod = 'card' | 'upi' | 'netbanking'

const BANKS = ['HDFC Bank', 'ICICI Bank', 'State Bank of India', 'Axis Bank']

interface PaymentFormValues {
    cardNumber: string
    cardName: string
    expiry: string
    cvv: string
    upiId: string
    bank: string
}

const Payment = ({ route, navigation }: Props) => {
    const [method, setMethod] = useState<PaymentMethod>('card')
    const [processing, setProcessing] = useState(false)

    const dispatch = useDispatch<AppDispatch>()
    const enrollError = useSelector((state: RootState) => state.enroll.error)
    const { bookmarks } = useSelector((state: RootState) => state.bookmark)

    const amount = route.params.amount
    const { courseCode, lessonId } = route.params

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<PaymentFormValues>({
        defaultValues: {
            cardNumber: '',
            cardName: '',
            expiry: '',
            cvv: '',
            upiId: '',
            bank: '',
        },
    })

    const onPay = async (_data: PaymentFormValues) => {
        setProcessing(true)

        // Simulated payment attempt — swap this for a real gateway call
        await new Promise((resolve) => setTimeout(resolve, 1500))

        try {
            await dispatch(
                enrollIntoCourse({
                    courseCode,
                    lessonCode: lessonId,
                })
            ).unwrap()

            // Remove this course from bookmarks if it was bookmarked
            const bookmarkedCourse = bookmarks?.find(
                (course) => course.courseCode === courseCode
            )
            if (bookmarkedCourse?._id) {
                await dispatch(deleteBookmark({ id: bookmarkedCourse._id }))
            }

            // Refresh the enrolled list so My Learning updates immediately
            await dispatch(getEnrolledCourse())

            navigation.replace('PaymentSuccess')
        } catch (e) {
            // Enrollment failed — error is surfaced via enrollError below
            setProcessing(false)
        }
    }

    return (
        <CommomBackGround>
            <ComnonHeader
                title={Strings.payment}
                rightIcon={
                    <MaterialDesignIcons
                        name='arrow-left'
                        size={22}
                        color={Colors.iconsColor}
                    />
                }
                onPressRight={() => { navigation.pop() }}
            />
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : undefined}
                style={styles.content}
            >
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    keyboardShouldPersistTaps="handled"
                    contentContainerStyle={styles.content}
                >
                    <View style={styles.payTotalCard}>
                        <Text style={styles.payTotalLabel}>Amount to pay</Text>
                        <Text style={styles.payTotalValue}>{toRupee(amount)}</Text>
                    </View>

                    <Text style={styles.sectionTitle}>Payment Method</Text>
                    <View style={styles.methodRow}>
                        {([
                            { key: 'card', label: 'Card', icon: 'credit-card-outline' },
                            { key: 'upi', label: 'UPI', icon: 'cellphone' },
                            { key: 'netbanking', label: 'Net Banking', icon: 'bank-outline' },
                        ] as const).map((item) => {
                            const active = method === item.key
                            return (
                                <Pressable
                                    key={item.key}
                                    style={[styles.methodChip, active && styles.methodChipActive]}
                                    onPress={() => setMethod(item.key)}
                                >
                                    <MaterialDesignIcons
                                        name={item.icon}
                                        size={22}
                                        color={active ? Colors.primary : Colors.textSecondary}
                                    />
                                    <Text
                                        style={[
                                            styles.methodChipLabel,
                                            active && styles.methodChipLabelActive,
                                        ]}
                                    >
                                        {item.label}
                                    </Text>
                                </Pressable>
                            )
                        })}
                    </View>

                    <View style={styles.formCard}>
                        {method === 'card' && (
                            <>
                                <View style={styles.cardBrandRow}>
                                    <MaterialDesignIcons
                                        name='lock-outline'
                                        size={14}
                                        color={Colors.textSecondary}
                                    />
                                    <Text style={styles.secureNoteText}>
                                        Card details are encrypted
                                    </Text>
                                </View>

                                <Controller
                                    control={control}
                                    rules={{
                                        required: 'Card number is required.',
                                        validate: (value) =>
                                            isValidCardNumber(value) ||
                                            'Enter a valid 16-digit card number.',
                                    }}
                                    name="cardNumber"
                                    render={({ field }) => (
                                        <Input
                                            label="Card Number"
                                            value={field.value}
                                            onChangeText={(text) =>
                                                field.onChange(formatCardNumber(text))
                                            }
                                            keyboardType="number-pad"
                                            maxLength={19}
                                            leftIcon={
                                                <MaterialDesignIcons
                                                    name="credit-card-outline"
                                                    color={Colors.primary}
                                                    size={22}
                                                />
                                            }
                                            error={errors.cardNumber?.message}
                                        />
                                    )}
                                />

                                <Controller
                                    control={control}
                                    rules={{
                                        required: 'Name on card is required.',
                                    }}
                                    name="cardName"
                                    render={({ field }) => (
                                        <Input
                                            label="Name on Card"
                                            value={field.value}
                                            onChangeText={field.onChange}
                                            autoCapitalize="words"
                                            error={errors.cardName?.message}
                                        />
                                    )}
                                />

                                    <Controller
                                        control={control}
                                        rules={{
                                            required: 'Required',
                                            validate: (value) =>
                                                isValidExpiry(value) ||
                                                'Invalid expiry',
                                        }}
                                        name="expiry"
                                        render={({ field }) => (
                                            <Input
                                                label="Expiry"
                                                containerStyle={styles.rowInput}
                                                value={field.value}
                                                onChangeText={(text) =>
                                                    field.onChange(formatExpiry(text))
                                                }
                                                maxLength={5}
                                                keyboardType="number-pad"
                                                placeHolder="MM/YY"
                                                error={errors.expiry?.message}
                                            />
                                        )}
                                    />
                                    <Controller
                                        control={control}
                                        rules={{
                                            required: 'Required',
                                            validate: (value) =>
                                                isValidCvv(value) || 'Invalid CVV',
                                        }}
                                        name="cvv"
                                        render={({ field }) => (
                                            <Input
                                                label="CVV"
                                                containerStyle={styles.rowInput}
                                                value={field.value}
                                                onChangeText={(text) =>
                                                    field.onChange(
                                                        text.replace(/\D/g, '').slice(0, 4)
                                                    )
                                                }
                                                maxLength={4}
                                                keyboardType="number-pad"
                                                secureTextEntry
                                                error={errors.cvv?.message}
                                            />
                                        )}
                                    />
                            </>
                        )}

                        {method === 'upi' && (
                            <Controller
                                control={control}
                                rules={{
                                    required: 'UPI ID is required.',
                                    pattern: {
                                        value: /^[a-zA-Z0-9.\-_]{2,}@[a-zA-Z]{2,}$/,
                                        message: 'Enter a valid UPI ID (e.g. name@upi).',
                                    },
                                }}
                                name="upiId"
                                render={({ field }) => (
                                    <Input
                                        label="UPI ID"
                                        value={field.value}
                                        onChangeText={field.onChange}
                                        autoCapitalize="none"
                                        placeHolder="yourname@upi"
                                        leftIcon={
                                            <MaterialDesignIcons
                                                name="cellphone"
                                                color={Colors.primary}
                                                size={22}
                                            />
                                        }
                                        error={errors.upiId?.message}
                                    />
                                )}
                            />
                        )}

                        {method === 'netbanking' && (
                            <Controller
                                control={control}
                                rules={{
                                    required: 'Please select a bank.',
                                }}
                                name="bank"
                                render={({ field }) => (
                                    <>
                                        {/* Styled input that doubles as the selected-bank label */}
                                        <Input
                                            label="Select your bank"
                                            value={field.value}
                                            disabled
                                        />
                                        <View style={{ marginTop: 8 }}>
                                            {BANKS.map((bank) => {
                                                const active = field.value === bank
                                                return (
                                                    <Pressable
                                                        key={bank}
                                                        style={[
                                                            styles.methodChip,
                                                            { marginBottom: 8 },
                                                            active && styles.methodChipActive,
                                                        ]}
                                                        onPress={() => field.onChange(bank)}
                                                    >
                                                        <Text
                                                            style={[
                                                                styles.methodChipLabel,
                                                                active
                                                                    ? styles.methodChipLabelActive
                                                                    : null,
                                                            ]}
                                                        >
                                                            {bank}
                                                        </Text>
                                                    </Pressable>
                                                )
                                            })}
                                        </View>
                                        {errors.bank?.message ? (
                                            <Text style={styles.errorText}>
                                                {errors.bank.message}
                                            </Text>
                                        ) : null}
                                    </>
                                )}
                            />
                        )}
                    </View>

                    {enrollError ? (
                        <Text style={[styles.errorText, { marginTop: Spacing.sm }]}>
                            {enrollError}
                        </Text>
                    ) : null}

                    <View style={styles.bottomButtonContainer}>
                        <PrimaryButton
                            onPress={handleSubmit(onPay)}
                            title={`Pay ${toRupee(amount)}`}
                            loading={processing}
                            loadingTitle="Processing…"
                        />
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </CommomBackGround>
    )
}

export default Payment