import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Tabs from "./Tabs";
import CarDetails from "../screens/CarDetails";

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
        </Stack.Navigator>
    );
}

export default MainStack;