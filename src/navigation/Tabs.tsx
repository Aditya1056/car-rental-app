import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";

import Home from '../screens/Home';
import Bookings from '../screens/Bookings';
import Profile from '../screens/Profile';
import React, { PropsWithChildren } from "react";

const Tab = createBottomTabNavigator();

const Tabs: React.FC<PropsWithChildren> = () => {
    return (
        <NavigationContainer>
            <Tab.Navigator>
                <Tab.Screen name="Home" component={Home} />
                <Tab.Screen name="Bookings" component={Bookings} />
                <Tab.Screen name="Profile" component={Profile} />
            </Tab.Navigator>
        </NavigationContainer>
    );
}

export default Tabs;