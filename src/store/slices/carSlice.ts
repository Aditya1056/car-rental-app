import { createSlice } from "@reduxjs/toolkit";

import { getAllCars, getCarById } from "../thunks/carThunks";

type initialStateType = {
    loading: boolean,
    cars: any,
    car: any,
    error: any,
    singleCarError: any
}

const initialState: initialStateType = {
    loading: true,
    cars: [],
    car: null,
    error: null,
    singleCarError: null,
};

const carSlice = createSlice({
    name: 'cars',
    initialState,
    reducers: {},
    extraReducers:(builder) => {

        builder
            .addCase(getAllCars.pending, (state) => {
                state.loading = true;
                state.cars = [];
                state.error = null;
            })
            .addCase(getAllCars.fulfilled, (state, action) => {
                state.loading = false;
                state.cars = action.payload;
            })
            .addCase(getAllCars.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });

        builder
            .addCase(getCarById.pending, (state) => {
                state.car = null;
                state.singleCarError = null;
            })
            .addCase(getCarById.fulfilled, (state, action) => {
                state.car = action.payload;
            })
            .addCase(getCarById.rejected, (state, action) => {
                state.singleCarError = action.payload;
            });
    }
});

export default carSlice.reducer;