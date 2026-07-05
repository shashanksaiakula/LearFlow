import { Button, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../../navigation/types';
import { useDispatch, useSelector } from 'react-redux';
import { logoutRequested } from '../../redux/slices/authSlice';
import {RootState} from '../../redux/store'


type  HomeScreenRoutProp = RouteProp<
RootStackParamList,
"Home"
>
// type HomeScreenNavigationProp =
//   StackNavigationProp<
//     RootStackParamList,
//     'Home'
//   >;

type props = {
  route : HomeScreenRoutProp,
  // navigation: HomeScreenNavigationProp
}

const HomeScreen = () => {
  // const navigation = useNavigation()

  const user = useSelector((state : RootState) => state.auth.user)
  const dispatch = useDispatch()

  const onLogout = () => {
    dispatch(logoutRequested())
  }

  return (
    <View>
      <Text>HomeScreen</Text>
      <Text>{user?.name}</Text>
        <Button
            title='Logout'
            onPress={onLogout}
             />
    </View>
  )
}

export default HomeScreen

const styles = StyleSheet.create({})