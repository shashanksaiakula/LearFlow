import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { BottomTabParamsList } from "./types"
import HomeScreen from "../screens/Home/HomeScreen"
import MaterialCommunityIcons from "@react-native-vector-icons/material-design-icons";
import { Colors } from "../theme/colors";
import ProfileScreen from "../screens/Profile";
import CousresListScreen from "../screens/courses";
import MyLearnings from "../screens/mylearning";
import Bookmark from "../screens/bookmark";


const Tab = createBottomTabNavigator<BottomTabParamsList>()
export default function BottomNavigation() {
    return (
        <Tab.Navigator screenOptions={{
            headerShown: false,
            tabBarActiveTintColor: Colors.primary,
            tabBarInactiveTintColor: Colors.textSecondary,
        }}>
            <Tab.Screen name="Home" component={HomeScreen} options={{
                headerShown: false, tabBarIcon: ({ focused, color, size }) => (
                    <MaterialCommunityIcons
                        name={focused ? "home" : "home-outline"}
                        color={color}
                        size={size}
                    />
                )
            }} />
            <Tab.Screen name="courses" component={CousresListScreen} options={{
                headerShown: false, tabBarIcon: ({ focused,color, size }) => (
                    <MaterialCommunityIcons
                        name={focused ?"view-grid" : "view-grid-outline"}
                        color={color}
                        size={size}
                    />
                )
            }} />
             <Tab.Screen name="myLearning" component={MyLearnings} options={{
                headerShown: false, tabBarIcon: ({focused, color, size }) => (
                    <MaterialCommunityIcons
                        name={focused ? "play-circle" : "play-circle-outline"}
                        color={color}
                        size={size}
                    />
                )
            }} />
                        <Tab.Screen name="bookmarks" component={Bookmark} options={{
                headerShown: false, tabBarIcon: ({focused, color, size }) => (
                    <MaterialCommunityIcons
                        name={focused ? "bookmark":"bookmark-outline"}
                        color={color}
                        size={size}
                    />
                )
            }} />
            <Tab.Screen name="ProfileStack" component={ProfileScreen} options={{
                 tabBarLabel: 'Profile',
                headerShown: false,
                tabBarIcon: ({ focused,color, size }) => (
                    <MaterialCommunityIcons
                        name={focused ? "account" : "account-outline"}
                        color={color}
                        size={size}
                    />
                )
            }} />
        </Tab.Navigator>
    )
}