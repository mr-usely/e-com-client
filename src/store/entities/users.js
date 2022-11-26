import { createSlice, createSelector } from "@reduxjs/toolkit";
import { apiCallBegan } from "../api";

const slice = createSlice({
    name: 'users',
    initialState: {
        data: [],
        loading: false,
        error: null
    },
    reducers: {
        usersRequested: (users, action) => {
            users.loading = true
        },
        usersReceived: (users, action) => {
            users.data = action.payload;
            users.loading = false;
        },
        usersRequestFailed: (users, action) => {
            users.loading = false;
        },
        userSelected: (users, action) => {
            users.userId = action.payload;
        }
    }
})

export const {
    usersRequested,
    usersReceived,
    usersRequestFailed,
    userSelected
} = slice.actions

export default slice.reducer

const url = '/user';

export const loadUsers = () => apiCallBegan({
    url,
    method: 'get',
    onStart: usersRequested.type,
    onSuccess: usersReceived.type,
    onError: usersRequestFailed.type
});


export const requestBlock = (data, id) => apiCallBegan({
    url: `${url}/block/${id}`,
    method: 'patch',
    data: data,
    onStart: usersRequested.type,
    onSuccess: usersReceived.type,
    onError: usersRequestFailed.type
})


export const getResponse = createSelector(
    state => state.entities.users,
    users => users.data
);


export const getUsers = createSelector(
    state => state.entities.users,
    users => users.data
);