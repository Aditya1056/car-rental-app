import axios, {AxiosInstance} from "axios";
import MockAdapter from 'axios-mock-adapter';

import data from '../mocks/signup.json';

import AsyncStorage from '@react-native-async-storage/async-storage';

const authInstance: AxiosInstance = axios.create();

const mock = new MockAdapter(authInstance, { delayResponse: 400 });

mock.onPost('/login').reply(async (config) => {

    try{

        const { email } = JSON.parse(config.data);

        if(data.email !== email){
            return [404, { success: false, message: 'User does not exist!' }];
        }

        const userData = {
            ...data,
            expiryAt: Date.now() + (10 * 60 * 1000),
        }

        await AsyncStorage.setItem('user', JSON.stringify(userData));

        return [200, { success: true, data: userData }];
    }
    catch(err){
        throw err;
    }
});

mock.onPost('/signup').reply(async (config) => {

    try{

        const { email, name } = JSON.parse(config.data);

        if(data.email === email){
            return [409, { success: false, message: 'Email is already registered'}];
        }

        const userData = {
            id: Date.now().toString(),
            name,
            email,
            expiryAt: Date.now() + (10 * 60 * 1000),
        }

        await AsyncStorage.setItem('user', JSON.stringify(userData));

        return [201, { success: true, data: userData }];
    }
    catch(err){
        throw err;
    }
});

mock.onGet('/user').reply(async () => {

    try{

        const userExists = await AsyncStorage.getItem('user');


        if(!userExists){
            return [404, { success: false, message: 'User not found!' }];
        }

        const userData = JSON.parse(userExists);

        return [200, { success: true, data: userData }];
    }
    catch(err){
        throw err;
    }
});

mock.onPost('/logout').reply(async () => {

    try{

        await AsyncStorage.removeItem('user');

        return [200, { success: true, data: undefined }];
    }
    catch(err){
        throw err;
    }
});

export default authInstance;