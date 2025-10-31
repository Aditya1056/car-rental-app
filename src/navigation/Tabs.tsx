import React from "react";
import { useColorScheme } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { FontAwesome6 } from '@react-native-vector-icons/fontawesome6';

import Home from '../screens/Home';
import Bookings from '../screens/Bookings';
import Profile from '../screens/Profile';

const Tab = createBottomTabNavigator();

type dataType = {
    color: string,
    focused: boolean,
    routeName: string,
}

const renderTabIcon = (data: dataType) => {

    const {color, focused, routeName} = data;

    let iconName: string = 'house';

    if (routeName === 'Home') {
        iconName = focused ? 'house-chimney' : 'house';
    } else if (routeName === 'Bookings') {
        iconName = focused ? 'table-list' : 'rectangle-list';
    }
    else if(routeName === 'Profile'){
        iconName= focused ? 'user-tie' : 'user'
    }

    return <FontAwesome6 name={iconName as any} size={22} color={color} iconStyle="solid" />;
}

const Tabs: React.FC = () => {

    const theme = useColorScheme();

    return (
        <Tab.Navigator 
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarActiveTintColor: '#DE483A',
                tabBarInactiveTintColor: '#adadad',
                tabBarStyle: {
                    height: 65,
                    backgroundColor: theme === 'dark' ? '#1E1E1E' : 'white',
                    elevation: 10,
                    borderTopColor: 'transparent',
                },
                tabBarLabelStyle: {
                    fontSize: 12,
                    marginTop: 3,
                },
                tabBarIcon: ({ color, focused }) => renderTabIcon({color, focused, routeName: route.name}),
            })} 
            
        >
            <Tab.Screen name="Home" component={Home}  />
            <Tab.Screen name="Bookings" component={Bookings} />
            <Tab.Screen name="Profile" component={Profile} />
        </Tab.Navigator>
    );
}

export default Tabs;