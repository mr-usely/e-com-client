import { createSlice, createSelector } from "@reduxjs/toolkit";
import { apiCallBegan } from "../api";

const isLoggedIn = sessionStorage.getItem('isLoggedIn') === 'false' ? false : true

const slice = createSlice({
    name: 'auth',
    initialState: {
        user: null,
        isAuthenticated: isLoggedIn,
        loading: false,
        error: null
    },
    reducers: {
        loginRequested: (auth, action) => {
            auth.loading = true
        },
        loginSucceeded: (auth, action) => {
            auth.isAuthenticated = true;
            sessionStorage.setItem('isLoggedIn', true);
            auth.user = action.payload;
            auth.loading = false;
        },
        loginFailed: (auth, action) => {
            auth.isAuthenticated = false
            sessionStorage.setItem('isLoggedIn', false)
            auth.error = action.payload
            auth.user = null
            auth.loading = false;
        },
        logoutUser: (auth, action) => {
            auth.isAuthenticated = false
            sessionStorage.setItem('isLoggedIn', false)
            auth.user = null
            auth.loading = false 
        },
        resetAuthError: (auth, action) => {
            auth.error = null;
        }
    }
})

export const {
    loginRequested, 
    loginSucceeded,
    loginFailed,
    logoutUser,
    resetAuthError
} = slice.actions

export default slice.reducer

export const isAuthenticated = createSelector(
    state => state.entities.auth,
    auth => auth.isAuthenticated
)

export const getError = createSelector(
    state => state.entities.auth,
    auth => auth.error
)

export const logout = () => apiCallBegan({
    onStart: loginRequested.type,
    onSuccess: logoutUser.type,
    onError: loginFailed.type
})