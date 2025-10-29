import { createSlice } from "@reduxjs/toolkit";

import { fetchUser, login, signUp, logout } from "../thunks/authThunks";

type initialStateType = {
    loggedIn: boolean,
    loading: boolean,
    user?: any,
    error?: any,
}

const initialState: initialStateType = {
    user: null,
    loading: true,
    loggedIn: false,
    error: null
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers:(builder) => {

        builder
            .addCase(fetchUser.pending, (state) => {
                state.loading = true;
                state.user = null;
                state.error = null;
                state.loggedIn = false;
            })
            .addCase(fetchUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
                state.loggedIn = true;
            })
            .addCase(fetchUser.rejected, (state) => {
                state.error = null;
                state.loading = false;
                state.loggedIn = false;
                state.user = null;
            });

        builder
            .addCase(login.pending, (state) => {
                state.loading = true;
                state.user = null;
                state.error = null;
                state.loggedIn = false;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
                state.loggedIn = true;
            })
            .addCase(login.rejected, (state, action) => {
                state.error = action.payload;
                state.loading = false;
                state.loggedIn = false;
                state.user = null;
            });

        builder
            .addCase(signUp.pending, (state) => {
                state.loading = true;
                state.user = null;
                state.error = null;
                state.loggedIn = false;
            })
            .addCase(signUp.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
                state.loggedIn = true;

            })
            .addCase(signUp.rejected, (state) => {
                state.error = null;
                state.loading = false;
                state.loggedIn = false;
                state.user = null;
            });

        builder
            .addCase(logout.pending, (state) => {
                state.loading = true;
                state.user = null;
                state.error = null;
                state.loggedIn = false;
            })
            .addCase(logout.fulfilled, (state) => {
                state.loading = false;
                state.user = null;
                state.loggedIn = false;
                state.error = null;
            });
    }
});

export default authSlice.reducer;