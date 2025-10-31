import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';

import AuthStack from './AuthStack';
import MainStack from './MainStack';

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
            {loggedIn ? <MainStack /> : <AuthStack />}
        </NavigationContainer>
    );
};

export default AppNavigator;