import { createSlice, createSelector } from "@reduxjs/toolkit";
import { apiCallBegan } from "../api";

const slice = createSlice({
    name: 'orders',
     initialState: {
        data: [],
        loading: false,
        error: null
     },
     reducers: {
        orderRequested: (orders, action) => {
            orders.loading = true
        },
        orderReceived: (orders, action) => {
            orders.data = action.payload;
            orders.loading = false;
        },
        orderRequestFailed: (orders, action) => {
            orders.loading = false;
        }
     }
})

export const {
    orderRequested,
    orderReceived,
    orderRequestFailed
} = slice.actions

export default slice.reducer

const url = '/transactions';

export const loadOrders = () => apiCallBegan({
    url: `${url}/all/products`,
    method: 'get',
    onStart: orderRequested.type,
    onSuccess: orderReceived.type,
    onError: orderRequestFailed.type
});


export const getOrders = createSelector(
    state => state.entities.orders,
    orders => orders.data
);