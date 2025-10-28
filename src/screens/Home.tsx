import React, { PropsWithChildren, useEffect } from 'react';
import Toast from 'react-native-toast-message';

import CarsListing from '../components/CarsListing';

import { useAppSelector, useAppDispatch } from '../store';

import { getAllCars } from '../store/thunks/carThunks';
import { logout } from '../store/thunks/authThunks';

const Home: React.FC<PropsWithChildren> = () => {

    const dispatch = useAppDispatch();

    const { loggedIn, user, } = useAppSelector((state) => state.auth);

    useEffect(() => {
        dispatch(getAllCars());
    }, [dispatch]);

    useEffect(() => {

        let timer: (number | null) = null;

        const logoutHandler = async () => {

            if(timer){
                clearTimeout(timer);
                timer = null;
            }

            try{
                await dispatch(logout());
                Toast.show({
                    type: 'info',
                    text1: 'Logged Out!',
                });
            }
            catch(err: any){
                Toast.show({
                    type: 'error',
                    text1: 'Error',
                    text2: err || 'Something went wrong'
                });
            }
        }
        
        if(loggedIn && user && user.expiryAt){

            if(Number(user.expiryAt) < Date.now()){
                logoutHandler();
            }
            else{
                const diff = Number(user.expiryAt) - Date.now();
    
                timer = setTimeout(() => {
                    dispatch(logout());
                }, diff);
            }
        }

        return () => {
            if(timer){
                clearTimeout(timer);
                timer = null;
            }
        }

    }, [loggedIn, user, dispatch]);

    return (
        <CarsListing />
    );
}

export default Home;