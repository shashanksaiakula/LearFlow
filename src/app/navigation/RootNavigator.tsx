import React from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import AuthStack from './AuthStack';
import MainStack from './MainStack';
import SplashScreen from '../screens/splash/SplashScreen';
import EditProfile from '../screens/EditProfile';

// Create a parent structural stack container
const RootStack = createNativeStackNavigator();

export default function RootNavigator() {
  const { isLoggedIn, isInitializing } = useSelector((state: RootState) => state.auth);

  return (
    <NavigationContainer>
      <RootStack.Navigator screenOptions={{ headerShown: false }}>
        {isInitializing ? (
          <RootStack.Screen name="Splash" component={SplashScreen} />
        ) : isLoggedIn ? (
          <RootStack.Screen name="Main" component={MainStack} />
        ) : (
          <RootStack.Screen name="Auth" component={AuthStack} />
        )}

      </RootStack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({});
