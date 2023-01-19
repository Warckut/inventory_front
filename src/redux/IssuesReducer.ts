import { AsyncThunkAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import $api, { API_URL } from "../http";
import { IIssue } from "../models/IIssue";
import { IPurchase } from "../models/IPurchase";
import { RootState } from "./store";


type IssuesState = {
    message: string,
    issues: IPurchase[],
    isLoading: boolean
}

const initialState: IssuesState = {
    message: "",
    issues: [],
    isLoading: false
}

export const newIssue = createAsyncThunk(
    '/issues/create',
    async (issue: IIssue, {rejectWithValue}) => {
        try {
            return await $api.post(`${API_URL}/issues/create`, {issue})
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)

export const fetchIssues = createAsyncThunk(
    '/issues/all',
    async (_, {rejectWithValue}) => {
        try {
            return await $api.get(`/issues/all`)
        } catch(error) {
            return rejectWithValue(error);
        }
    }
)

const issuesSlice = createSlice({
    name: 'issues',
    initialState,
    reducers: {
        clearMessage(state) {
            state.message = ''
        }
    },
    extraReducers: {
        [fetchIssues.pending.type]: (state, action) => {
            state.isLoading = true
        },
        [fetchIssues.fulfilled.type]: (state, {payload}) => {
            state.issues = payload.data
            state.isLoading = false
        },
        [fetchIssues.rejected.type]: (state, action) => {
            state.isLoading = false
        },

        [newIssue.pending.type]: (state, action) => {
            state.isLoading = true
        },
        [newIssue.fulfilled.type]: (state) => {
            state.isLoading = false
            state.message = 'Заказ сохранен'
        },
        [newIssue.rejected.type]: (state, action) => {
            state.isLoading = false
            state.message = action.payload.response.data.message
            // state.error = action.payload.response
        },
    }
})

export const selectMessage = (state: RootState) => state.rootReducer.issuesReducer.message
export const selectLoading = (state: RootState) => state.rootReducer.issuesReducer.isLoading
export const selectIssues = (state: RootState) => state.rootReducer.issuesReducer.issues

export const { clearMessage } = issuesSlice.actions

export default issuesSlice.reducer