import React from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import AuthStack from './AuthStack';
import MainStack from './MainStack';
import SplashScreen from '../screens/splash/SplashScreen';
import EmailVerifcation from '../screens/emailVerification';
import ResetPasswordScreen from '../screens/Forgot/ResetPasswordScreen';

// Create a parent structural stack container
const RootStack = createNativeStackNavigator();

export default function RootNavigator() {
  const { isLoggedIn, isInitializing, isEmailverified, user } = useSelector((state: RootState) => state.auth);

  console.log(isEmailverified, "rootsscreen")

  const linking = {
    prefixes: ['learnflow://'],
    config: {
      screens: {
        ResetPassword: 'reset-password',
      },
    },
  };

  return (
    <NavigationContainer linking={linking}>
      <RootStack.Navigator screenOptions={{ headerShown: false }}>
        {isInitializing ? (
          <RootStack.Screen name="Splash" component={SplashScreen} />
        ) : isLoggedIn ? (
          isEmailverified ? (
            <RootStack.Screen name="Main" component={MainStack} />
          ) : (
            <RootStack.Screen name="EmailVerify" component={EmailVerifcation} initialParams={{ email: user.email }} />
          )
        ) : (
          <RootStack.Screen name="Auth" component={AuthStack} />
        )}
        {/* <RootStack.Screen
          name="ResetPassword"
          component={ResetPasswordScreen}
        /> */}
      </RootStack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({});
