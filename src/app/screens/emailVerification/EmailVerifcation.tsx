import { StyleSheet, Text, View } from 'react-native'
import React, { useRef, useState } from 'react'
import CommomBackGround from '../../components/common/CommomBackGround'
import CommonCard from '../../components/common/CommonCard'
import ComnonHeader from '../../components/common/ComnonHeader'
import CommonIconWithLoder from '../../components/CommonIconWithLoder'
import MaterialDesignIcons from '@react-native-vector-icons/material-design-icons'
import { Colors } from '../../theme/colors'
import { Strings } from '../../strings/String'
import PrimaryButton from '../../components/PrimaryButton/PrimaryButton'
import OutLineButton from '../../components/common/OutLineButton'
import { styles } from './style'
import { TextInput } from 'react-native-gesture-handler'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../redux/store'
import { emailVerifyRequest, resendEmailRequest } from '../../redux/slices/authSlice'




const EmailVerifcation = ({ route }) => {
    const [otp, setOtp] = useState(["", "", "", ""]);
    const inputRefs = useRef<TextInput[]>([]);
    const dispatch = useDispatch<AppDispatch>()
    const { resendEmailLoding, verifyEmailLoding, resendEmailMessage, verifyEmailMessage, error } = useSelector((state: RootState) => state.auth)
    const { email } = route.params
    return (
        <CommomBackGround>
            <ComnonHeader title={Strings.email_verify} rightIcon={
                <CommonIconWithLoder loding={false} icon="arrow-left" isBackground={false} />
            } />
            <View style={styles.mainConatainer}>

                <CommonCard>
                    <CommonIconWithLoder icon='email-check' loding={false} size={80} color={Colors.primary} isBackground={false} />
                    <Text style={styles.emailStyle}>{Strings.email_you_verify}</Text>
                    <Text style={styles.subStyle}>{Strings.sent_to_email}</Text>
                    <Text style={styles.mailEmailStyle}>{email}</Text>
                    <View style={styles.otpContainer}>
                        {otp.map((value, index) => (
                            <TextInput
                                ref={(ref) => {
                                    if (ref) {
                                        inputRefs.current[index] = ref;
                                    }
                                }}
                                value={value}
                                maxLength={1}
                                keyboardType="number-pad"
                                style={styles.otpBox}

                                onChangeText={(text) => {
                                    const newOtp = [...otp];
                                    newOtp[index] = text;
                                    setOtp(newOtp);

                                    if (text && index < 3) {
                                        inputRefs.current[index + 1]?.focus();
                                    }
                                }}

                                onKeyPress={({ nativeEvent }) => {

                                    if (
                                        nativeEvent.key === "Backspace" &&
                                        otp[index] === "" &&
                                        index > 0
                                    ) {
                                        inputRefs.current[index - 1]?.focus();
                                    }
                                }}
                            />
                        ))}
                    </View>
                    <PrimaryButton onPress={() => {
                        dispatch(emailVerifyRequest({ "token": otp.join("") }))
                    }} title={Strings.email_verify}
                        loading={verifyEmailLoding}
                    />
                    <OutLineButton onPress={() => {
                        dispatch(resendEmailRequest({ email: email }))
                    }} text={Strings.resend_code} color={Colors.primary} loading={resendEmailLoding} />
                    
                </CommonCard>
            </View>
        </CommomBackGround>
    )
}

export default EmailVerifcation
