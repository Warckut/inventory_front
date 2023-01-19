import { AsyncThunkAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import  $api, { API_URL } from "../http";
import axios from "axios";
import { IProduct } from "../models/IProduct";
import { Action } from "@reduxjs/toolkit"
import { RootState } from "./store";
import { INomenclature } from "../models/INomenclature";
import { ICounterparty } from "../models/ICounterparty";

type CommonState = {
    error: string,
    nomenclatures: INomenclature[],
    counterparties: ICounterparty[],
    isLoading: boolean
}

const initialState: CommonState = {
    error: "",
    nomenclatures: [],
    counterparties: [],
    isLoading: false
}

export const fetchNomenclatures = createAsyncThunk(
    '/nomenclatures',
    async (_, {rejectWithValue}) => {
        try {
            return await $api.get<INomenclature[]>('/nomenclatures/all')
        } catch(error) {
            return rejectWithValue(error);
        }
    }
)

export const fetchCounterparties = createAsyncThunk(
    '/counterparties',
    async (_, {rejectWithValue}) => {
        try {
            return await $api.get<ICounterparty[]>('/counterparties/all')
        } catch(error) {
            return rejectWithValue(error);
        }
    }
)

const CommonSlice = createSlice({
    name: 'common',
    initialState,
    reducers: {

    },
    extraReducers: {
        [fetchNomenclatures.pending.type]: (state, action) => {
            state.isLoading = true
        },
        [fetchNomenclatures.fulfilled.type]: (state, {payload} ) => {
            state.nomenclatures = payload.data
            state.isLoading = false
        },
        [fetchNomenclatures.rejected.type]: (state, action) => {
            state.isLoading = false
            state.error = action; 
        },

        [fetchCounterparties.pending.type]: (state, action) => {
            state.isLoading = true
        },
        [fetchCounterparties.fulfilled.type]: (state, {payload} ) => {
            state.counterparties = payload.data
            state.isLoading = false
        },
        [fetchCounterparties.rejected.type]: (state, action) => {
            state.isLoading = false
            state.error = action; 
        },
    }
})



export const selectNomenclatures = (state: RootState) => state.rootReducer.commonReducer.nomenclatures
export const selectCounterparties = (state: RootState) => state.rootReducer.commonReducer.counterparties
export const selectLoading = (state: RootState) => state.rootReducer.commonReducer.isLoading

export default CommonSlice.reducer