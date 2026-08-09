import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import styles from './styles'
import CommomBackGround from '../../components/common/CommomBackGround'
import { Strings } from '../../strings/String'
import PrimaryButton from '../../components/PrimaryButton/PrimaryButton'
import { RootStackParamList } from '../../navigation/types'
import { StackNavigationProp } from '@react-navigation/stack'
import { CommonActions } from '@react-navigation/native';



type PaymentScreenPropsNavigationProps = StackNavigationProp<RootStackParamList, "PaymentSuccess">

type Props = {
    navigation: PaymentScreenPropsNavigationProps
}
const PaymentSuccess = ({ navigation }: Props) => {
    return (
        <CommomBackGround>
            <View style={styles.mainContainer}>
                <Text>Payment Success</Text>
                <PrimaryButton onPress={() => {
                    navigation.navigate('BottomTab', {screen : 'myLearning'})
                }}
                    title={Strings.contine_learning}
                />
            </View>
        </CommomBackGround>
    )
}

export default PaymentSuccess
