import { ScrollView, Text, View } from 'react-native'
import React, { useState } from 'react'
import { RootState } from '../../redux/store'
import { useDispatch, useSelector } from 'react-redux'
import ComnonHeader from '../../components/common/ComnonHeader'
import { Strings } from '../../strings/String'
import MaterialCommunityIcons from "@react-native-vector-icons/material-design-icons";
import { Colors } from '../../theme/colors'
import Avather from '../../components/avathar/Avather'
import CommonCard from '../../components/common/CommonCard'
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import OutLineButton from '../../components/common/OutLineButton'
import { ProfileStackParamList } from '../../navigation/types'
import { useNavigation } from '@react-navigation/native';
import styles from './styles'
import PrimaryButton from '../../components/PrimaryButton/PrimaryButton'
import { Input } from '../../components/Input'
import { editProfileRequest } from '../../redux/slices/authSlice'
import CommomBackGround from '../../components/common/CommomBackGround'

type EditNavigationProps = NativeStackNavigationProp<ProfileStackParamList>;


const EditProfile = () => {

    const user = useSelector((state: RootState) => state.auth.user)
    const dispatch = useDispatch()
    const navigation = useNavigation<EditNavigationProps>()
    const [name, setName] = useState(user?.name)
    const [number, setNumber] = useState(user?.phone)
    const [dateOfBirth, setDateOfBirth] = useState(user?.dateOfBirth)

    const cancelHandel = () => {
        setName("")
        setDateOfBirth("")
        setNumber("")
        navigation.pop()
    }

    const submitHandle = () => {
        dispatch(editProfileRequest({ name: name }))
    }

    return (
        <>
            <CommomBackGround>
                <ComnonHeader title={Strings.edit_profile}
                    rightIcon={
                        <MaterialCommunityIcons
                            name="arrow-left"
                            color={Colors.iconsColor}
                            size={26}
                        />
                    }
                    onPressRight={() => { navigation.pop() }}
                />
                <ScrollView style={styles.container}
                    contentContainerStyle={{ paddingBottom: 28 }}
                    showsVerticalScrollIndicator={false}
                >
                    <Avather isEditScreen={true} />
                    <View style={styles.nameCointer}>
                        <Text>{Strings.tap_to_change_img}</Text>
                    </View>
                    <CommonCard>
                        <Text style={styles.persInfo}>{Strings.personal_infrom}</Text>
                        <Input
                            label={Strings.full_name}
                            leftIcon={
                                <MaterialCommunityIcons
                                    name="account-outline"
                                    color={Colors.secondary}
                                    size={26}
                                />
                            }
                            value={name}
                            onChangeText={setName}
                        />
                        <Input
                            disabled={true}
                            label={Strings.email}
                            leftIcon={
                                <MaterialCommunityIcons
                                    name="email-outline"
                                    color={Colors.secondary}
                                    size={26}
                                />
                            }
                            value={user.email}
                        />
                        <Input
                            label={Strings.phone_number}
                            leftIcon={
                                <MaterialCommunityIcons
                                    name="phone-outline"
                                    color={Colors.secondary}
                                    size={26}
                                />
                            }
                            value={number}
                            onChangeText={setNumber}
                        />
                        <Input
                            label={Strings.date_of_birt}
                            leftIcon={
                                <MaterialCommunityIcons
                                    name="calendar-month"
                                    color={Colors.secondary}
                                    size={26}
                                />
                            }
                            value={dateOfBirth}
                            onChangeText={setDateOfBirth}
                        />
                    </CommonCard>
                    <View style={styles.logoutBtm}>
                        <PrimaryButton title={Strings.save_changes} onPress={submitHandle} />
                        <OutLineButton color={Colors.primary} text={Strings.cancel}
                            onPress={cancelHandel}
                        />
                    </View>
                </ScrollView>

            </CommomBackGround>
        </>
    )
}

export default EditProfile

