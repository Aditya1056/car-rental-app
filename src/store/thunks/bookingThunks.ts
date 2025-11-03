import { createAsyncThunk } from "@reduxjs/toolkit";

import {getBookingsRequest, httpBookingsRequest} from "../../services/bookingsService";

export const getAllBookings = createAsyncThunk('bookings/getAllCars', 
    async ({email}: {email: string}, thunkAPI) => {
        try{

            const bookings = await getBookingsRequest({
                url: '/',
                headers:{
                    'Authorization': `Bearer ${email}`,
                }
            })
            return bookings;
        }
        catch(err: any){
            return thunkAPI.rejectWithValue(err.message || err || 'Something went wrong!');
        }
    }
);

export const createBooking = createAsyncThunk('bookings/createBooking', 
    async ({data, email}: {data: any, email: string}, thunkAPI) => {
        try{

            const booking = await httpBookingsRequest({
                url:'/',
                data,
                method: 'POST',
                headers:{
                    'Authorization': `Bearer ${email}`,
                }
            });
            
            return booking;
        }
        catch(err: any){
            return thunkAPI.rejectWithValue(err.message || err || 'Something went wrong!');
        }
    }
);