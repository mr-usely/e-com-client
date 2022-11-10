import { apiCallBegan } from '../api';
import { createSlice, createSelector } from '@reduxjs/toolkit';


const slice = createSlice({
    name: 'products',
    initialState: {
        data: [],
        loading: false,
        error: null
    },
    reducers: {
        productRequested: (state, action) => {
            state.loading = true
        },
        productReceived: (state, action) => {
            state.data = action.payload
            state.loading = false
        },
        productRequestedFailed: (state, action) => {
            state.loading = false
        },
        productCreate: (state, action) => {
            state.data = action.payload
            state.loading = false
        },
        clearProductResponse: (state, action) => {
            state.data = []
            state.loading = false
        }
    }
})


export const {
    productRequested,
    productReceived,
    productRequestedFailed,
    productCreate,
    clearProductResponse
} = slice.actions
export default slice.reducer

export const url = '/products';

export const loadProducts = () => apiCallBegan({
    url,
    method: 'get',
    onStart: productRequested.type,
    onSuccess: productReceived.type,
    onError: productRequestedFailed.type
});


export const deleteProducts = (id) => apiCallBegan({
    url: `${url}/delete/${id}`,
    method: 'delete',
    onStart: productRequested.type,
    onSuccess: productReceived.type,
    onError: productRequestedFailed.type
});


export const updatedProduct = (data, id) => apiCallBegan({
    url: `${url}/update/${id}`,
    method: 'patch',
    data: data,
    onStart: productRequested.type,
    onSuccess: productReceived.type,
    onError: productRequestedFailed.type
});


export const updateProduct = (data, id, forPublish) => apiCallBegan({
    url: `${url}/update/1/${id}`,
    method: 'patch',
    data: data,
    onStart: productRequested.type,
    onSuccess: forPublish ? clearProductResponse.type : productReceived.type,
    onError: productRequestedFailed.type
})


export const addProduct = (data) => apiCallBegan({
    url: `${url}/create`,
    method: 'post',
    data: data,
    onStart: productRequested.type,
    onSuccess: productCreate.type,
    onError: productRequestedFailed.type
})


export const getProducts = createSelector(
    state => state.entities.product,
    product => product.data
);