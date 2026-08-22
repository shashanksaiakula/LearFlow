import { ScrollView, Text, View } from 'react-native'
import React from 'react'
import styles from './styles'
import CommomBackGround from '../../components/common/CommomBackGround'
import { Strings } from '../../strings/String'
import PrimaryButton from '../../components/PrimaryButton/PrimaryButton'
import { RootStackParamList } from '../../navigation/types'
import { StackNavigationProp } from '@react-navigation/stack'
import MaterialDesignIcons from '@react-native-vector-icons/material-design-icons'
import { Colors } from '../../theme/colors'


type PaymentScreenPropsNavigationProps = StackNavigationProp<RootStackParamList, "PaymentSuccess">

type Props = {
    navigation: PaymentScreenPropsNavigationProps
}
const PaymentSuccess = ({ navigation }: Props) => {
    return (
        <CommomBackGround>
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.successContainer}
            >
                <View style={styles.successIconWrap}>
                    <MaterialDesignIcons
                        name="check"
                        size={56}
                        color={Colors.success}
                    />
                </View>

                <Text style={styles.successTitle}>Payment Successful</Text>
                <Text style={styles.successSubtitle}>
                    You now have lifetime access to this course. Happy learning!
                </Text>

                <View style={styles.successCard}>
                    <View style={styles.successCardRow}>
                        <Text style={styles.successCardLabel}>Order status</Text>
                        <Text style={[styles.successCardValue, { color: Colors.success }]}>
                            Completed
                        </Text>
                    </View>
                    <View style={styles.successCardRow}>
                        <Text style={styles.successCardLabel}>Access</Text>
                        <Text style={styles.successCardValue}>Lifetime</Text>
                    </View>
                </View>

                <PrimaryButton
                    onPress={() => {
                        navigation.navigate('BottomTab', { screen: 'myLearning' })
                    }}
                    title={Strings.contine_learning}
                />
            </ScrollView>
        </CommomBackGround>
    )
}

export default PaymentSuccess