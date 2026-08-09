import { Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { RootStackParamList } from '../../navigation/types'
import { StackNavigationProp } from '@react-navigation/stack'
import CommomBackGround from '../../components/common/CommomBackGround';
import styles from './styles';
import PrimaryButton from '../../components/PrimaryButton/PrimaryButton';
import { Strings } from '../../strings/String';
import ComnonHeader from '../../components/common/ComnonHeader';
import MaterialDesignIcons from '@react-native-vector-icons/material-design-icons';
import { Colors } from '../../theme/colors';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store';
import { enrollIntoCousre } from '../../redux/thunk/enrollThunk';
import { RouteProp } from '@react-navigation/native';

type PaymentScreemProps = RouteProp<RootStackParamList, "Payment">
type PaymentScreenPropsNavigationProps = StackNavigationProp<RootStackParamList, "Payment">

type Props = {
    route: PaymentScreemProps
    navigation: PaymentScreenPropsNavigationProps
}

const Payment = ({ route, navigation }: Props) => {

    const dispacth = useDispatch<AppDispatch>()
    const { loading, enrolled, error } = useSelector((state: RootState) => state.enroll)

    useEffect(() => {
        dispacth(enrollIntoCousre({ cousreCode: route.params.cousreCode }))
    }, [dispacth])

    return (
        <CommomBackGround>
            <ComnonHeader title={Strings.payment}
                rightIcon={
                    <MaterialDesignIcons
                        name='arrow-left'
                        size={22}
                        color={Colors.iconsColor}
                    />
                }
                onPressRight={() => { navigation.pop() }}
            />
            <View style={styles.mainContainer}>
                <Text>Payment {route.params.amount}</Text>
                <PrimaryButton onPress={() => {
                    if(enrolled) {
                    navigation.navigate('PaymentSuccess')
                    }
                }}
                loading= {loading}
                title={Strings.make_payment}
                />
            </View>
        </CommomBackGround>
    )
}

export default Payment

