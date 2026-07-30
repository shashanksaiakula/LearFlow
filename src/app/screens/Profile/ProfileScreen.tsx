import { SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { RootState } from '../../redux/store'
import { useDispatch, useSelector } from 'react-redux'
import styles from './style'
import ComnonHeader from '../../components/common/ComnonHeader'
import { Strings } from '../../strings/String'
import MaterialCommunityIcons from "@react-native-vector-icons/material-design-icons";
import { Colors } from '../../theme/colors'
import LinearGradient from 'react-native-linear-gradient'
import Avather from '../../components/avathar/Avather'
import CommonCard from '../../components/common/CommonCard'
import ProfileCard from '../../components/ProfileCard'
import Divider from '../../components/Divider/Divider'
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs'
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import OutLineButton from '../../components/common/OutLineButton'
import { logoutRequested } from '../../redux/slices/authSlice'
import { ProfileStackParamList } from '../../navigation/types'
import {  useNavigation } from '@react-navigation/native';

type ProfileNavigationProps = NativeStackNavigationProp<ProfileStackParamList>;


const ProfileScreen = () => {

    const user = useSelector((state: RootState) => state.auth.user)
    const tabBarHeight = useBottomTabBarHeight();
    const dispatch = useDispatch()
    const navigation = useNavigation<ProfileNavigationProps>()

      const onLogout = () => {
        dispatch(logoutRequested())
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
                    contentContainerStyle={{ paddingBottom: tabBarHeight }}
                    showsVerticalScrollIndicator={false}
                >
                    <SafeAreaView style={styles.container}>
                        <ComnonHeader title={Strings.profile}
                            leftIcon={
                                <MaterialCommunityIcons
                                    name="bell-outline"
                                    color={Colors.primary}
                                    size={26}
                                />
                            }
                            rightIcon={
                                <MaterialCommunityIcons
                                    name="arrow-left"
                                    color={Colors.primary}
                                    size={26}
                                />
                            }
                            onPressRight={() => { console.log("back") }}
                            onPressleft={() => { console.log("notification") }}
                        />
                        <Avather isEditScreen={false} />
                        <View style={styles.nameCointer}>
                            <Text style={styles.nameStyle}>{user.name}</Text>
                            <Text style={styles.emailStyle}>{user.email}</Text>
                        </View>
                        <CommonCard>
                            <Text style={styles.persInfo}>{Strings.personal_infrom}</Text>
                            <ProfileCard
                                titel={Strings.full_name}
                                subText={user.name}
                                rightIcon={
                                    <MaterialCommunityIcons
                                        name="account"
                                        color={Colors.primary}
                                        size={26}
                                    />

                                } />
                            <Divider />
                            <ProfileCard
                                titel={Strings.email}
                                subText={user.email}
                                rightIcon={
                                    <MaterialCommunityIcons
                                        name="email"
                                        color={Colors.primary}
                                        size={26}
                                    />
                                } />
                            <Divider />
                            <ProfileCard
                                titel={Strings.phone_number}
                                subText={user.phone}
                                rightIcon={
                                    <MaterialCommunityIcons
                                        name="phone"
                                        color={Colors.primary}
                                        size={26}
                                    />

                                } />
                            <Divider />
                            <ProfileCard
                                titel={Strings.joined_date}
                                subText={user.createdAt}
                                rightIcon={
                                    <MaterialCommunityIcons
                                        name="calendar-month"
                                        color={Colors.primary}
                                        size={26}
                                    />

                                } />
                        </CommonCard>
                        <CommonCard>
                            <Text style={styles.persInfo}>{Strings.account}</Text>
                            <ProfileCard
                            onPress={()=>{
                                navigation.navigate("EditProflie")
                            }}
                                titel={Strings.edit_profile}
                                subText={Strings.update_your_persn}
                                rightIcon={
                                    <MaterialCommunityIcons
                                        name="square-edit-outline"
                                        color={Colors.primary}
                                        size={26}
                                    />

                                } />
                            <Divider />
                            <ProfileCard
                            onPress={()=>{
                                navigation.navigate("ChangePassword")
                            }}
                                titel={Strings.change_password}
                                subText={Strings.update_your_pass}
                                rightIcon={
                                    <MaterialCommunityIcons
                                        name="lock"
                                        color={Colors.primary}
                                        size={26}
                                    />

                                } />
                            <Divider />
                            <ProfileCard
                            onPress={()=>{console.log(`${Strings.read_policy}`)}}
                                titel={Strings.policy}
                                subText={Strings.read_policy}
                                rightIcon={
                                    <MaterialCommunityIcons
                                        name="shield-check-outline"
                                        color={Colors.primary}
                                        size={26}
                                    />

                                } />
                        </CommonCard>
                        <View style={styles.logoutBtm}>
                            <OutLineButton color={Colors.danger} text={Strings.logout}
                            onPress={onLogout}
                             icon={
                                <MaterialCommunityIcons
                                name="logout"
                                color={Colors.danger}
                                size ={22}
                                />
                                
                            }/>
                        </View>
                    </SafeAreaView>
                </ScrollView>

            </LinearGradient>
        </>
    )
}

export default ProfileScreen