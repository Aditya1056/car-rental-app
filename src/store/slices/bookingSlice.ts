import { createSlice } from "@reduxjs/toolkit";

type initialType = {
    bookings: any
};

const initialState: initialType = {
    bookings: [],
}

const bookingSlice = createSlice({
    name: 'bookings',
    initialState,
    reducers:{
        addBooking: (state, action) => {
            state.bookings.push(action.payload);
        }
    },
});

export default bookingSlice.reducer;