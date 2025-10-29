import React, { PropsWithChildren } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Home from '../screens/Home';
import Bookings from '../screens/Bookings';
import Profile from '../screens/Profile';

const Tab = createBottomTabNavigator();

const Tabs: React.FC<PropsWithChildren> = () => {
    return (
        <Tab.Navigator screenOptions={{ headerShown: false }}>
            <Tab.Screen name="Home" component={Home} />
            <Tab.Screen name="Bookings" component={Bookings} />
            <Tab.Screen name="Profile" component={Profile} />
        </Tab.Navigator>
    );
}

export default Tabs;