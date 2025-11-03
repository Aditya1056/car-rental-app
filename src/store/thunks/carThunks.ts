import { createAsyncThunk } from "@reduxjs/toolkit";

import carInstance from "../../services/carsService";

export const getAllCars = createAsyncThunk('cars/getAllCars', 
    async (_, thunkAPI) => {
        try{

            const response = await carInstance.get('/cars');
            return response.data.data;
        }
        catch(err: any){
            return thunkAPI.rejectWithValue(err.message || 'Something went wrong!');
        }
    }
);

export const getCarById = createAsyncThunk('cars/getCarById', 
    async (carId: string, thunkAPI) => {


        try{

            const response = await carInstance.get(`/car/${carId}`);
            
            return response.data.data;
        }
        catch(err: any){
            return thunkAPI.rejectWithValue(err.message || 'Something went wrong!');
        }
    }
);