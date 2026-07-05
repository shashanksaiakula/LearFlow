import { Button, StyleSheet, Text, View } from 'react-native'
import { StackNavigationProp } from '@react-navigation/stack'
import { RootStackParamList } from '../../navigation/types'
import { useDispatch } from 'react-redux';
import { loginRequested } from '../../redux/slices/authSlice';
type LoginScreenNaviegationProp =
  StackNavigationProp<
    RootStackParamList,
    "Login"
  >;

type props = {
  navigation: LoginScreenNaviegationProp
}

const LoginScreen = ({ navigation }: props) => {

  const dispatch = useDispatch()
  const onLogin = async () => {

    dispatch(loginRequested({ email: 'eve.holt@reqres.in', password: 'cityslicka' }));
  }

    return (
      <View>
      <Text>LoginScreen</Text>
      < Button
        title = 'Login'
    onPress = { onLogin }
      />
      </View>
  )
}

export default LoginScreen

const styles = StyleSheet.create({})