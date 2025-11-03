import { createSlice } from "@reduxjs/toolkit";

import { getAllBookings } from "../thunks/bookingThunks";

type initialType = {
    bookings: any,
    loading: boolean
};

const initialState: initialType = {
    bookings: [],
    loading: true,
}

const bookingSlice = createSlice({
    name: 'bookings',
    initialState,
    reducers:{},
    extraReducers: (builder) => {
        builder
            .addCase(getAllBookings.pending, (state) => {
                state.loading = true;
                state.bookings = [];
            })
            .addCase(getAllBookings.fulfilled, (state, action) => {
                state.loading = false;
                state.bookings = action.payload;
            })
            .addCase(getAllBookings.rejected, (state) => {
                state.loading = false;
            });
    }
});

export default bookingSlice.reducer;