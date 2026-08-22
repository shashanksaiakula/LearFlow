import { ScrollView, Text, View } from 'react-native'
import { RouteProp } from '@react-navigation/native';
import React from 'react'
import { RootStackParamList } from '../../navigation/types';
import { StackNavigationProp } from '@react-navigation/stack';
import CommomBackGround from '../../components/common/CommomBackGround';
import ComnonHeader from '../../components/common/ComnonHeader';
import styles from './styles';
import PrimaryButton from '../../components/PrimaryButton/PrimaryButton';
import { Strings } from '../../strings/String';
import MaterialDesignIcons from '@react-native-vector-icons/material-design-icons';
import { Colors } from '../../theme/colors';
import { toRupee } from '../../utils/paymentUtils';

type CheckoutScreenProps = RouteProp<RootStackParamList, "Checkout">

type CheckoutScreenPropsNavigationProps = StackNavigationProp<RootStackParamList, "Checkout">

type Props = {
    route: CheckoutScreenProps
    navigation: CheckoutScreenPropsNavigationProps
}

const Checkout = ({ route, navigation }: Props) => {
    const { amount, courseCode } = route.params

    return (
        <CommomBackGround>
            <ComnonHeader
                title={Strings.checkout}
                rightIcon={
                    <MaterialDesignIcons
                        name='arrow-left'
                        size={22}
                        color={Colors.iconsColor}
                    />
                }
                onPressRight={() => { navigation.pop() }}
            />
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.content}
            >
                <View style={styles.summaryCard}>
                    <View style={styles.summaryRow}>
                        <Text style={styles.summaryLabel}>Course code</Text>
                        <Text style={styles.summaryValue}>{courseCode}</Text>
                    </View>
                    <View style={styles.summaryRow}>
                        <Text style={styles.summaryLabel}>Course access</Text>
                        <Text style={styles.summaryValue}>Lifetime</Text>
                    </View>
                    <View style={styles.summaryRow}>
                        <Text style={styles.summaryLabel}>Support</Text>
                        <Text style={styles.summaryValue}>Included</Text>
                    </View>

                    <View style={styles.divider} />

                    <View style={styles.amountRow}>
                        <Text style={styles.amountTitle}>Total</Text>
                        <Text style={styles.amountValue}>{toRupee(amount)}</Text>
                    </View>
                </View>

                <View style={styles.secureNoteRow}>
                    <MaterialDesignIcons
                        name='shield-check-outline'
                        size={16}
                        color={Colors.textSecondary}
                    />
                    <Text style={styles.secureNoteText}>
                        Your purchase is protected and encrypted
                    </Text>
                </View>

                <View style={styles.bottomButtonContainer}>
                    <PrimaryButton
                        onPress={() => {
                            navigation.navigate('Payment', {
                                amount: route.params.amount,
                                courseCode: route.params.courseCode,
                                lessonId: route.params.lessonId,
                            })
                        }}
                        title={Strings.complete_payment}
                    />
                </View>
            </ScrollView>
        </CommomBackGround>
    )
}

export default Checkout