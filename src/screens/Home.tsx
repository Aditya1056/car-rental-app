import React, { PropsWithChildren, useEffect } from 'react';
import { View, Text } from 'react-native';

import { useAppSelector, useAppDispatch } from '../store';

import { getAllCars } from '../store/thunks/carThunks';
import { logout } from '../store/thunks/authThunks';

const Home: React.FC<PropsWithChildren> = () => {

    const dispatch = useAppDispatch();

    const { loggedIn, user, } = useAppSelector((state) => state.auth);
    // const { cars } = useAppSelector((state) => state.cars);

    useEffect(() => {
        dispatch(getAllCars());
    }, [dispatch]);

    useEffect(() => {

        let timer = null;

        console.log(user);

        if(loggedIn && user && user.expiryAt){

            if(Number(user.expiryAt) < Date.now()){
                if(timer){
                    clearTimeout(timer);
                }
                dispatch(logout());
                return;
            }

            const diff = Number(user.expiryAt) - Date.now();

            timer = setTimeout(() => {
                dispatch(logout());
            }, diff);
        }

        return () => {
            if(timer){
                clearTimeout(timer);
            }
        }

    }, [loggedIn, user, dispatch]);

  return (
    <View>
      <Text>This a Car rental app</Text>
    </View>
  );
}

export default Home;