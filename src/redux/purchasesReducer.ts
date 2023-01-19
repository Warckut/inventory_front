import { AsyncThunkAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import $api, { API_URL } from "../http";
import { IPurchase } from "../models/IPurchase";
import { IPurchasesGoods } from "../models/IPurchasesGoods";
import { AuthResponse } from "../models/responce/AuthResponse";
import { RootState } from "./store";

type PurchasesState = {
    error: string,
    purchases: IPurchase[]
    isLoading: boolean
}

const initialState: PurchasesState= {
    error: "",
    purchases: [],
    isLoading: false
}

export const newPurchase = createAsyncThunk(
    '/purchases/create',
    async (purchase: IPurchase, {rejectWithValue}) => {
        try {
            return await $api.post(`${API_URL}/purchases/create`, {purchase})
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)

export const fetchPurchases = createAsyncThunk(
    '/purchases/all',
    async (_, {rejectWithValue}) => {
        try {
            return await $api.get(`/purchases/all`)
        } catch(error) {
            return rejectWithValue(error);
        }
    }
)

export const uploadFile = createAsyncThunk(
    '/purchases/import',
    async (file: any, {rejectWithValue}) => {
        try {
            // return await $api.post('/login', { ...params})
            let formData = new FormData();
            formData.append("file", file);
            return await $api.post(`${API_URL}/purchases/import`, formData)
        } catch(error) {
            return rejectWithValue(error);
        }
    }
)



const purchasesSlice = createSlice({
    name: 'purchases',
    initialState,
    reducers: {

    },
    extraReducers: {
        [uploadFile.pending.type]: (state, action) => {
            state.isLoading = true
        },
        [uploadFile.fulfilled.type]: (state,  ) => {
            state.isLoading = false
        },
        [uploadFile.rejected.type]: (state, action) => {
            state.isLoading = false
            state.error = action;
        },

        [fetchPurchases.pending.type]: (state, action) => {
            state.isLoading = true
        },
        [fetchPurchases.fulfilled.type]: (state, {payload}) => {
            state.purchases = payload.data
            state.isLoading = false
        },
        [fetchPurchases.rejected.type]: (state, action) => {
            state.isLoading = false
        },

        [newPurchase.pending.type]: (state, action) => {
            state.isLoading = true
        },
        [newPurchase.fulfilled.type]: (state) => {
            state.isLoading = false
        },
        [newPurchase.rejected.type]: (state, action) => {
            state.isLoading = false
        },
    }
})


export const selectLoading = (state: RootState) => state.rootReducer.purchasesReducer.isLoading
export const selectPurchases = (state: RootState) => state.rootReducer.purchasesReducer.purchases

export default purchasesSlice.reducer