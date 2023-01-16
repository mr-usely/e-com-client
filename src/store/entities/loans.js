import { createSlice, createSelector } from "@reduxjs/toolkit";
import { apiCallBegan } from "../api";

const slice = createSlice({
    name: 'loans',
    initialState: {
        data: [],
        loading: false,
        error: null
    },
    reducers: {
        loanRequested: (loans, action) => {
            loans.loading = true
        },
        loansReceived: (loans, action) => {
            loans.data = action.payload;
            loans.loading = false;
        },
        loanRequestFailed: (loans, action) => {
            loans.loading = false;
        }
    }
})

export const {
    loanRequested,
    loansReceived,
    loanRequestFailed
} = slice.actions

export default slice.reducer

const url = '/loan';

export const loadLoans = () => apiCallBegan({
    url,
    method: 'get',
    onStart: loanRequested.type,
    onSuccess: loansReceived.type,
    onError: loanRequestFailed.type
});


export const requestApproval = (data, id) => apiCallBegan({
    url: `${url}/approval/${id}`,
    method: 'patch',
    data: data,
    onStart: loanRequested.type,
    onSuccess: loansReceived.type,
    onError: loanRequestFailed.type
})

export const getLoans = createSelector(
    state => state.entities.loans,
    loans => loans.data
);
