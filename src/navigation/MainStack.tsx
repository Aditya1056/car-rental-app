import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Tabs from "./Tabs";
import CarDetails from "../screens/CarDetails";
import BookingForm from "../screens/BookingForm";

const Stack = createNativeStackNavigator();

const MainStack = () => {

    return (
        <Stack.Navigator 
            initialRouteName="Tabs" 
            screenOptions={{ headerShown: false }} 
        >
            <Stack.Screen 
                name="Tabs" 
                component={Tabs} 
            />
            <Stack.Screen 
                name="CarDetails" 
                component={CarDetails} 
            />
            <Stack.Screen 
                name="BookingForm" 
                component={BookingForm} 
            />
        </Stack.Navigator>
    );
}

export default MainStack;