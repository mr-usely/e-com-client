import { createSlice, createSelector } from "@reduxjs/toolkit";
import { apiCallBegan } from "../api";

const slice = createSlice({
    name: 'summary',
    initialState: {
        data: [],
        loading: false,
        error: null
    },
    reducers: {
        summaryRequested: (summary, action) => {
            summary.loading = true
        },
        summaryReceived: (summary, action) => {
            summary.data = action.payload;
            summary.loading = false;
        },
        summaryRequestFailed: (summary, action) => {
            summary.loading = false;
        }
    }
})

export const {
    summaryRequested,
    summaryReceived,
    summaryRequestFailed
} = slice.actions

export default slice.reducer

const url = '/summary';

export const loadSummaryDay = () => apiCallBegan({
    url: `${url}/day`,
    method: 'get',
    onStart: summaryRequested.type,
    onSuccess: summaryReceived.type,
    onError: summaryRequestFailed.type
});

export const loadDashboard = () => apiCallBegan({
    url: `${url}/dashboard`,
    method: 'get',
    onStart: summaryRequested.type,
    onSuccess: summaryReceived.type,
    onError: summaryRequestFailed.type
});


export const getResponse = createSelector(
    state => state.entities.summary,
    summary => summary.data
);
