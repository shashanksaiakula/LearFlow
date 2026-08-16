import { StyleSheet, Text, View } from 'react-native'
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


type ChecoutScreenProps = RouteProp<RootStackParamList, "Checkout">

type CheckoutScreenPropsNavigationProps = StackNavigationProp<RootStackParamList, "Checkout">

type Props = {
    route: ChecoutScreenProps
    navigation: CheckoutScreenPropsNavigationProps
}
const Checkout = ({route, navigation} :Props) => {
    console.log("lass id is ", route.params.lessonId)
  return (
   <CommomBackGround>
            <ComnonHeader title={Strings.checkout} 
            rightIcon={
                <MaterialDesignIcons
                name='arrow-left'
                size={22}
                color={Colors.iconsColor}
                />
            }
            onPressRight={()=>{navigation.pop()}}
            />
            <View style={styles.mainContainer}>
                <Text>{route.params.amount}</Text>
                <PrimaryButton onPress={() => {
                    navigation.navigate('Payment',{
                        amount: route.params.amount,
                        courseCode: route.params.courseCode,
                        lessonId :route.params.lessonId
                    })
                }}
                    title={Strings.make_payment}
                />
            </View>
        </CommomBackGround>
  )
}

export default Checkout