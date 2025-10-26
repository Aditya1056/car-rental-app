import { createAsyncThunk } from "@reduxjs/toolkit";

import authInstance from "../../services/authService";

export const fetchUser = createAsyncThunk('users/fetchUser', 
    async (_, thunkAPI) => {
        try{

            const response = await authInstance.get('/user');
            
            return response.data.data;
        }
        catch(err: any){
            return thunkAPI.rejectWithValue(err.message || 'Something went wrong!');
        }
    }
);

export const login = createAsyncThunk('users/login', 
    async (data: {email: string}, thunkAPI) => {

        try{

            const response = await authInstance.post('/login', {
                email: data.email,
            });

            return response.data.data;
        }
        catch(err: any) {
            return thunkAPI.rejectWithValue(err.message || 'Invalid Credentials');
        }
    }
);

export const signUp = createAsyncThunk('users/signUp', 
    async (data: {email: string, fullname: string}, thunkAPI) => {

        try{

            const response = await authInstance.post('/signup', {
                email: data.email,
                name: data.fullname,
            });

            return response.data.data;
        }
        catch(err: any){
            return thunkAPI.rejectWithValue(err?.message || 'Something went wrong!');
        }
    }
);

export const logout = createAsyncThunk('users/logout', 
    async (_, thunkAPI) => {

        try{
            await authInstance.post('/logout');
        }
        catch(err: any){
            return thunkAPI.rejectWithValue(err?.message || 'Something went wrong!');
        }
    }
);