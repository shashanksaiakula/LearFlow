import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { BottomTabParamsList } from "./types"
import HomeScreen from "../screens/Home/HomeScreen"
import MaterialCommunityIcons from "@react-native-vector-icons/material-design-icons";
import { Colors } from "../theme/colors";
import ProfileScreen from "../screens/Profile";



const Tab = createBottomTabNavigator<BottomTabParamsList>()
export default function BottomNavigation() {
    return (
        <Tab.Navigator screenOptions={{
            headerShown: false,
            tabBarActiveTintColor: Colors.primary,
            tabBarInactiveTintColor: Colors.textSecondary,
        }}>
            <Tab.Screen name="Home" component={HomeScreen} options={{
                headerShown: false, tabBarIcon: ({ color, size }) => (
                    <MaterialCommunityIcons
                        name="home"
                        color={color}
                        size={size}
                    />
                )
            }} />
            <Tab.Screen name="Profile" component={ProfileScreen} options={{
                headerShown: false,
                tabBarIcon: ({ color, size }) => (
                    <MaterialCommunityIcons
                        name="account"
                        color={color}
                        size={size}
                    />
                )
            }} />
        </Tab.Navigator>
    )
}