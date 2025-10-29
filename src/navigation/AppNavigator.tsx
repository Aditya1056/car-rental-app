import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';

import AuthStack from './AuthStack';
import Tabs from './Tabs';

import { useAppSelector, useAppDispatch } from '../store';

import { fetchUser } from '../store/thunks/authThunks';

const AppNavigator = () => {

    const { loggedIn } = useAppSelector(state => state.auth);

    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchUser());
    }, [dispatch]);

    return (
        <NavigationContainer>
            {loggedIn ? <Tabs /> : <AuthStack />}
        </NavigationContainer>
    );
};

export default AppNavigator;